import {
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { TRUST_POINTS, type TrustPointIcon } from "@/lib/content/site";

const ICONS: Record<TrustPointIcon, typeof ShieldCheckIcon> = {
  authenticated: ShieldCheckIcon,
  invoice: DocumentTextIcon,
  store: BuildingStorefrontIcon,
  concierge: ChatBubbleLeftRightIcon,
};

export function TrustStrip() {
  return (
    <div className="flex flex-wrap bg-black text-ivory-92">
      {TRUST_POINTS.map((point, i) => {
        const Icon = ICONS[point.icon];
        return (
          <div
            key={point.title}
            className={`flex flex-1 basis-1/2 flex-col items-center gap-2.5 border-ivory-10 px-4 py-6 text-center tablet:basis-0 ${
              i < TRUST_POINTS.length - 1 ? "border-b tablet:border-r tablet:border-b-0" : ""
            }`}
          >
            <Icon aria-hidden className="h-5 w-5 text-ivory-70" strokeWidth={1.5} />
            <span className="text-[11.5px] leading-snug">{point.title}</span>
          </div>
        );
      })}
    </div>
  );
}
