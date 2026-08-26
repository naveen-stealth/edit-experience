import { LinkButton } from "@/components/ui/LinkButton";
import { SplitPanel } from "@/components/ui/SplitPanel";
import { STORE_INFO } from "@/lib/content/site";
import { StoreMap } from "./StoreMap";

export function VisitStoreSplit() {
  const hasMapbox = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
  const mapQuery = encodeURIComponent(`${STORE_INFO.mapQuery}, ${STORE_INFO.city}`);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2">
      <div className="relative min-h-[320px] overflow-hidden bg-ivory tablet:min-h-[440px]">
        {hasMapbox ? (
          <StoreMap
            lat={STORE_INFO.coordinates.lat}
            lng={STORE_INFO.coordinates.lng}
            label={STORE_INFO.name}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <iframe
            src={mapEmbedSrc}
            title={`Map to ${STORE_INFO.name}, ${STORE_INFO.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.05]"
          />
        )}
      </div>
      <div className="flex flex-col justify-center bg-ivory py-14 tablet:py-20">
        <SplitPanel side="right" className="tablet:pl-14">
          <h2 className="text-[30px] leading-tight text-pine tablet:text-[36px]">Visit the store</h2>
          <div className="mt-2">
            <Row label="Address">
              {STORE_INFO.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Row>
            {STORE_INFO.hours.map((h) => (
              <Row key={h.days} label={h.days}>
                {h.hours}
              </Row>
            ))}
            <Row label="Phone">{STORE_INFO.phoneDisplay}</Row>
          </div>
          <LinkButton href="/visit-store" variant="on-light" className="mt-6">
            Get Directions
          </LinkButton>
        </SplitPanel>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-pine-12 py-3.5 text-[13.5px]">
      <span className="text-pine-45">{label}</span>
      <span className="text-right text-pine">{children}</span>
    </div>
  );
}
