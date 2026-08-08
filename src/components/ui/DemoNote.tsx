import { cn } from "@/lib/cn";

/** The disclosure. One sentence, said the same way everywhere it appears.
 *
 *  It sits above the work — not in a footnote, not in small print — because
 *  a visitor should never have to wonder whether these are real clients. It
 *  is also the honest version of the sales pitch: the companies are invented,
 *  the websites are not, and they can go and use them. */
export function DemoNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "border-l-2 border-border pl-4 text-[0.9375rem] leading-relaxed text-text-muted sm:pl-5",
        className,
      )}
    >
      <strong className="font-medium text-text">Tai pavyzdiniai darbai.</strong>{" "}
      Įmonės, jų projektai, kainos ir kontaktai — sugalvoti. Svetaines galite
      atidaryti ir paspaudinėti: išbandykite skaičiuoklę, rezervaciją ar
      krepšelį. Tokios kokybės ir tikėkitės.
    </p>
  );
}
