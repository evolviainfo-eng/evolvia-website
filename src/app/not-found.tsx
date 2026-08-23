import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Puslapis nerastas",
  description: "Šio puslapio nėra arba jis buvo perkeltas.",
  robots: { index: false, follow: false },
};

/** Root 404. Same PageHeader skeleton every other subpage uses, just
 *  vertically centered — there is no section below it to carry the rhythm. */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main">
        <div className="flex min-h-[100svh] flex-col justify-center">
          <PageHeader
            eyebrow="404"
            title="Šio puslapio nebėra."
            lead="Nuoroda pasenusi arba adresas neteisingas — puslapio, kurio ieškote, nėra."
          >
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/" variant="primary" size="lg">
                Į pradžią
              </Button>
              <Button href="/darbai" variant="secondary" size="lg">
                Žiūrėti darbus
              </Button>
            </div>
          </PageHeader>
        </div>
      </main>
      <Footer />
    </>
  );
}
