"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

const PINE = "#041e1a";
const IVORY = "#f4eee7";
const WATER = "#0d2b25";
const BUILDING = "#e3d9c8";
const LANDUSE = "#ece3d6";

// Only bare place-name text survives — no POI/park/water/transit icon glyphs.
const VISIBLE_SYMBOL_LAYERS = new Set([
  "settlement-major-label",
  "settlement-minor-label",
  "settlement-subdivision-label",
  "state-label",
  "country-label",
  "continent-label",
]);

/** Restyles Mapbox's base "light" style toward the site's Pine/Ivory palette and strips visual clutter. */
function applyPremiumTheme(map: mapboxgl.Map) {
  const style = map.getStyle();
  if (!style?.layers) return;

  for (const layer of style.layers) {
    const id = layer.id;
    const setPaint = (prop: string, value: unknown) =>
      (map.setPaintProperty as (...args: unknown[]) => void)(id, prop, value);
    const setLayout = (prop: string, value: unknown) =>
      (map.setLayoutProperty as (...args: unknown[]) => void)(id, prop, value);

    if (layer.type === "background") {
      setPaint("background-color", IVORY);
    } else if (layer.type === "fill") {
      if (id.includes("water")) setPaint("fill-color", WATER);
      else if (id.includes("building")) {
        setPaint("fill-color", BUILDING);
        setPaint("fill-opacity", 0.7);
      } else {
        // landuse, national-park, land-structure, aeroway, and anything else — one quiet tone.
        setPaint("fill-color", LANDUSE);
      }
    } else if (layer.type === "line") {
      if (id.includes("water")) setPaint("line-color", WATER);
      else if (id.startsWith("admin")) {
        setPaint("line-color", PINE);
        setPaint("line-opacity", 0.25);
      } else {
        // roads, bridges, tunnels, rail, land-structure, aeroway lines — one quiet tone.
        setPaint("line-color", PINE);
        setPaint("line-opacity", 0.4);
      }
    } else if (layer.type === "symbol") {
      if (VISIBLE_SYMBOL_LAYERS.has(id)) {
        setPaint("text-color", PINE);
        setPaint("text-halo-color", IVORY);
        setPaint("text-halo-width", 1.4);
      } else {
        setLayout("visibility", "none");
      }
    }
  }
}

function buildPinElement(): HTMLDivElement {
  const el = document.createElement("div");
  el.style.width = "18px";
  el.style.height = "18px";
  el.style.borderRadius = "50% 50% 50% 0";
  el.style.background = PINE;
  el.style.border = `2px solid ${IVORY}`;
  el.style.boxShadow = "0 2px 8px rgba(4,30,26,0.45)";
  el.style.transform = "rotate(-45deg)";
  return el;
}

export function StoreMap({
  lat,
  lng,
  label,
  className = "",
}: {
  lat: number;
  lng: number;
  label: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: 14.5,
      attributionControl: false,
      cooperativeGestures: true,
    });

    map.addControl(new mapboxgl.AttributionControl({ compact: true }));
    map.on("style.load", () => applyPremiumTheme(map));

    const marker = new mapboxgl.Marker({ element: buildPinElement(), anchor: "bottom" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ closeButton: false, offset: 22 }).setText(label))
      .addTo(map);

    return () => {
      marker.remove();
      map.remove();
    };
  }, [lat, lng, label]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return null;

  return <div ref={containerRef} className={className} />;
}
