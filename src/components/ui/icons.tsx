import type { ServiceIcon } from "@/content/services";

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Custom, hand-built line icons — consistent 1.5 stroke, no icon-pack dump. */
export function ServiceGlyph({
  name,
  className,
}: {
  name: ServiceIcon;
  className?: string;
}) {
  switch (name) {
    case "design":
      // Overlapping square + circle — composition / craft.
      return (
        <svg {...common} className={className} aria-hidden="true">
          <rect x="3" y="3" width="11" height="11" rx="2" />
          <circle cx="15.5" cy="15.5" r="5.5" />
        </svg>
      );
    case "speed":
      // Speedometer dial + needle — fast & found.
      return (
        <svg {...common} className={className} aria-hidden="true">
          <path d="M4 16.5a8 8 0 0 1 16 0" />
          <path d="M12 16.5l4.2-4.2" />
          <circle cx="12" cy="16.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "mobile":
      // Phone outline with speaker + home indicator.
      return (
        <svg {...common} className={className} aria-hidden="true">
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
          <line x1="10.4" y1="5.4" x2="13.6" y2="5.4" />
          <line x1="10.6" y1="18.6" x2="13.4" y2="18.6" />
        </svg>
      );
  }
}

/** Small arrow used in links ("Žiūrėti →" etc.). */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
