/* ─────────────────────────────────────────────────────────────
   Skalsa demo, Lithuanian: every word a visitor sees or hears.

   This file is the source. en/skalsa.ts must have the same shape, and
   TypeScript checks it. Lists keep the order the page renders them in.
   Non-language data (prices, burn times, weights, ids, image paths,
   anchors) stays in the components and in data.tsx. Prices are formatted
   by eur() in data.tsx; the few amounts written into sentences below are
   formatted here, in this language's own way.
   ───────────────────────────────────────────────────────────── */

export const skalsaLt = {
  meta: {
    title: "Skalsa — rankų darbo žvakių el. parduotuvė",
    description:
      "Demonstracinė el. parduotuvė: rankomis liejamos sojų vaško žvakės, veikiantis krepšelis ir užsakymo eiga. Išgalvota įmonė, tikra svetainė.",
  },

  /** Burn time and weight, as the catalogue and the basket print them. */
  units: {
    hours: (hours: number) => `${hours} val.`,
    specs: (hours: number, grams: number) => `${hours} val. · ${grams} g`,
  },

  header: {
    navLabel: "Pagrindinė",
    /** Keyed by the section anchor each link points to. */
    links: {
      katalogas: "Katalogas",
      rinkiniai: "Rinkiniai",
      dirbtuve: "Dirbtuvė",
      pristatymas: "Pristatymas",
    },
    freeDelivery: "Nemokamas pristatymas nuo 40 €",
    basket: "Krepšelis",
    openBasket: (count: number) =>
      count > 0
        ? `Atidaryti krepšelį — prekių: ${count}`
        : "Atidaryti krepšelį — tuščias",
  },

  hero: {
    eyebrow: "Rankų darbo žvakės · liejame Vilniuje",
    /** The headline, split by hand into its two lines. */
    title: ["Vakaras, kuris", "kvepia namais."] as [string, string],
    lead: "Sojų vaškas, medvilninis dagtis ir perdirbtas stiklas. Liejame mažomis partijomis, todėl žvakė dega ilgai, tolygiai ir be aitraus dūmo.",
    shop: "Apsipirkti",
    how: "Kaip liejame",
    facts: ["Sojų vaškas", "45 val. degimo", "Liejama Vilniuje"],
    imageAlt: "Trys degančios sojų vaško žvakės ant medinio stalo",
  },

  catalog: {
    eyebrow: "Katalogas",
    title: "Šeši kvapai. Vienas vaškas.",
    lead: "Kvapą deriname taip, kad jis neužgožtų kambario, o tik pailgintų vakarą. Visos žvakės pilamos į perdirbamą stiklą — indą galima išplauti ir naudoti toliau.",
  },

  /** The candles' words, keyed by the product ids in data.tsx. */
  products: {
    "p-1": {
      name: "Gintaras ir kedras",
      scent: "Sakinga, šilta, su dūmo užuomina",
      alt: "Gintaro spalvos stiklainio žvakė prieblandoje",
    },
    "p-2": {
      name: "Pievų šienas",
      scent: "Sausa žolė, ramunės, vasaros pabaiga",
      alt: "Etiketuota žvakė ant lininio audinio",
    },
    "p-3": {
      name: "Levandos ir vanilė",
      scent: "Minkšta, migdanti, be muilo natos",
      alt: "Levandų kvapo žvakė su džiovintais žiedais",
    },
    "p-4": {
      name: "Sakai ir dūmas",
      scent: "Pušynas po lietaus, tolimas laužas",
      alt: "Du stiklainiai makrame laikikliuose",
    },
    "p-5": {
      name: "Rytinė kava",
      scent: "Šviežiai malta, su pieno saldumu",
      alt: "Nedidelė žvakė ant medinio padėklo",
    },
    "p-6": {
      name: "Figa ir juodasis serbentas",
      scent: "Žalia, sultinga, šiek tiek rūgštoka",
      alt: "Dvi žvakės šalia keramikinio dubens",
    },
  },

  /** The "add" button on product cards, bundles and basket suggestions. */
  addToBasket: {
    label: "Į krepšelį",
    added: "Pridėta",
    addLabel: (name: string) => `Įdėti „${name}“ į krepšelį`,
    addedLabel: (name: string) => `${name} — pridėta į krepšelį`,
  },

  bundles: {
    eyebrow: "Rinkiniai",
    title: "Kai reikia dovanos, o ne prekės.",
    imageAlt: "Žvakių asortimentas, degtukai ir lininis maišelis iš viršaus",
    /** Keyed by the bundle ids in data.tsx. `meta` and `alt` are what the
     *  basket shows for the bundle; `note` is the line under the price. */
    items: {
      "b-1": {
        name: "Vakaro trio",
        lead: "Trys kvapai vienai savaitei — nuo šiltos pradžios iki ramaus galo.",
        contains: ["Gintaras ir kedras", "Pievų šienas", "Levandos ir vanilė"],
        note: "Atskirai 68,00 €",
        meta: "Rinkinys · 3 žvakės",
        alt: "Žvakių asortimentas iš viršaus",
      },
      "b-2": {
        name: "Dovanų dėžutė",
        lead: "Supakuota taip, kad nieko nebereikėtų daryti — tik įteikti.",
        contains: [
          "Sakai ir dūmas",
          "Rytinė kava",
          "Ilgi degtukai medinėje dėžutėje",
          "Lininis maišelis ir ranka rašyta kortelė",
        ],
        meta: "Rinkinys · 2 žvakės ir priedai",
        alt: "Žvakių asortimentas iš viršaus",
      },
    },
  },

  studio: {
    eyebrow: "Dirbtuvė",
    title: "Trys žingsniai, jokių skubotų partijų.",
    lead: "Vienu kartu išliejame apie keturiasdešimt žvakių. Tiek telpa ant stalo, tiek spėjame patikrinti rankomis.",
    /** In order; the numbers and photos are in Studio.tsx. */
    steps: [
      {
        title: "Lydome",
        body: "Grynas sojų vaškas lydomas iki 65 °C. Be parafino, be dažiklių — todėl vaškas lieka pieno spalvos, o ne balintai baltas.",
        alt: "Dirbtuvėje liejamas išlydytas vaškas į stiklinį indą",
      },
      {
        title: "Maišome ranka",
        body: "Kvapiąjį aliejų įmaišome, kai vaškas atvėsta iki 52 °C. Dvi minutės ranka — mišiniui to užtenka, ir kvapas neišgaruoja pirmą vakarą.",
        alt: "Dvi poros rankų dirbtuvėje ruošia žvakes",
      },
      {
        title: "Brandiname",
        body: "Sustingusi žvakė ilsisi dešimt dienų, tik tada gauna etiketę ir 5 mm dagtį. Pirmą kartą uždekite dviem valandoms — vaškas turi ištirpti iki kraštų.",
        alt: "Degtukas uždega medvilninį žvakės dagtį",
      },
    ],
  },

  mood: {
    eyebrow: "Vakaras",
    quote: "Viena žvakė vakarui — ne dekoras, o ženklas, kad diena baigėsi.",
    rowAlt: "Žvakių eilė ant lygaus paviršiaus su atspindžiu",
    groupAlt: "Žvakių grupė tamsiame kambaryje",
  },

  shipping: {
    eyebrow: "Pristatymas ir grąžinimas",
    title: "Keturi dalykai, kuriuos verta žinoti.",
    facts: [
      {
        title: "Išsiunčiame per 1–2 d. d.",
        body: "Užsakymai renkami rytais. Kurjeris pristato per 2–4 darbo dienas visoje Lietuvoje.",
      },
      {
        title: "Nemokamai nuo 40 €",
        body: "Mažesniems užsakymams pristatymas kainuoja 3,50 €. Atsiimti dirbtuvėje — nemokama.",
      },
      {
        title: "14 dienų grąžinimas",
        body: "Neuždegtą žvakę priimame atgal be klausimų. Grąžinimo išlaidas padengiame mes.",
      },
      {
        title: "Supakuota dovanai",
        body: "Perdirbtas kartonas, medžio drožlės ir ranka rašyta kortelė — be plastiko.",
      },
    ],
  },

  /** The free-delivery progress bar's accessible name. The same bar
   *  appears in the delivery section and at the foot of the basket. */
  progressLabel: (from: number) => `Iki nemokamo pristatymo — riba ${from} €`,

  /** The live basket panel in the delivery section. */
  meter: {
    eyebrow: "Jūsų krepšelis",
    empty: (from: number) => `Nemokamas pristatymas prasideda nuo ${from} €.`,
    covered: "Pristatymą jau padengėme mes.",
    missing: (amount: string) => `Iki nemokamo pristatymo trūksta ${amount}.`,
    open: "Atidaryti krepšelį",
    view: "Peržiūrėti krepšelį",
    nothing: "Krepšelyje kol kas nieko nėra.",
    summary: (count: number, subtotal: string) =>
      `Krepšelyje ${count} vnt. · ${subtotal}`,
  },

  /** The basket drawer: basket, checkout and confirmation. */
  basket: {
    steps: {
      cart: "Krepšelis",
      checkout: "Duomenys",
      done: "Patvirtinimas",
    },
    /** The dialog's accessible name. */
    dialog: {
      cart: "Krepšelis",
      order: "Užsakymas",
    },
    heading: {
      cart: (count: number) => (count > 0 ? `Krepšelis (${count})` : "Krepšelis"),
      checkout: "Užsakymo santrauka",
      done: "Užsakymas nepateiktas",
    },
    close: "Uždaryti krepšelį",

    empty: {
      title: "Krepšelis kol kas tuščias.",
      body: (from: number) =>
        `Kiekviena žvakė liejama rankomis, todėl partijos nedidelės. Nemokamas pristatymas nuo ${from} €.`,
      browse: "Žiūrėti katalogą",
      suggest: "Galima pradėti nuo šių",
    },

    remove: (name: string) => `Pašalinti „${name}“ iš krepšelio`,
    decrease: (name: string) => `Sumažinti „${name}“ kiekį`,
    increase: (name: string) => `Padidinti „${name}“ kiekį`,

    freeNow: "Pristatymas nemokamas.",
    freeFrom: (from: number, missing: string) =>
      `Nemokamas pristatymas nuo ${from} € — trūksta ${missing}.`,
    subtotal: "Tarpinė suma",
    delivery: "Pristatymas",
    deliveryFree: "Nemokamas",
    total: "Iš viso",
    toCheckout: "Pereiti prie užsakymo",

    fields: {
      name: "Vardas ir pavardė",
      email: "El. paštas",
      address: "Miestas ir pristatymo adresas",
    },
    /** The browser's validation bubble, in the page's language. */
    validation: {
      name: "Įrašykite vardą ir pavardę.",
      email: "Įrašykite el. pašto adresą.",
      emailInvalid: "Įrašykite teisingą el. pašto adresą.",
      address: "Įrašykite miestą ir pristatymo adresą.",
    },
    /** Names the order button; keep it in step with `placeOrder`. */
    demoNote:
      "Tai demonstracinė parduotuvė. Paspaudus „Patvirtinti užsakymą“ niekas nebus pateikta, apmokėta ar išsiųsta — nei prekės, nei jūsų duomenys niekur nekeliauja.",
    includesDelivery: (delivery: string) => `Įskaitant pristatymą: ${delivery}`,
    includesFree: "nemokamas",
    placeOrder: "Patvirtinti užsakymą",
    back: "Grįžti į krepšelį",

    done: {
      title: "Taip atrodytų patvirtinimas.",
      body: "Čia baigiasi demonstracija: užsakymas nebuvo pateiktas, mokėjimas neįvyko ir jokie duomenys nebuvo išsiųsti. Tikroje parduotuvėje šioje vietoje pirkėjas gautų užsakymo numerį ir laišką, o jūs — pranešimą apie naują užsakymą.",
      items: "Prekės",
      count: (count: number) => `${count} vnt.`,
      total: "Suma",
    },
    keepShopping: "Tęsti apsipirkimą",
  },

  footer: {
    blurb:
      "Maža dirbtuvė, kurioje sojų vaško žvakės liejamos rankomis nedidelėmis partijomis. Siunčiame po visą Lietuvą.",
    navLabel: "Puslapio apačia",
    shop: "Parduotuvė",
    /** Keyed by the section anchor each link points to. */
    links: {
      katalogas: "Katalogas",
      rinkiniai: "Rinkiniai",
      dirbtuve: "Dirbtuvė",
      pristatymas: "Pristatymas ir grąžinimas",
    },
    contacts: "Pavyzdiniai kontaktai",
    workshop: "Dirbtuvė Vilniuje",
    hours: "I–V 10:00–17:00",
    legal: "© 2026 Skalsa · Sojų vaškas, medvilninis dagtis, perdirbamas stiklas",
    toTop: "Į viršų",
  },
};

export type SkalsaCopy = typeof skalsaLt;
