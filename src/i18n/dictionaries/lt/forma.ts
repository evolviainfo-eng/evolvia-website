/* ─────────────────────────────────────────────────────────────
   Forma demo, Lithuanian: every word a visitor sees or hears.

   This file is the source. en/forma.ts must have the same shape, and
   TypeScript checks it. Lists keep the order the page renders them in.
   Non-language data (image paths, sizes, areas, years, anchors) stays in
   the components.
   ───────────────────────────────────────────────────────────── */

/** What a project card says about itself in its accessible name. */
type CardFacts = {
  title: string;
  kindLabel: string;
  area: string;
  place: string;
  year: string;
  scope: string;
};

export const formaLt = {
  meta: {
    title: "Forma — interjero architektūros studija",
    description:
      "Demonstracinė svetainė: interjero architektūros studijos portfolio su filtruojamu projektų indeksu ir pilno ekrano galerija.",
  },

  /** Each section's name: the label above it, and the header and footer
   *  links that lead to it. */
  sections: {
    approach: "Požiūris",
    projects: "Projektai",
    services: "Paslaugos",
    process: "Procesas",
    mood: "Nuotaika",
    contact: "Kontaktai",
  },

  nav: {
    home: "Forma — į puslapio viršų",
    tagline: "Interjero architektūra",
    label: "Puslapio skyriai",
  },

  hero: {
    eyebrow: "Interjero architektūros studija · Vilnius",
    /** Broken by hand: each line is its own mask and must fit on one line
     *  from 375px to 1440px. A translation keeps three lines, none longer
     *  than the longest one here. */
    lines: ["Erdvė, kurioje", "viskas savo", "vietoje."],
    lead: "Dvi architektės. Butai, privatūs namai ir nedidelės komercinės erdvės — nuo pirmo plano iki paskutinės rankenos, be tarpininkų.",
    imageAlt: "Šviesi svetainė su panoraminiu langu į medžius",
    caption: "Dienos zona · privatus namas",
    captionPlace: "Vilniaus r., 2025",
  },

  approach: {
    items: [
      {
        title: "Pradedame nuo dienos, ne nuo nuotraukos.",
        body: "Pirmas pokalbis — apie tai, kaip praeina jūsų rytas, kiek žmonių sėda vakarieniauti ir kur vakare padedate raktus. Planas gimsta iš atsakymų, ne iš katalogo.",
      },
      {
        title: "Mažiau medžiagų, tiksliau parinktų.",
        body: "Trys ar keturios visame projekte. Jos turi derėti tarpusavyje dešimt metų, o ne vieną sezoną, todėl renkamės lėtai ir visada gyvai, ne iš ekrano.",
      },
      {
        title: "Brėžinys dar nėra interjeras.",
        body: "Todėl liekame objekte iki galo. Jei kažkas nesueina vietoje — o taip nutinka kiekvienoje statyboje — sprendžiame ten pat, o ne susirašinėdamos.",
      },
    ],
  },

  projects: {
    title: "Šeši darbai, kuriuos parodome pirmiausia.",
    lead: "Butai, namai ir nedidelės komercinės erdvės Vilniuje bei aplinkui. Atverkite projektą — atsivers didelė nuotrauka ir trumpas sprendimo paaiškinimas.",
    filterLabel: "Filtruoti projektus pagal tipą",
    /** Filter chips, by filter id. */
    filters: {
      visi: "Visi",
      butas: "Butai",
      namas: "Namai",
      komercine: "Komercinės",
    },
    /** Precedes the visible "06 / 06" counter. */
    showing: "Rodoma",
    /** Read out by the live region after every filter change. */
    announce: (shown: number, total: number) =>
      `Rodoma ${shown} iš ${total} projektų.`,
    emptyTitle: "Šios rūšies darbų viešai kol kas nerodome.",
    emptyBody:
      "Archyve jų yra — parašykite ir atsiųsime tinkamiausius jūsų erdvei.",
    showAll: "Rodyti visus darbus",
    /** A card's aria-label. It replaces the name a browser would compute
     *  from the button's contents, and every piece of card information lives
     *  inside that button, so the metadata has to be folded in, or a
     *  screen-reader user hears the title alone and loses the whole point of
     *  an index. */
    cardLabel: (p: CardFacts) =>
      `Atverti projektą ${p.title} — ${p.kindLabel}, ${p.area}, ${p.place}, ${p.year}. ${p.scope}`,
    /** A single project's type, by kind id. */
    kinds: {
      butas: "Butas",
      namas: "Namas",
      komercine: "Komercinė",
    },
    /** By project id; the facts that need no words live in ProjectIndex. */
    items: {
      "p-1": {
        title: "Butas Žvėryne",
        place: "Vilnius",
        scope: "Pilnas projektas · autorinė priežiūra",
        note: "Trijų kambarių butas tarpukario name. Nugriovėme vieną pertvarą ir atsirado ilga dienos zona su vaizdu į kiemo medžius. Baldai — pagal projektą, kad tilptų į nelygias sienas.",
        alt: "Neutralių tonų svetainė su sofa ir dienos šviesa",
      },
      "p-5": {
        title: "Namas Sudervėje",
        place: "Vilniaus r.",
        scope: "Pilnas projektas · autorinė priežiūra",
        note: "Namas šeimai su dviem vaikais. Židinys — vienintelė sunki masė šviesioje erdvėje; visa kita atitraukta nuo sienų, kad grindys liktų vientisos.",
        alt: "Šviesi svetainė su židiniu ir minkštais baldais",
      },
      "p-2": {
        title: "Grožio studija Naujamiestyje",
        place: "Vilnius",
        scope: "Pilnas projektas",
        note: "Studija pirmame gyvenamojo namo aukšte. Uosio grindys ir viena nišų linija palei sieną — kad įranga ir priemonės nekristų į akis, o klientė matytų tik šviesą ir save.",
        alt: "Šviesi erdvė medinėmis grindimis ir dideliais langais",
      },
      "p-3": {
        title: "Butas Šnipiškėse",
        place: "Vilnius",
        scope: "Pilnas projektas · baldų projektavimas",
        note: "Butas naujos statybos name, kur virtuvė ir svetainė yra viena erdvė. Sala projektuota pagal šeimos ūgį ir galiausiai tapo pagrindiniu namų stalu — valgomojo taip ir neprireikė.",
        alt: "Virtuvė su sala ir aukštomis spintelėmis",
      },
      "p-6": {
        title: "Svečių apartamentai Užupyje",
        place: "Vilnius",
        scope: "Pilnas projektas · autorinė priežiūra",
        note: "Du nuomojami apartamentai senamiesčio pakraštyje. Šilta paletė ir tekstilė vietoj dekoro: kambarys turi atrodyti gyvenamas, o ne viešbutinis, ir turi būti išvalomas per keturiasdešimt minučių.",
        alt: "Miegamasis šiltos paletės tonais su tekstile",
      },
      "p-4": {
        title: "Namas Balsiuose",
        place: "Vilnius",
        scope: "Konsultacija · pilnas projektas",
        note: "Miegamasis su dviem langais į skirtingas puses — rytinį ir vakarinį. Spinta paslėpta už tos pačios sienos plokštumos, todėl kambaryje matosi tik lova ir šviesa.",
        alt: "Miegamasis su dviem langais ir ramia lovos zona",
      },
    },
  },

  lightbox: {
    strip: "Peržiūros kadrai",
    show: (title: string) => `Rodyti projektą ${title}`,
    close: "Uždaryti projekto peržiūrą",
    closeShort: "Uždaryti",
    previous: "Ankstesnis projektas",
    next: "Kitas projektas",
  },

  services: {
    title: "Trys būdai dirbti kartu.",
    lead: "Dažniausiai renkamasi pilnas projektas su priežiūra. Bet jei erdvė nedidelė arba sprendimas vienas — užtenka ir mažesnio žingsnio.",
    items: [
      {
        title: "Pilnas interjero projektas",
        price: "nuo 45 €/m²",
        body: "Išplanavimas, vizualizacijos, darbo brėžiniai bei medžiagų ir baldų specifikacijos. Meistrai gauna dokumentą, pagal kurį galima dirbti be papildomų klausimų.",
        points: [
          "Du–trys išplanavimo variantai",
          "Baldų projektavimas ir brėžiniai",
          "Medžiagų sąrašas su kainomis ir tiekėjais",
        ],
      },
      {
        title: "Konsultacija",
        price: "180 € / vizitas",
        body: "Dvi valandos jūsų erdvėje arba prie jūsų plano. Tinka, kai reikia ne viso projekto, o kelių teisingų sprendimų prieš pradedant darbus.",
        points: [
          "Išplanavimo klaidų peržiūra",
          "Spalvų ir medžiagų kryptis",
          "Santrauka raštu per tris dienas",
        ],
      },
      {
        title: "Autorinė priežiūra",
        price: "nuo 12 €/m²",
        body: "Lankomės objekte, deriname su rangovais, tikriname mazgus ir tikrus matmenis. Kad nupieštas projektas ir pastatytas interjeras sutaptų.",
        points: [
          "Vizitai kas dvi savaites",
          "Brėžinių tikslinimas pagal faktą",
          "Bendravimas su rangovais ir tiekėjais",
        ],
      },
    ],
    note: "Kainos orientacinės ir priklauso nuo erdvės sudėtingumo. Tikslią sumą pateikiame raštu po pirmo susitikimo — vėliau ji nesikeičia.",
  },

  process: {
    title: "Nuo pirmo matavimo iki paskutinės rankenos.",
    steps: [
      {
        title: "Susitikimas erdvėje",
        body: "Matuojame, fotografuojame ir daug klausiame. Per savaitę gaunate pasiūlymą su konkrečia kaina ir terminais.",
        when: "1 savaitė",
      },
      {
        title: "Išplanavimas",
        body: "Du–trys variantai popieriuje. Renkamės kartu, kol vienas tampa akivaizdus — tik tada judame toliau.",
        when: "2–3 savaitės",
      },
      {
        title: "Projektas ir medžiagos",
        body: "Vizualizacijos, darbo brėžiniai, specifikacijos. Į salonus einame kartu ir viską paliečiame rankomis.",
        when: "4–6 savaitės",
      },
      {
        title: "Autorinė priežiūra",
        body: "Objekte lankomės kas dvi savaites ir tada, kai reikia. Iki paskutinės rankenos ir paskutinio jungiklio.",
        when: "Statybų metu",
      },
    ],
  },

  mood: {
    /** Same order as MOOD in FormaPage. */
    alts: [
      "Svetainė prieblandoje, minkšta šviesa",
      "Medinių sukamųjų laiptų detalė",
      "Trys mediniai langai ir šilta popietės šviesa",
      "Mansardos miegamasis vakare",
    ],
  },

  contact: {
    title: "Pradėkime nuo pokalbio.",
    lead: "Parašykite kelis sakinius apie erdvę. Atsiųsime, ką joje matome mes, ir kiek toks projektas kainuotų.",
    sample: "Pavyzdiniai kontaktai",
    rows: [
      { label: "El. paštas", value: "labas@forma.demo" },
      { label: "Telefonas", value: "+370 600 00000" },
      { label: "Studija", value: "Vilnius, Naujamiestis" },
      { label: "Darbo laikas", value: "I–V 9:00–18:00" },
    ],
  },

  form: {
    sentTitle: "Ačiū — bet nieko neišsiuntėme.",
    sentBody:
      "Tai demonstracinė svetainė, todėl užklausa niekur nekeliavo. Tikroje svetainėje ši forma per kelias sekundes atsidurtų studijos pašte, o jūs gautumėte patvirtinimą.",
    again: "Pildyti iš naujo",
    name: "Vardas",
    namePlaceholder: "Kaip į jus kreiptis",
    email: "El. paštas",
    emailPlaceholder: "vardas@pastas.lt",
    type: "Objektas",
    /** Select options, by option value. */
    types: {
      butas: "Butas",
      namas: "Namas",
      komercine: "Komercinė erdvė",
      nezinau: "Dar nežinau",
    },
    area: "Plotas, m²",
    areaPlaceholder: "pvz. 74",
    message: "Trumpai apie erdvę",
    messagePlaceholder:
      "Kada planuojate pradėti, kas erdvėje netinka, ko norėtumėte.",
    submit: "Siųsti užklausą",
    note: "Atsakome per vieną darbo dieną. Pirmas pokalbis — nemokamas.",
  },

  footer: {
    nav: "Poraštės nuorodos",
  },
};

export type FormaCopy = typeof formaLt;
