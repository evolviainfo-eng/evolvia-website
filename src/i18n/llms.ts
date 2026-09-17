import "server-only";
import { absoluteUrl, site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";

/* ─────────────────────────────────────────────────────────────
   /llms.txt and /llms-full.txt, per language.

   The fact sheets an answer engine reads instead of the page. Prices and
   every answer are interpolated from the dictionaries, so a figure that
   changes in prices.ts changes here too; only the connecting prose is
   written out below, once per language.
   ───────────────────────────────────────────────────────────── */

const url = (path: string, locale: Locale) =>
  absoluteUrl(localizePath(path, locale));

function short(locale: Locale): string {
  const d = getDictionary(locale);
  const price = d.pricing.plan.price;
  const renewal = d.pricing.renewal.price;
  const contact = `${site.email}, ${site.phone}`;

  if (locale === "en") {
    return `# Evolvia

> Web design for businesses. Bespoke design, development, copywriting,
> launch and maintenance for one fixed price: ${price}.

Evolvia is a web design studio based in Kaunas, Lithuania. It is run by
${site.legalName} under Lithuanian self-employment certificate
No. ${site.activityNo} (EVRK ${site.nace}, computer programming activities).
Contact: ${contact}.

## Price

- Website: ${price}, paid once. No monthly fees.
- Included: bespoke design, development, copywriting, photo preparation,
  optimisation for Google search, domain and launch, hosting with SSL for
  the first year, updates and changes for the first year.
- After the first year: ${renewal} for hosting, SSL, updates and support.
  If the client does not continue, the website files stay with the client.
- Online shop or larger multi-page website: priced by scope, quoted
  within a day.

## How the work goes

1. The client writes an email with a few sentences about their business.
   Everything happens by email; a call is not required.
2. Within a couple of days the client gets a live draft: a working website
   in the browser, not a picture.
3. Payment happens only once the client likes the website.
4. Launch on the client's domain, usually within a few working days.

## Who it is for

- Businesses with no website, or an outdated one.
- Service companies whose customers search Google and browse on a phone.
- Businesses from one-person operations to larger teams that need a
  serious company website or an online shop.
- Anyone for whom a clear fixed price and one responsible person matter.

## Pages

- [Home](${url("/", locale)}): what Evolvia is, examples, price.
- [Services](${url("/paslaugos", locale)}): what the web design covers.
- [Work](${url("/darbai", locale)}): four working sample websites.
- [Pricing](${url("/kainos", locale)}): ${price} and what it includes.
- [FAQ](${url("/duk", locale)}): frequently asked questions and answers.
- [Contact](${url("/kontaktai", locale)}): form, business details, email.
- [Full fact sheet](${url("/llms-full.txt", locale)})
- [Lithuanian version](${url("/llms.txt", "lt")})

## Notes

- The companies on the /demo/ pages are fictional, created for
  demonstration. They are not real clients and their contact details are
  not real.
- Evolvia does not publish review ratings or client counts, because no
  verified data of that kind exists yet.
`;
  }

  return `# Evolvia

> Svetainių kūrimas Lietuvos verslui. Individualus dizainas, programavimas,
> tekstai, paleidimas ir priežiūra vienoje fiksuotoje kainoje: ${price}.

Evolvia yra svetainių kūrimo studija Kaune, dirbanti su visos Lietuvos
verslu. Veiklą vykdo ${site.legalName} pagal individualios veiklos pažymą
Nr. ${site.activityNo} (EVRK ${site.nace}, kompiuterių programavimo veikla). Kontaktai:
${contact}.

## Kaina

- Svetainė: ${price} vienkartinai. Jokių mėnesinių mokesčių.
- Į kainą įeina: individualus dizainas, programavimas, tekstai, nuotraukų
  paruošimas, optimizacija Google paieškai, domenas ir paleidimas, hostingas
  su SSL pirmus metus, atnaujinimai ir pakeitimai pirmus metus.
- Po pirmų metų: ${renewal} už hostingą, SSL, atnaujinimus ir palaikymą.
  Nenorint tęsti, svetainės failai lieka klientui.
- El. parduotuvė arba didesnė kelių puslapių svetainė: kaina pagal apimtį,
  pateikiama per dieną.

## Kaip vyksta darbas

1. Klientas parašo laišką su keliais sakiniais apie savo verslą. Viskas
   vyksta el. paštu, skambinti nebūtina.
2. Per porą dienų klientas gauna gyvą eskizą: veikiančią svetainę naršyklėje,
   ne paveikslėlį.
3. Mokama tik tada, kai svetainė patinka.
4. Paleidimas kliento domene, paprastai per kelias darbo dienas.

## Kam tinka

- Verslui, kuris neturi svetainės arba turi pasenusią.
- Paslaugų įmonėms, kurių klientai ieško Google ir naršo telefonu.
- Įmonėms nuo vieno žmogaus veiklos iki didesnių komandų, kurioms reikia
  rimtos vizitinės svetainės arba el. parduotuvės.
- Tiems, kam svarbi aiški fiksuota kaina ir vienas atsakingas žmogus.

## Puslapiai

- [Pradžia](${url("/", locale)}/): kas yra Evolvia, pavyzdžiai, kaina.
- [Paslaugos](${url("/paslaugos", locale)}): ką apima svetainių kūrimas.
- [Darbai](${url("/darbai", locale)}): keturios veikiančios pavyzdinės svetainės.
- [Kainos](${url("/kainos", locale)}): ${price} ir kas į juos įeina.
- [DUK](${url("/duk", locale)}): dažni klausimai ir atsakymai.
- [Kontaktai](${url("/kontaktai", locale)}): forma, rekvizitai, el. paštas.
- [Pilnas faktų lapas](${url("/llms-full.txt", locale)})
- [English version](${url("/llms.txt", "en")})

## Pastabos

- Svetainėse /demo/ adresais esančios įmonės yra pavyzdinės, sukurtos
  demonstracijai. Tai ne tikri klientai ir jų kontaktai nėra tikri.
- Evolvia neskelbia atsiliepimų reitingų ar klientų skaičiaus, nes tokių
  patikrintų duomenų kol kas nėra.
`;
}

function full(locale: Locale): string {
  const d = getDictionary(locale);
  const { plan, renewal, larger } = d.pricing;
  const en = locale === "en";
  const lines: string[] = [];

  lines.push(en ? "# Evolvia: full fact sheet" : "# Evolvia: pilnas faktų lapas");
  lines.push("");
  lines.push(
    en
      ? "Evolvia is a web design studio based in Kaunas, Lithuania."
      : "Evolvia yra svetainių kūrimo studija Kaune, dirbanti su visos Lietuvos verslu.",
  );
  lines.push(
    en
      ? `It is run by ${site.legalName} under Lithuanian self-employment certificate No. ${site.activityNo}`
      : `Veiklą vykdo ${site.legalName} pagal individualios veiklos pažymą Nr. ${site.activityNo}`,
  );
  lines.push(
    en
      ? `(EVRK ${site.nace}, other computer programming activities), registered since ${site.activitySince}.`
      : `(EVRK ${site.nace}, Kita kompiuterių programavimo veikla), registruotą nuo ${site.activitySince}.`,
  );
  lines.push(
    `${en ? "Contact" : "Kontaktai"}: ${site.email}, ${site.phone}, ${d.location}.`,
  );
  lines.push(`${en ? "Website" : "Svetainė"}: ${url("/", locale)}`);
  lines.push("");

  lines.push(en ? "## Price" : "## Kaina");
  lines.push("");
  lines.push(`${plan.name}: ${plan.price} ${plan.priceSuffix}`);
  lines.push(plan.summary);
  lines.push("");
  lines.push(en ? "Included:" : "Į kainą įeina:");
  plan.includes.forEach((item) => lines.push(`- ${item}`));
  lines.push("");
  lines.push(`${renewal.label}: ${renewal.price}. ${renewal.body}`);
  lines.push("");
  lines.push(`${larger.name}: ${larger.price}.`);
  lines.push(larger.summary);
  lines.push("");

  lines.push(en ? "## What the client gets" : "## Ką gauna klientas");
  lines.push("");
  d.services.forEach((s) => lines.push(`- ${s.title}: ${s.body}`));
  lines.push("");

  lines.push(en ? "## Questions and answers" : "## Klausimai ir atsakymai");
  lines.push("");
  d.faq.items.forEach((item) => {
    lines.push(`### ${item.q}`);
    lines.push(item.a);
    lines.push("");
  });

  if (en) {
    lines.push("## Sample websites");
    lines.push("");
    lines.push(
      "At evolvia.lt/en/demo/konstrukta, /en/demo/fume, /en/demo/forma and /en/demo/skalsa",
    );
    lines.push("there are four sample websites with features that really work:");
    lines.push("an estimate calculator, table booking, a project index and a basket.");
    lines.push(
      "Those companies do not exist; they were created for demonstration, and the contact details in them are not real.",
    );
  } else {
    lines.push("## Pavyzdinės svetainės");
    lines.push("");
    lines.push(
      "Adresais evolvia.lt/demo/konstrukta, /demo/fume, /demo/forma ir /demo/skalsa",
    );
    lines.push(
      "veikia keturios pavyzdinės svetainės su realiai veikiančiomis funkcijomis:",
    );
    lines.push(
      "sąmatos skaičiuokle, staliuko rezervacija, projektų katalogu ir krepšeliu.",
    );
    lines.push(
      "Tų įmonių nėra, jos sukurtos demonstracijai, o kontaktai jose nėra tikri.",
    );
  }

  return lines.join("\n");
}

function textResponse(body: string) {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const llmsResponse = (locale: Locale) => textResponse(short(locale));
export const llmsFullResponse = (locale: Locale) => textResponse(full(locale));
