import { eur, gbp, pricesFor } from "@/i18n/prices";

/* Words of the home hero: the headline block above the window, and every
   string inside the live "path to a website" window (HeroWindow.tsx).
   Prices come from i18n/prices.ts: euros for lt, pounds for en. */

const LT = pricesFor.lt;
const EN = pricesFor.en;

type Step = { n: 1 | 2 | 3 | 4; label: string; short: string; desc: string };
type Row = { l: string; chip?: string; m?: string };

export type HeroCopy = {
  h1a: string;
  h1b: string;
  sub: string;
  works: string;
  note: string;
  sr: string;
  win: {
    address: string;
    railTitle: string;
    steps: readonly [Step, Step, Step, Step];
    price: string;
    priceNote: string;
    mail: {
      fresh: string;
      sent: string;
      to: string;
      subjectLabel: string;
      subject: string;
      a: string;
      chip: string;
      b: string;
      send: string;
    };
    live: {
      url: string;
      tag: string;
      src: string;
      alt: string;
      cap: string;
      comment: string;
      approve: string;
      approved: string;
    };
    launch: readonly Row[];
    care: readonly string[];
    preparing: string;
    included: string;
    year1: string;
    later: string;
    files: string;
    filesValue: string;
  };
};

const lt: HeroCopy = {
  h1a: "Svetainės, kurios atrodo brangiai.",
  h1b: "Pamatote gyvai. Tik tada mokate.",
  sub: `Dizainas, tekstai, programavimas ir paleidimas Lietuvos verslui. ${eur(LT.site)}, mokama vieną kartą.`,
  works: "Pamatyti darbus",
  note: "Taip atrodo kelias iki jūsų svetainės, nuo laiško iki paleidimo.",
  sr: `Kaip vyksta darbas: pirma užklausa el. paštu, tada gyvas eskizas, kurį patvirtinate, tada apmokėjimas ir paleidimas jūsų domene, tada priežiūra. Svetainė kainuoja ${eur(LT.site)} vieną kartą, nuo antrų metų ${eur(LT.renewalPerYear)} per metus, failai lieka jūsų.`,
  win: {
    address: "jūsų-domenas.lt",
    railTitle: "Kelias iki svetainės",
    steps: [
      { n: 1, label: "Užklausa el. paštu", short: "Užklausa", desc: "Parašote keliais sakiniais, kuo užsiimate ir kokios svetainės reikia." },
      { n: 2, label: "Gyvas eskizas", short: "Eskizas", desc: "Jūs matote tikrą svetainę naršyklėje ir tik tada sprendžiate." },
      { n: 3, label: "Apmokėjimas ir paleidimas", short: "Paleidimas", desc: "Patvirtinus eskizą, svetainė perkeliama į jūsų domeną ir paleidžiama." },
      { n: 4, label: "Priežiūra", short: "Priežiūra", desc: "Jūs dirbate toliau, o talpinimu, atnaujinimais ir pagalba rūpinamės mes." },
    ],
    price: `${eur(LT.site)} vieną kartą`,
    priceNote: `Nuo antrų metų ${eur(LT.renewalPerYear)} per metus`,
    mail: {
      fresh: "Naujas laiškas",
      sent: "Išsiųsta",
      to: "Kam",
      subjectLabel: "Tema",
      subject: "Svetainė mūsų įmonei",
      a: "Sveiki, mūsų veikla: ",
      chip: "[trumpai apie veiklą]",
      b: ". Reikia svetainės su paslaugomis, kontaktais ir užklausos forma.",
      send: "Siųsti",
    },
    live: {
      url: "evolvia.lt/demo/fume",
      tag: "Demo",
      src: "/site/hero-fume-lt.webp",
      alt: "Fumé demonstracinės svetainės pradžios puslapis",
      cap: "Tikra svetainė naršyklėje, ne paveikslėlis.",
      comment: "Komentuoti",
      approve: "Patvirtinti",
      approved: "Patvirtinta",
    },
    launch: [
      { l: "Eskizas patvirtintas" },
      { l: "Apmokėjimas", m: eur(LT.site) },
      { l: "Domenas", chip: "jūsų-domenas.lt", m: "nukreiptas" },
      { l: "SSL sertifikatas", m: "Galioja" },
      { l: "Google Search Console", m: "Prijungta" },
      { l: "Svetainė paleista" },
    ],
    care: ["Talpinimas", "SSL sertifikatas", "Atnaujinimai ir pakeitimai", "Pagalba el. paštu ir telefonu"],
    preparing: "Ruošiama",
    included: "Įskaičiuota",
    year1: "Pirmi metai: įskaičiuota",
    later: `Toliau: ${eur(LT.renewalPerYear)} per metus`,
    files: "Svetainės failai",
    filesValue: "Lieka jūsų",
  },
};

const en: HeroCopy = {
  h1a: "Websites that look expensive.",
  h1b: "See it live. Only then do you pay.",
  sub: `Design, copy, code and launch for your business. ${gbp(EN.site)}, paid once.`,
  works: "See the work",
  note: "This is the path to your website, from the first email to launch.",
  sr: `How it works: first an enquiry by email, then a live draft that you approve, then payment and launch on your domain, then maintenance. A website costs ${gbp(EN.site)} once, then ${gbp(EN.renewalPerYear)} a year from the second year, and the files stay yours.`,
  win: {
    address: "your-domain.com",
    railTitle: "The path to your website",
    steps: [
      { n: 1, label: "An enquiry by email", short: "Enquiry", desc: "You write a few sentences about what you do and the website you need." },
      { n: 2, label: "A live draft", short: "Draft", desc: "You see the real website in your browser, and only then decide." },
      { n: 3, label: "Payment and launch", short: "Launch", desc: "Once you approve the draft, the website moves to your domain and goes live." },
      { n: 4, label: "Maintenance", short: "Maintenance", desc: "You get on with your work. Hosting, updates and support are taken care of." },
    ],
    price: `${gbp(EN.site)}, paid once`,
    priceNote: `From the second year, ${gbp(EN.renewalPerYear)} a year`,
    mail: {
      fresh: "New message",
      sent: "Sent",
      to: "To",
      subjectLabel: "Subject",
      subject: "A website for our business",
      a: "Hello, we are ",
      chip: "[your business, in brief]",
      b: ". We need a website with our services, contact details and an enquiry form.",
      send: "Send",
    },
    live: {
      url: "evolvia.lt/en/demo/fume",
      tag: "Demo",
      src: "/site/hero-fume-en.webp",
      alt: "Home page of the Fumé demo website",
      cap: "A real website in your browser, not a picture.",
      comment: "Comment",
      approve: "Approve",
      approved: "Approved",
    },
    launch: [
      { l: "Draft approved" },
      { l: "Payment", m: gbp(EN.site) },
      { l: "Domain", chip: "your-domain.com", m: "connected" },
      { l: "SSL certificate", m: "Valid" },
      { l: "Google Search Console", m: "Connected" },
      { l: "Website live" },
    ],
    care: ["Hosting", "SSL certificate", "Updates and changes", "Support by email and phone"],
    preparing: "Setting up",
    included: "Included",
    year1: "First year: included",
    later: `After that: ${gbp(EN.renewalPerYear)} a year`,
    files: "Website files",
    filesValue: "Stay yours",
  },
};

export const hero = { lt, en } as const;
