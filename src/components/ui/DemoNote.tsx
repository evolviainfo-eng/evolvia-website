import { cn } from "@/lib/cn";

/** The note above the work.
 *
 *  "Pavyzdiniai darbai" is the whole disclosure this page needs, and it is
 *  accurate. It used to be followed by a line spelling out that the companies
 *  were invented — which added nothing a visitor could not already tell, and
 *  spent the sentence saying what the studio has NOT done rather than what
 *  these are. No one selling work writes that line.
 *
 *  The stronger disclosure still exists exactly where it earns its place:
 *  inside each demo, where a visitor is looking at what appears to be a real
 *  business. The pinned bar names the company as invented on every screen, and
 *  the closing strip repeats it in full. That is the context where someone
 *  could actually be misled; a portfolio page labelled "pavyzdiniai darbai"
 *  is not. */
export function DemoNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "border-l-2 border-border pl-4 text-[0.9375rem] leading-relaxed text-text-muted sm:pl-5",
        className,
      )}
    >
      <strong className="font-medium text-text">Tai pavyzdiniai darbai.</strong>{" "}
      Svetaines galite atidaryti ir paspaudinėti: išbandykite skaičiuoklę,
      rezervaciją ar krepšelį. Tokios kokybės ir tikėkitės.
    </p>
  );
}
