import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { Button } from "@/components/ui/Button";
import { NotFoundTitle } from "@/components/ui/NotFoundTitle";
import { getDictionary } from "@/i18n";
import { localeInfo, localizePath, locales } from "@/i18n/config";

/** The 404, in every language at once.
 *
 *  A static export has exactly one 404.html, served for any address that
 *  does not exist, /en/… included. So the page carries each language's
 *  header, message and footer, and the head script in RootShell shows the
 *  one that matches the address before anything paints
 *  (`data-locale-only` in globals.css). Without JavaScript it reads in
 *  Lithuanian, the default.
 *
 *  Same PageHeader skeleton every other subpage uses, just vertically
 *  centered — there is no section below it to carry the rhythm. The language
 *  switch has no page to keep here, so each flag goes to its home page. */
export function NotFoundView() {
  return (
    <>
      <NotFoundTitle
        titles={Object.fromEntries(
          locales.map((l) => [
            l,
            `${getDictionary(l).pages.notFound.metaTitle} · Evolvia`,
          ]),
        )}
        descriptions={Object.fromEntries(
          locales.map((l) => [l, getDictionary(l).pages.notFound.metaDescription]),
        )}
      />
      {locales.map((locale) => {
        const d = getDictionary(locale);
        return (
          <div
            key={locale}
            data-locale-only={locale}
            lang={localeInfo[locale].htmlLang}
          >
            <Nav locale={locale} path={null} t={d.nav} theme={d.theme} />
          </div>
        );
      })}
      <main id="main">
        {locales.map((locale) => {
          const t = getDictionary(locale).pages.notFound;
          return (
            <div
              key={locale}
              data-locale-only={locale}
              lang={localeInfo[locale].htmlLang}
              className="flex min-h-[100svh] flex-col justify-center"
            >
              <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    href={localizePath("/", locale)}
                    variant="primary"
                    size="lg"
                  >
                    {t.home}
                  </Button>
                  <Button
                    href={localizePath("/darbai", locale)}
                    variant="secondary"
                    size="lg"
                  >
                    {t.work}
                  </Button>
                </div>
              </PageHeader>
            </div>
          );
        })}
      </main>
      {locales.map((locale) => (
        <div
          key={locale}
          data-locale-only={locale}
          lang={localeInfo[locale].htmlLang}
        >
          <Footer locale={locale} />
        </div>
      ))}
    </>
  );
}
