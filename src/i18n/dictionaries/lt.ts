import { site } from "@/content/site";
import { PRICES_EUR, eur } from "@/i18n/prices";

/* ─────────────────────────────────────────────────────────────
   Lietuviškas žodynas: kiekvienas lankytojui matomas pagrindinės
   svetainės tekstas. Demo svetainių tekstai gyvena šalia, savo
   failuose (./lt/<demo>.ts).

   Šis failas yra šaltinis: anglų žodynas (en.ts) privalo turėti tą
   pačią formą, ir TypeScript tai patikrina. Kainos čia neįrašomos
   ranka, jos ateina iš prices.ts.
   ───────────────────────────────────────────────────────────── */

const price = eur(PRICES_EUR.site); // €400
const renewal = eur(PRICES_EUR.renewalPerYear); // €50

export const lt = {
  meta: {
    title: "Svetainių kūrimas Lietuvoje · Evolvia",
    description: `Svetainių kūrimas Lietuvos verslui už ${price}. Individualus dizainas, tekstai, paleidimas ir pirmi metai priežiūros vienoje kainoje. Svetainę pamatote gyvai prieš mokėdami.`,
    shareDescription: `Svetainių kūrimas Lietuvos verslui už ${price}. Svetainę pamatote gyvai, mokate tik tada, kai ji patinka.`,
    keywords: [
      "svetainių kūrimas",
      "svetainių kūrimas Lietuvoje",
      "svetainių kūrimas Kaune",
      "interneto svetainių kūrimas",
      "svetainės kaina",
      "verslo svetainė",
      "el. parduotuvės kūrimas",
      "evolvia",
    ],
    ogImageAlt: "evolvia. · svetainių kūrimas",
  },

  shell: {
    skipLink: "Pereiti į turinį",
  },

  location: "Kaunas, Lietuva",

  nav: {
    home: "evolvia. Į pradžią",
    links: [
      { label: "Paslaugos", path: "/paslaugos" },
      { label: "Darbai", path: "/darbai" },
      { label: "Kainos", path: "/kainos" },
      { label: "DUK", path: "/duk" },
    ],
    contact: "Susisiekti",
    menu: "Meniu",
    openMenu: "Atidaryti meniu",
    closeMenu: "Uždaryti meniu",
    mainNav: "Pagrindinė navigacija",
    /** Accessible name of the flag group. */
    language: "Kalba",
    /** What each flag is called on this page. A language's own name where
     *  the page's readers would not know the local one ("English"). */
    languageNames: { lt: "Lietuvių", en: "English" },
  },

  theme: {
    toLight: "Įjungti šviesų režimą",
    toDark: "Įjungti tamsų režimą",
    light: "Šviesus režimas",
    dark: "Tamsus režimas",
  },

  footer: {
    tagline: "svetainių kūrimas",
    nav: "Poraštės navigacija",
    /** Every indexable page, in footer order. */
    pages: [
      { label: "Pradžia", path: "/" },
      { label: "Paslaugos", path: "/paslaugos" },
      { label: "Darbai", path: "/darbai" },
      { label: "Kainos", path: "/kainos" },
      { label: "DUK", path: "/duk" },
      { label: "Kontaktai", path: "/kontaktai" },
    ],
    privacy: "Privatumas",
    registration: "Individuali veikla Nr. {no}",
  },

  crumbs: {
    home: "Pradžia",
  },

  hero: {
    eyebrow: "svetainių kūrimas",
    /** One entry per masked line, set at up to 74px. On desktop a line never
     *  wraps and may run ~30px into the gutter, so keep each no longer than
     *  "Tavo konkurentai"; on a 375px phone it has 327px at 42px. */
    lines: ["Tavo konkurentai", "jau matomi.", "O tu?"],
    lead: "Svetainių kūrimas Lietuvos verslui. Nuo pirmo eskizo iki paleidimo viskas padaroma už jus.",
    primary: "Gauti nemokamą eskizą",
    secondary: "Pamatyti darbus",
    caption: "Demonstracinė svetainė, atsidaro ir veikia.",
  },

  process: {
    eyebrow: "Kaip dirbame",
    title: "Procesas be staigmenų.",
    lead: "Nuotraukos telefone, kainos lapelyje, atsiliepimai portale, darbo laikas. Medžiaga jau yra, tik išbarstyta. Mūsų darbas yra ją surinkti ir sudėlioti, o jūs realią svetainę pamatote dar prieš mokėdami.",
    /** Step 1 used to promise a scheduled 15-minute call, which does not
     *  happen: enquiries arrive by email. The line says where things start
     *  and leaves the rest open. Step 2 is the trust hook. */
    steps: [
      {
        title: "Užklausa el. paštu",
        body: "Parašote, ką veikiate ir ko reikia. Užtenka kelių sakinių. Norite aptarti balsu? Taip pat galima.",
        lead: false,
      },
      {
        title: "Gyvas eskizas",
        body: "Per kelias dienas matote realią svetainę gyvai, ne paveikslėlį. Tik tada sprendžiate.",
        lead: true,
      },
      {
        title: "Apmokėjimas ir paleidimas",
        body: "Patvirtinus perkeliame į jūsų domeną ir paleidžiame.",
        lead: false,
      },
      {
        title: "Priežiūra",
        body: "Hostingas, atnaujinimai ir palaikymas. Jums nereikia nieko galvoti.",
        lead: false,
      },
    ],
  },

  trust: {
    eyebrow: "Be rizikos",
    /** Revealed word by word, so it is split on spaces. */
    statement: "Pamatote svetainę gyvai. Tik tada mokate.",
    sub: "Jokios rizikos. Jokių prielaidų. Sukuriame realų eskizą jūsų verslui. Jei nepatinka, nieko nemokate.",
  },

  /** Minerda, the real client work. Facts that do not change with the
   *  language (name, domain, city) live in content/cases.ts. */
  minerda: {
    sector: "Įlenkimų šalinimas be dažymo, kėbulo priežiūra",
    summary:
      "Veikianti įmonė be svetainės. Svetainė nuo nulio, keturi straipsniai, DUK puslapis, struktūriniai duomenys ir paleidimas kliento serveryje su galiojančiu SSL.",
    situation:
      "Minerda šalina automobilių kėbulo įlenkimus be dažymo, poliruoja kėbulą ir dengia keramine nanodanga. Įmonė dirbo ir turėjo klientų, bet savo svetainės neturėjo: darbų nuotraukos ir atsiliepimai gyveno tik socialiniuose tinkluose, o adreso, kurį galima duoti klientui arba įrašyti į Google, nebuvo.",
    work: [
      {
        title: "Svetainė nuo nulio",
        detail:
          "Struktūra, tekstai, nuotraukų paruošimas ir kodas. Be šablono ir be konstruktoriaus.",
      },
      {
        title: "Keturi straipsniai paieškai",
        detail:
          "Meninis lyginimas, kėbulo poliravimas, nanodanga, žibintų poliravimas. Kiekvienas savo adresu.",
      },
      {
        title: "Atskiras DUK puslapis",
        detail:
          "Klausimai ir atsakymai atskirame puslapyje, o ne bloke svetainės apačioje.",
      },
      {
        title: "Struktūriniai duomenys",
        detail:
          "JSON-LD, sitemap.xml ir robots.txt, kad paieškos sistemos suprastų, kas yra kiekviename puslapyje.",
      },
      {
        title: "Užklausų forma",
        detail: "Užpildyta užklausa ateina tiesiai į įmonės el. paštą.",
      },
      {
        title: "Paleidimas kliento serveryje",
        detail:
          "Svetainė gyvena kliento nuosavame hostinge su galiojančiu SSL sertifikatu.",
      },
      {
        title: "Google Search Console",
        detail: "Svetainė prijungta, puslapiai indeksuoti.",
      },
    ],
    result:
      "minerda.lt veikia kliento serveryje ir yra randama Google. Svetainę galite atidaryti ir apžiūrėti patys.",
    title: "Minerda. Svetainė įlenkimų šalinimo studijai Kaune.",
    homeAlt: "Minerda svetainės pagrindinis puslapis",
    openDomain: "Atidaryti {domain}",
    viewProject: "Žiūrėti visą projektą",
  },

  caseStudy: {
    eyebrow: "Darbai",
  },

  work: {
    eyebrow: "Pavyzdžiai",
    title: "Pavyzdžiai, kuriuos galite išbandyti.",
    all: "Visi pavyzdžiai",
  },

  demoNote: {
    strong: "Tai pavyzdiniai darbai.",
    body: "Svetaines galite atidaryti ir paspaudinėti: išbandykite skaičiuoklę, rezervaciją ar krepšelį. Tokios kokybės ir tikėkitės.",
  },

  /** The four demo sites as the portfolio describes them. */
  demos: {
    labels: { demo: "Demo", concept: "Koncepcija" },
    open: "Atidaryti demo",
    openSite: "Atidaryti demo svetainę",
    newWindow: "atsidaro naujame lange",
    frameLabel: "Atidaryti demonstracinę „{name}“ svetainę naujame lange",
    frameAlt: "„{name}“ demonstracinės svetainės vaizdas",
    items: {
      konstrukta: {
        sector: "Statybos bendrovė",
        tagline:
          "Statybų bendrovės svetainė: tvirta, struktūruota ir įtikinama nuo pirmo ekrano.",
        scope: ["Vizitinė svetainė", "Projektų galerija", "Sąmatos skaičiuoklė"],
        feature: "Veikianti sąmatos skaičiuoklė",
      },
      fume: {
        sector: "Restoranas · vyno baras",
        tagline:
          "Restoranas su stalo rezervacija ir meniu. Atmosfera juntama dar prieš atveriant duris.",
        scope: ["Meniu", "Stalo rezervacija", "Atmosferos fotografija"],
        feature: "Veikianti stalo rezervacija",
      },
      forma: {
        sector: "Interjero studija",
        tagline:
          "Interjero studijos portfolio: projektų indeksas, kuriame darbai kalba patys.",
        scope: ["Portfolio", "Projektų filtras", "Galerija"],
        feature: "Filtruojamas projektų indeksas",
      },
      skalsa: {
        sector: "El. parduotuvė",
        tagline:
          "Rankų darbo žvakių el. parduotuvė: katalogas, krepšelis ir apmokėjimas vienoje švarioje sistemoje.",
        scope: ["Prekių katalogas", "Krepšelis", "Užsakymo eiga"],
        feature: "Veikiantis krepšelis",
      },
    },
  },

  pricing: {
    eyebrow: "Kainos",
    title: "Viena svetainė. Viena kaina.",
    lead: "Sutariame prieš pradedant darbą, ir ji nesikeičia.",
    plan: {
      name: "Svetainė",
      price,
      priceSuffix: "vienkartinis mokestis. Jokių mėnesinių.",
      summary:
        "Viena kaina už visą darbą: dizainą, programavimą, tekstus, paleidimą ir pirmus metus priežiūros.",
      includes: [
        "Individualus dizainas ir programavimas",
        "Tekstai ir nuotraukų paruošimas",
        "Domenas, paleidimas ir perkėlimas",
        "Optimizacija Google paieškai",
        "Pritaikyta telefonui ir planšetei",
        "Hostingas ir SSL pirmus metus",
        "Atnaujinimai ir pakeitimai pirmus metus",
      ],
      cta: "Pradėti",
    },
    /** What happens after the first year. One quiet line, not a plan. */
    renewal: {
      label: "Po pirmų metų",
      price: `${renewal} / metus`,
      body: `Hostingas, SSL, atnaujinimai ir palaikymas toliau kainuoja ${renewal} per metus. Nenorite tęsti, svetainės failai lieka jūsų.`,
    },
    /** Larger sites and e-shops: quoted by scope, never guessed. */
    larger: {
      name: "El. parduotuvė arba didesnė svetainė",
      price: "Kaina pagal apimtį",
      summary:
        "Daug puslapių, katalogas, krepšelis, rezervacijos ar kalbų versijos. Parašykite, ko reikia, ir gausite tikslią kainą per dieną.",
      cta: "Aptarti projektą",
    },
    note: "Kaina fiksuota prieš pradedant darbą. Pirmiausia pamatote svetainę gyvai, mokate tik tada, kai ji jums patinka.",
  },

  faq: {
    eyebrow: "D.U.K.",
    title: "Dažni klausimai.",
    askBefore: "Nerandate atsakymo?",
    askLink: "Parašykite mums",
    askAfter: "ir atsakysime per dieną.",
    srContact: "Klausimai: {email}",
    /** Every answer restates its subject in its first sentence, so an answer
     *  engine lifting one line out of the page still says "Evolvia" and the
     *  price rather than "it depends". Items 0, 1 and 5 are the price
     *  questions that /kainos repeats. */
    items: [
      {
        q: "Kiek kainuoja svetainės sukūrimas?",
        a: `Svetainės sukūrimas Evolvijoje kainuoja ${price} vienkartinai. Į šią kainą įeina individualus dizainas, programavimas, tekstai, nuotraukų paruošimas, optimizacija Google paieškai, paleidimas jūsų domene ir pirmi metai priežiūros su hostingu. Jokių mėnesinių mokesčių ir jokių paslėptų priedų. El. parduotuvės ir didesnės kelių puslapių svetainės kainuojamos pagal apimtį.`,
      },
      {
        q: "Kas nutinka po pirmų metų?",
        a: `Po pirmų metų svetainės priežiūra kainuoja ${renewal} per metus. Už tai lieka hostingas, SSL sertifikatas, atnaujinimai ir palaikymas, kad svetainė toliau veiktų ir būtų saugi. Jei nuspręsite netęsti, svetainės failai lieka jūsų ir galite ją perkelti kitur.`,
      },
      {
        q: "Ar pamatysiu svetainę prieš mokėdamas?",
        a: "Taip, svetainę pamatysite prieš sumokėdami. Pirmiausia sukuriame gyvą eskizą, tai yra reali veikianti svetainė naršyklėje, o ne paveikslėlis. Mokate tik tada, kai ji jums patinka.",
      },
      {
        q: "Kaip greitai svetainė bus paruošta?",
        a: "Svetainę paprastai paruošiame per kelias darbo dienas. Pirmą gyvą eskizą pamatote maždaug po poros dienų nuo pirmo laiško, o galutinis paleidimas priklauso tik nuo to, kaip greitai sutariame dėl tekstų ir nuotraukų.",
      },
      {
        q: "Ką man reikia paruošti, kad pradėtume?",
        a: "Pradėti užtenka vieno laiško su keliais sakiniais apie jūsų verslą. Tekstus, nuotraukas ir logotipą sutvarkome kartu: turite savų, puiku, neturite, padedame juos paruošti. Nereikia jokio techninio pasiruošimo.",
      },
      {
        q: "Kas prižiūri svetainę po paleidimo?",
        a: `Svetainę po paleidimo prižiūri Evolvia. Hostingas, SSL, atnaujinimai, palaikymas ir smulkūs pakeitimai įeina į kainą pirmus metus, o vėliau į ${renewal} metinį mokestį. Jums nereikia galvoti apie techninius dalykus, pakanka parašyti laišką, ką pakeisti.`,
      },
      {
        q: "Ar svetainė bus matoma Google?",
        a: "Taip, svetainė ruošiama matomumui Google nuo pirmos dienos. Kiekvienoje svetainėje sutvarkome antraštes, meta aprašymus, adresų struktūrą, sitemap, robots.txt ir struktūrinius duomenis, o puslapiai kraunasi greitai, nes tai vienas iš Google vertinamų dalykų. Rezultatų negarantuojame per savaitę, bet pagrindas padaromas taip, kad jūsų rastų, o ne konkurentus.",
      },
      {
        q: "Ar dirbate oficialiai ir ar gausiu sąskaitą?",
        a: `Taip, Evolvia dirba oficialiai. Veiklą vykdo ${site.legalName} pagal individualios veiklos pažymą Nr. ${site.activityNo} (EVRK ${site.nace}, kompiuterių programavimo veikla), registruotą Lietuvoje. Už atliktą darbą išrašoma sąskaita faktūra, kurią galite įtraukti į savo verslo išlaidas.`,
      },
      {
        q: "Kam tinka Evolvia svetainės?",
        a: "Evolvia kuria svetaines Lietuvos verslui: nuo vieno žmogaus paslaugų verslo iki įmonių, kurioms reikia rimtos vizitinės svetainės ar el. parduotuvės. Dažniausiai tai statybų, interjero, autopaslaugų, grožio ir paslaugų sričių įmonės, kurios neturi svetainės arba turi pasenusią.",
      },
    ],
  },

  contact: {
    title: "Pradėkim.",
    lead: "Parašykite ir atsakysime per dieną.",
    nameLabel: "Vardas",
    namePlaceholder: "Vardas",
    emailLabel: "El. paštas",
    emailPlaceholder: "El. paštas",
    messageLabel: "Žinutė",
    messagePlaceholder: "Trumpai apie jūsų verslą ir ko ieškote",
    /** Subject line of the notification email Formspree sends to Evolvia. */
    notificationSubject: "Nauja užklausa iš evolvia.lt",
    submit: "Siųsti užklausą",
    sending: "Siunčiama…",
    sent: "Ačiū! Gavome jūsų žinutę ir atsakysime per dieną.",
    mailtoOpening:
      "Atsidaro jūsų el. pašto programa. Jei ne, rašykite tiesiai {email}.",
    error: "Nepavyko išsiųsti. Parašykite tiesiai {email}.",
    /** The email the visitor's own mail app opens with, when no form
     *  backend is configured. */
    mailto: {
      subject: "Užklausa iš svetainės: {name}",
      fallbackName: "naujas klientas",
      body: "Vardas: {name}\nEl. paštas: {email}\n\n{message}",
    },
    /** Shown in the browser's own validation bubble, so the message is in
     *  the page's language rather than the browser's. */
    validation: {
      nameMissing: "Įrašykite savo vardą.",
      emailMissing: "Įrašykite savo el. pašto adresą.",
      emailInvalid: "Įrašykite teisingą el. pašto adresą.",
      messageMissing: "Parašykite trumpą žinutę.",
    },
  },

  /** GDPR Art. 13 notice, shown under the form. Keep it in step with what
   *  the site actually does. */
  privacy: {
    intro:
      "Jūsų duomenis naudojame tik atsakymui į šią užklausą. Slapukų nenaudojame ir jūsų neseka.",
    introStrong: "Kaip tvarkome duomenis, aprašyta žemiau.",
    summary: "Privatumo informacija",
    controllerTerm: "Kas tvarko",
    controllerLead: "Evolvia, {location}. Klausimai ir prašymai:",
    rows: [
      {
        term: "Kokie duomenys ir kam",
        body: "Vardas, el. pašto adresas ir jūsų žinutės tekstas. Tik tai, ką patys įrašote. Naudojame atsakyti į užklausą ir, jei to prašote, paruošti pasiūlymą.",
      },
      {
        term: "Kokiu pagrindu",
        body: "Jūsų pačių prašymu atliekami veiksmai prieš sudarant sutartį (BDAR 6 str. 1 d. b punktas).",
      },
      {
        term: "Kas dar mato",
        body: "Formą aptarnauja „Formspree“ (JAV), per jų sistemą žinutė atkeliauja į mūsų pašto dėžutę. Svetainę talpina „Vercel“. Daugiau niekam neperduodame ir niekada nepardavinėjame.",
      },
      {
        term: "Kiek saugome",
        body: "Kol vyksta susirašinėjimas ir iki 12 mėnesių po jo. Paprašius ištriname anksčiau.",
      },
      {
        term: "Jūsų teisės",
        body: "Galite susipažinti su savo duomenimis, juos ištaisyti, ištrinti arba nesutikti su tvarkymu. Užtenka parašyti mums. Jei atsakymas netenkina, galite kreiptis į Valstybinę duomenų apsaugos inspekciją (vdai.lrv.lt).",
      },
      {
        term: "Lankomumo statistika",
        body: "Matome tik tai, kiek kartų atidaryti puslapiai. Tam naudojame „Vercel Analytics“. Jis neįrašo nieko į jūsų naršyklę, nekuria jūsų profilio ir neseka jūsų kitose svetainėse. Nematome, kas jūs esate.",
      },
      {
        term: "Slapukai",
        /* The language switch now remembers a choice too, so this names
           both things the browser keeps. Still no banner: both are stored
           only when the visitor asks for them. */
        body: "Nenaudojame nei reklamos, nei stebėjimo slapukų. Į naršyklę įrašome tik du jūsų pasirinkimus: šviesią ar tamsią temą ir svetainės kalbą, ir tik tada, kai patys juos perjungiate. Todėl ir sutikimo juostos čia nėra: nėra ko sutikti.",
      },
    ],
  },

  ctaBand: {
    eyebrow: "Nemokamas eskizas",
    title: "Pamatykite savo svetainę gyvai, dar prieš mokėdami.",
    button: "Gauti nemokamą eskizą",
    note: "Atsakome per dieną. Mokate tik tada, kai patinka.",
  },

  copyLine: {
    copy: "Kopijuoti",
    copied: "Nukopijuota",
  },

  /** "Ką gaunate": the three claims. Not rendered as a section any more;
   *  /llms-full.txt still lists them. */
  services: [
    {
      title: "Modernus dizainas",
      body: "Švarus, brangiai atrodantis dizainas, pritaikytas jūsų verslui. Ne šablonas.",
    },
    {
      title: "Greita ir matoma Google",
      body: "Greitai kraunasi, optimizuota paieškai. Klientai jus randa.",
    },
    {
      title: "Telefonui pritaikyta",
      body: "Tobula bet kuriame ekrane, o dauguma klientų naršo telefonu.",
    },
  ],

  pages: {
    services: {
      metaTitle: "Svetainių kūrimo paslaugos",
      metaDescription:
        "Svetainių kūrimas Lietuvos verslui: individualus dizainas, programavimas, tekstai, optimizacija Google paieškai, paleidimas ir priežiūra. Viena fiksuota kaina, vienas atsakingas žmogus.",
      crumb: "Paslaugos",
      eyebrow: "Paslaugos",
      title: "Svetainių kūrimas nuo pradžios iki paleidimo.",
      lead: "Evolvia yra svetainių kūrimo studija Kaune, dirbanti su visos Lietuvos verslu. Nuo pirmo eskizo iki veikiančios svetainės: dizainas, programavimas, tekstai, paleidimas ir priežiūra vienose rankose.",
      /** Headings are claims, bodies are specific; every fact matches the
       *  offer. */
      items: [
        {
          title: "Dizainas, kuris atrodo brangiai",
          body: "Kuriame nuo balto lapo, be jokių šablonų. Spalvos, šriftai ir struktūra parenkami pagal jūsų sritį ir jūsų klientus, todėl svetainė atrodo taip, lyg būtų kainavusi kelis kartus daugiau.",
        },
        {
          title: "Greita ir matoma Google",
          body: "Švarus kodas, greitas krovimasis ir optimizacija paieškai nuo pirmos dienos. Svetainė puikiai veikia telefone, kur naršo dauguma jūsų klientų.",
        },
        {
          title: "Paleidimas be jūsų rūpesčių",
          body: "Domenas, paleidimas ir perkėlimas: visus techninius darbus padarome už jus. Jums nereikia nieko diegti, konfigūruoti ar prižiūrėti paleidimo dieną.",
        },
        {
          title: "Priežiūra, kad svetainė nesentų",
          body: `Hostingas, SSL, atnaujinimai ir smulkūs pakeitimai įskaičiuoti pirmus metus, vėliau kainuoja ${renewal} per metus. Svetainė lieka gyva ir tvarkinga, o jums pakanka parašyti laišką, ką pakeisti.`,
        },
      ],
      fitsTitle: "Kam tinka",
      fits: [
        "Verslui, kuris neturi svetainės arba turi pasenusią.",
        "Paslaugų įmonėms, kurių klientai pirmiausia ieško Google ir naršo telefonu.",
        "Tiems, kam reikia aiškios fiksuotos kainos ir vieno atsakingo žmogaus.",
        "Įmonėms, kurios nori atrodyti rimčiau nei konkurentai toje pačioje srityje.",
      ],
      priceLine: `Aiški kaina: ${price} vienkartinai.`,
      priceLink: "Žiūrėti kainas",
      or: "arba",
      examplesLink: "pavyzdžius",
    },

    work: {
      metaTitle: "Darbai",
      metaDescription:
        "Minerda: svetainė Kauno kėbulo studijai, veikianti kliento serveryje ir randama Google. Šalia keturios pavyzdinės svetainės, kurias galite atidaryti ir išbandyti.",
      crumb: "Darbai",
      eyebrow: "Darbai",
      title: "Kliento svetainė, kuri veikia savo adresu.",
      lead: "Minerda yra gyva svetainė: ją naudoja Kauno kėbulo studija, ji paleista kliento serveryje ir randama Google. Po ja keturi pavyzdžiai, kuriuos galite atidaryti ir paspaudinėti.",
      clientChip: "Kliento darbas",
      examplesEyebrow: "Pavyzdžiai",
      examplesTitle: "Keturios svetainės, kurias galite išbandyti.",
    },

    minerda: {
      metaTitle: "Minerda: svetainė įlenkimų šalinimo studijai Kaune",
      metaDescription:
        "Kaip Kauno kėbulo studija Minerda gavo svetainę nuo nulio: keturi straipsniai, DUK puslapis, struktūriniai duomenys, užklausų forma ir paleidimas kliento serveryje su galiojančiu SSL.",
      crumbWork: "Darbai",
      breadcrumbNav: "Naršymo kelias",
      title: "Minerda: svetainė įlenkimų šalinimo studijai Kaune.",
      facts: {
        client: "Klientas",
        business: "Veikla",
        city: "Miestas",
        address: "Adresas",
      },
      situation: "Situacija",
      did: "Ką padarėme",
      didLead: "Viskas, kas sudaro veikiančią svetainę, o ne tik pirmą ekraną.",
      articles: "Straipsniai ir DUK",
      articlesLead:
        "Keturi straipsniai ir DUK puslapis atsako į klausimus, kuriuos žmonės užduoda dar prieš skambindami. Kiekvienas jų yra atskiras puslapis su savo adresu, tad gali būti randamas atskirai.",
      articleAlt: "Minerda straipsnis apie meninį lyginimą",
      articleCaption:
        "Vienas iš keturių straipsnių. Kiti trys: kėbulo poliravimas, nanodanga, žibintų poliravimas.",
      faqAlt: "Minerda DUK puslapis",
      faqCaption:
        "DUK puslapis su struktūriniais duomenimis, kad klausimai būtų suprantami ir paieškos sistemoms.",
      open: "Atidaryti",
      result: "Rezultatas",
      allWork: "Visi darbai",
    },

    pricing: {
      metaTitle: `Svetainės kaina: ${price}`,
      metaDescription: `Kiek kainuoja svetainė? ${price} vienkartinai su dizainu, tekstais, paleidimu ir pirmais metais priežiūros. Po pirmų metų ${renewal} per metus. Jokių mėnesinių mokesčių.`,
      crumb: "Kainos",
      eyebrow: "Kainos",
      title: "Aiški kaina. Jokių staigmenų.",
      lead: `Svetainė kainuoja ${price}. Į kainą įeina visas darbas ir pirmi metai priežiūros. Pirmiausia pamatote svetainę gyvai, mokate tik tada, kai ji jums patinka.`,
      faqTitle: "Klausimai apie kainą.",
      faqMore: "Daugiau atsakymų rasite",
      faqLink: "DUK puslapyje",
    },

    faq: {
      metaTitle: "Svetainių kūrimas: dažni klausimai",
      metaDescription:
        "Atsakymai apie svetainių kūrimą: kiek kainuoja svetainė, kas nutinka po pirmų metų, kaip greitai ji paruošiama, kas ją prižiūri ir ar būsite matomi Google.",
      crumb: "DUK",
      eyebrow: "D.U.K.",
      title: "Dažni klausimai.",
      lead: "Viskas, ko klientai dažniausiai klausia prieš pradėdami: kaina, terminai, priežiūra ir matomumas Google.",
    },

    contact: {
      metaTitle: "Kontaktai ir svetainės užsakymas",
      metaDescription:
        "Susisiekite su Evolvia dėl svetainės kūrimo. Parašykite kelis sakinius apie savo verslą ir gaukite nemokamą gyvą eskizą. Atsakome per dieną.",
      crumb: "Kontaktai",
      eyebrow: "Kontaktai",
      title: "Pradėkim.",
      lead: "Parašykite trumpai apie savo verslą ir per dieną gausite atsakymą su pirmais žingsniais bei nemokamu eskizu.",
      detailsTitle: "Rekvizitai",
      labels: {
        email: "El. paštas",
        phone: "Telefonas",
        city: "Miestas",
        owner: "Veiklos vykdytojas",
        registration: "Individuali veikla",
      },
      registrationValue: "Nr. {no} · EVRK {nace}",
      note: "Dirbame oficialiai pagal individualios veiklos pažymą. Už atliktą darbą išrašoma sąskaita faktūra.",
    },

    notFound: {
      metaTitle: "Puslapis nerastas",
      metaDescription: "Šio puslapio nėra arba jis buvo perkeltas.",
      eyebrow: "404",
      title: "Šio puslapio nebėra.",
      lead: "Nuoroda pasenusi arba adresas neteisingas. Puslapio, kurio ieškote, nėra.",
      home: "Į pradžią",
      work: "Žiūrėti darbus",
    },
  },

  /** The pinned bar and closing strip around every demo site. */
  demoShell: {
    fallbackName: "Ši svetainė",
    badge: "Demo",
    barShort: "Išgalvota įmonė · pavyzdinė svetainė",
    barLong:
      "Demonstracinė svetainė. „{name}“ — išgalvota įmonė; pavadinimas, kontaktai, kainos ir projektai yra pavyzdiniai.",
    backShort: "Evolvia",
    backLong: "Grįžti į Evolvia",
    footerEyebrow: "Demonstracinė svetainė",
    footerTitle: "„{name}“ neegzistuoja. Tai pavyzdinis darbas.",
    footerBody:
      "Įmonė, jos projektai, kainos ir kontaktai yra sugalvoti. Viskas kita — dizainas, tekstų struktūra, {feature}, greitis ir elgsena telefone — veikia lygiai taip, kaip veiktų jūsų svetainėje. Tokią ir gaunate.",
    wantOne: "Noriu tokios svetainės",
    allExamples: "Visi pavyzdžiai",
    others: "Kitos demonstracinės svetainės",
    credit: "© 2026 Evolvia · Nuotraukos: Unsplash",
  },

  /** Structured data. Read by Google and answer engines, not by people,
   *  but it quotes the offer, so it is translated with everything else. */
  schema: {
    businessDescription:
      "Evolvia kuria svetaines Lietuvos verslui. Individualus dizainas, programavimas, tekstai, paleidimas ir priežiūra vienoje fiksuotoje kainoje.",
    jobTitle: "Svetainių kūrėjas",
    certificate: "Individualios veiklos pažyma",
    country: "Lietuva",
    knowsAbout: [
      "Svetainių kūrimas",
      "Interneto svetainių dizainas",
      "El. parduotuvių kūrimas",
      "SEO optimizacija",
      "Svetainių hostingas ir priežiūra",
    ],
    languages: ["Lithuanian", "English"],
    serviceName: "Svetainių kūrimas",
    serviceDescription:
      "Svetainių kūrimas Lietuvos verslui: individualus dizainas, programavimas, tekstai, optimizacija Google paieškai, paleidimas ir pirmi metai priežiūros.",
    catalogName: "Kainos",
    siteOffered: "Svetainės sukūrimas",
    renewalSuffix: "Po pirmų metų priežiūra {price}.",
  },
};

export type Dictionary = typeof lt;
