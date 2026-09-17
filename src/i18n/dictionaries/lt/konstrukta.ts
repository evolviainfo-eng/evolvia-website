/* ─────────────────────────────────────────────────────────────
   Konstrukta demo, Lithuanian: every word a visitor sees or hears.

   This file is the source. en/konstrukta.ts must have the same shape,
   and TypeScript checks it. Lists keep the order the page renders them
   in. Non-language data (image paths, sizes, rates, anchors, reference
   codes) stays in the components; entries keyed by id (projects, photos,
   calculator groups) use the same ids as the component that renders
   them.
   ───────────────────────────────────────────────────────────── */

/** One line of a spec table: label, then value. */
type Row = [label: string, value: string];

/** What the calculator hands over to the enquiry form. Amounts arrive
 *  already formatted for the page's language. */
type EstimateMessage = {
  type: string;
  area: number;
  works: string[];
  finish: string;
  /** e.g. "84 200–128 400 €" */
  total: string;
  /** e.g. "1 170–1 780 €/m²" */
  perM2: string;
};

export const konstruktaLt = {
  meta: {
    title: "Konstrukta — statybos bendrovė Kaune",
    description:
      "Demonstracinė svetainė: generalinės rangos bendrovė su veikiančia sąmatos skaičiuokle. Įmonė išgalvota, svetainė tikra.",
  },

  /** Object types, shared by the calculator and the enquiry form: the form
   *  preselects whatever the calculator hands over by matching these
   *  labels, so both must read the same list. */
  objectTypes: {
    namas: "Namas",
    butas: "Butas",
    komercija: "Komercinės patalpos",
    kita: "Kita",
  },

  nav: {
    label: "Pagrindinė navigacija",
    /** Keyed by the section id each link jumps to. */
    links: {
      paslaugos: "Ką statome",
      objektai: "Objektai",
      eiga: "Eiga",
      samata: "Sąmata",
      kontaktai: "Kontaktai",
    },
    /** The call to action: short form below `sm`, long form above. */
    ctaShort: "Sąmata",
    ctaLong: "Skaičiuoti sąmatą",
  },

  hero: {
    alt: "Statybos aikštelė vakare: apšviestas besistatančio pastato karkasas ir kranas",
    eyebrow: "Generalinis rangovas · Kaunas",
    /** The headline, broken by hand into two lines. */
    title: ["Statome tai,", "kas išlieka."] as [string, string],
    lead: "Karkasinė ir mūrinė statyba, renovacija, vidaus apdaila. Vienas rangovas, vienas grafikas — nuo iškasos iki statybos užbaigimo akto.",
    primary: "Skaičiuoti sąmatą",
    secondary: "Peržiūrėti objektus",
    facts: [
      "Nuo 2009",
      "Kaunas ir apskritis",
      "40 objektų",
      "12 žmonių komanda",
    ],
  },

  company: {
    label: "Bendrovė",
    title: "Viena komanda, viena atsakomybė.",
    lead: "Konstrukta dirba Kaune nuo 2009-ųjų. Imamės objekto kaip generalinis rangovas: patys sudarome grafiką, patys samdome subrangovus ir patys atsakome, jei kas nors nukrypsta. Užsakovas turi vieną numerį ir vieną žmogų, kuris žino visą objektą.",
    facts: [
      ["Įsteigta", "2009 m."],
      ["Teisinė forma", "UAB"],
      ["Veikla", "Generalinė ranga"],
      ["Teritorija", "Kaunas · 60 km spinduliu"],
      ["Komanda", "12 nuolatinių darbuotojų"],
      ["Objektų nuo 2009", "40"],
      ["Konstrukcijų garantija", "5 metai"],
      ["Objekto apžiūra", "Nemokama"],
    ] as Row[],
    alt: "Baltos betono formos — konstrukcijos paviršiaus tekstūra",
    caption:
      "Monolitas be apdailos · paviršius paliekamas matomas tik tada, kai klojinys to vertas",
  },

  services: {
    label: "Ką statome",
    title: "Keturios sritys. Nė viena — „taip pat galime“.",
    lead: "Nesiimame darbų, kuriems neturime nei savo komandos, nei patikrinto subrangovo. Trumpesnis sąrašas — mažiau staigmenų grafike.",
    alt: "Medinis namo karkasas su pastoliais statybos aikštelėje",
    caption: "Karkasas · Ringaudai · 11 darbo dienų iki uždaro kontūro",
    items: [
      {
        no: "01",
        title: "Karkasinė statyba",
        body: "Medinis karkasas pjaunamas pagal gamyklinį brėžinį ir surenkamas aikštelėje. Uždaras kontūras — per 3–5 savaites nuo pamatų.",
        specs: ["Mediena C24", "Žingsnis 600 mm", "U ≤ 0,13 W/m²K"],
      },
      {
        no: "02",
        title: "Mūrinė statyba",
        body: "Keramzitblokių ir keraminių plytų mūras su monolitinėmis perdangomis. Sunkiau, lėčiau, bet šimtmečiui.",
        specs: ["Keramzitblokis", "Monolitinė perdanga", "A++ klasė"],
      },
      {
        no: "03",
        title: "Renovacija ir fasadai",
        body: "Senų namų apšiltinimas, tinkuojamos ir vėdinamos fasado sistemos, stogo keitimas. Pradedame nuo termovizinės nuotraukos, ne nuo katalogo.",
        specs: [
          "Tinkuojama sistema",
          "Vėdinamas fasadas",
          "Termovizinis auditas",
        ],
      },
      {
        no: "04",
        title: "Vidaus apdaila",
        body: "Elektra, santechnika, vėdinimas, glaistymas, grindys, dažai. Ta pati komanda, kuri statė sienas — todėl nėra ko kaltinti.",
        specs: [
          "Inžinerinės sistemos",
          "Apdailos darbai",
          "Objekto perdavimas",
        ],
      },
    ],
  },

  projects: {
    label: "Objektai",
    title: "Keturi objektai iš keturiasdešimties.",
    lead: "Kiekvienas įrašas — su tuo, kas iš tikrųjų rūpi: plotas, metai, trukmė ir viena techninė aplinkybė, kuri nulėmė sprendimą.",
    /** Keyed by the project id in Projects.tsx. */
    items: {
      ringaudai: {
        title: "Vienbutis namas, Ringaudai",
        body: "Karkasinis namas su pusiau įleista terasa. Sklypo nuolydis 2,4 m — pamatai suprojektuoti pakopomis, kad nereikėtų vežti grunto.",
        alt: "Baigtas modernus vienbutis namas su tamsia fasado apdaila",
        specs: [
          ["Plotas", "186 m²"],
          ["Metai", "2024"],
          ["Tipas", "Karkasinė statyba iki raktų"],
          ["Trukmė", "7 mėn."],
          ["Statusas", "Perduotas"],
        ] as Row[],
      },
      domeikava: {
        title: "Namas su panoraminiais langais, Domeikava",
        body: "Mūrinis namas, kurio pietinė siena beveik visa stiklinė. Perdanga monolitinė — kitaip nebūtų atlaikiusi 4,8 m tarpatramio virš svetainės.",
        alt: "Namas su dideliais langais ir prižiūrėta veja prieš jį",
        specs: [
          ["Plotas", "214 m²"],
          ["Metai", "2023"],
          ["Tipas", "Mūrinė statyba"],
          ["Trukmė", "11 mėn."],
          ["Statusas", "Perduotas"],
        ] as Row[],
      },
      aleksotas: {
        title: "Biurų pastatas, Kaunas, Aleksotas",
        body: "Trijų aukštų komercinis pastatas smulkiam verslui. Fasadas — matomas betonas, todėl klojinys buvo perkamas naujas, o ne nuomojamas.",
        alt: "Betono viešasis pastatas su ritmiškais langų blokais",
        specs: [
          ["Plotas", "640 m²"],
          ["Metai", "2025"],
          ["Tipas", "Komercinė statyba"],
          ["Trukmė", "14 mėn."],
          ["Statusas", "Perduotas"],
        ] as Row[],
      },
      garliava: {
        title: "Monolitinės perdangos, Garliava",
        body: "Konstrukcijų darbai kito rangovo objekte. Betonuota trimis etapais, kiekvienas — per vieną dieną, kad nebūtų šaltų siūlių.",
        alt: "Monolitinė betono perdanga, fotografuota iš apačios",
        specs: [
          ["Plotas", "1 240 m² perdangų"],
          ["Metai", "2025"],
          ["Tipas", "Konstrukcijų darbai"],
          ["Trukmė", "5 mėn."],
          ["Statusas", "Vykdomas"],
        ] as Row[],
      },
    },
  },

  phases: {
    alt: "Statybos aikštelė iš viršaus: paklota armatūra prieš betonavimą",
    label: "Kaip dirbame",
    title: "Penki etapai su datomis, ne su pažadais.",
    lead: "Trukmės nurodytos vidutiniam 180–220 m² objektui. Į sutartį įrašomos konkrečios jūsų objekto datos, o kiekvieno etapo pabaiga fiksuojama aktu.",
    items: [
      {
        no: "01",
        title: "Apžiūra ir sąmata",
        body: "Atvažiuojame į sklypą, matuojame, klausiame apie biudžetą atvirai. Grįžtame su sąmata, kurioje matosi kiekviena eilutė — ne viena suma apačioje.",
        time: "1–2 sav.",
      },
      {
        no: "02",
        title: "Projektas ir leidimai",
        body: "Techninis projektas, derinimai su tinklais, statybą leidžiantis dokumentas. Popierius tvarkome patys — užsakovui lieka tik pasirašyti.",
        time: "4–8 sav.",
      },
      {
        no: "03",
        title: "Pamatai ir konstrukcijos",
        body: "Iškasos, pamatai, sienos, perdangos. Nuo šio etapo aikštelėje dirbama kasdien, o kas penktadienį gaunate nuotraukas ir savaitės ataskaitą.",
        time: "6–12 sav.",
      },
      {
        no: "04",
        title: "Stogas, fasadas, inžinerija",
        body: "Uždaromas kontūras, tada elektra, santechnika, vėdinimas. Objektas paruošiamas apdailai dar iki šalčių — grafikas tam ir daromas.",
        time: "8–14 sav.",
      },
      {
        no: "05",
        title: "Apdaila ir perdavimas",
        body: "Vidaus apdaila, sutvarkyta aplinka, statybos užbaigimo aktas, raktai ir aplankas su visomis medžiagų deklaracijomis.",
        time: "6–10 sav.",
      },
    ],
  },

  estimator: {
    label: "Sąmatos skaičiuoklė",
    title: "Pasitikrinkite tvarką prieš skambindami.",
    lead: "Įrašykite plotą, pažymėkite darbų grupes — intervalas atsinaujina iškart. Tai tie patys įkainiai, nuo kurių pradedame skaičiuoti tikrą sąmatą.",
    typeLegend: "Objekto tipas",
    areaLabel: "Plotas, m²",
    areaSlider: "Objekto plotas kvadratiniais metrais",
    worksLegend: "Darbų apimtis",
    /** Keyed by the work group id in Estimator.tsx. */
    works: {
      pamatai: {
        label: "Pamatai",
        note: "Iškasos, pamatas, hidroizoliacija",
      },
      karkasas: {
        label: "Karkasas ir sienos",
        note: "Konstrukcijos, perdangos",
      },
      stogas: {
        label: "Stogas",
        note: "Santvaros, danga, lietaus sistema",
      },
      fasadas: {
        label: "Fasadas",
        note: "Apšiltinimas, apdaila, langai",
      },
      apdaila: {
        label: "Vidaus apdaila",
        note: "Nuo glaistymo iki grindų",
      },
      inzinerija: {
        label: "Inžinerija",
        note: "Elektra, santechnika, vėdinimas",
      },
    },
    /** The finish level: the radio group's legend and the result row. */
    finishLevel: "Apdailos lygis",
    /** Keyed by the finish id in Estimator.tsx. */
    finishes: {
      standartine: "Standartinė",
      aukstesne: "Aukštesnė",
      premium: "Premium",
    },
    finishHint:
      "Lygis keičia tik vidaus apdailos ir inžinerijos įkainius — konstrukcijos kainuoja tiek pat.",
    resultTitle: "Preliminari sąmata",
    /** Around the two totals: "nuo 84 200 € iki 128 400 €". */
    from: "nuo",
    to: "iki",
    /** The total when no group is ticked. */
    emptyTotal: "— €",
    emptyPrompt: "Pažymėkite bent vieną darbų grupę.",
    /** 1–6 groups only, so two forms cover it correctly. */
    groups: (n: number) => (n === 1 ? "1 darbų grupė" : `${n} darbų grupės`),
    breakdown: "Sudėtis",
    breakdownUnit: "Jūsų atveju, €/m²",
    breakdownEmpty:
      "Nepažymėta nė viena grupė, todėl sąmatoje kol kas nėra nė vienos eilutės. Pažymėkite kairėje — intervalas atsiras iškart.",
    /** The finish row when no group is ticked. */
    finishNone: "—",
    /** The finish row when none of the ticked groups is priced by it. */
    finishNotIncluded: "Neįskaičiuota",
    disclaimer:
      "Įkainiai su PVM. Tiksli kaina — po objekto apžiūros ir techninio projekto peržiūros. Į skaičių neįeina sklypo darbai, baldai ir projektavimas.",
    cta: "Gauti tikslią sąmatą",
    ctaDisabledNote: "Pažymėkite darbus, kad galėtumėte tęsti",
    ctaNote: "Parametrai persikels į užklausos formą",
    /** Currency placement. The number (or "lo–hi" range) arrives already
     *  grouped: "84 200" → "84 200 €". */
    price: (amount: string) => `${amount} €`,
    /** "180–260" → "180–260 €/m²". */
    pricePerM2: (amount: string) => `${amount} €/m²`,
    /** The text the calculator puts into the enquiry form's message. */
    message: (d: EstimateMessage) =>
      [
        `Objekto tipas: ${d.type}`,
        `Plotas: ${d.area} m²`,
        `Darbai: ${d.works.join(", ")}`,
        `Apdailos lygis: ${d.finish}`,
        `Preliminari sąmata: ${d.total} (${d.perM2})`,
        "",
        "Norėčiau tikslios sąmatos po objekto apžiūros.",
      ].join("\n"),
  },

  craft: {
    label: "Amatas",
    title: "Kokybė matosi ten, kur niekas nežiūri.",
    lead: "Keturios detalės iš eilinių darbo dienų. Ne rikiuotė prieš objektyvą — tiesiog tai, kaip atrodo tvarkinga aikštelė.",
    /** Keyed by the photo id in Craft.tsx. */
    shots: {
      cut: {
        alt: "Betono pjovimas deimantiniu disku, kyla dulkės",
        caption:
          "Angos pjaunamos deimantiniu disku. Be smūgių — todėl aplink pjūvį nelieka įtrūkimų.",
      },
      worker: {
        alt: "Statybininkas dirba ant medinio karkaso konstrukcijos",
        caption:
          "Karkasas renkamas pagal gamyklinį brėžinį. Kiekviena jungtis turi savo numerį ir savo varžtą.",
      },
      truss: {
        alt: "Stogo santvarų konstrukcija iš vidaus",
        caption:
          "Santvaros — žingsnis 600 mm, mediena C24, apdorota antiseptiku dar sandėlyje.",
      },
      scaffold: {
        alt: "Pastoliai prie pastato fasado prieblandoje",
        caption:
          "Pastoliai statomi su apsauginiu tinklu, o aikštelė sutvarkoma kiekvieno etapo pabaigoje.",
      },
    },
  },

  contact: {
    label: "Kontaktai",
    title: "Pradedame nuo apžiūros, ne nuo sutarties.",
    lead: "Atvažiuojame į sklypą arba objektą Kaune ir 60 km spinduliu — nemokamai. Po apžiūros gaunate sąmatą su išskaidytomis eilutėmis ir realiu grafiku.",
    tag: "Pavyzdiniai kontaktai",
    details: [
      ["Telefonas", "+370 600 00000"],
      ["El. paštas", "info@konstrukta.demo"],
      ["Adresas", "Savanorių pr. 000, Kaunas"],
      ["Įmonės kodas", "000 000 000"],
      ["PVM kodas", "LT000000000"],
    ] as Row[],
    hoursTitle: "Darbo laikas",
    hours: [
      ["I–IV", "8:00–17:00"],
      ["V", "8:00–15:00"],
      ["VI–VII", "Nedirbame"],
    ] as Row[],
    note: "Į skambučius atsiliepia objektų vadovas, ne registratūra. Jei nepavyko prisiskambinti — vadinasi, esame ant stogo; parašykite ir perskambinsime tą pačią dieną.",
  },

  form: {
    title: "Užklausa dėl apžiūros",
    replyTime: "Atsakome per 1 darbo dieną",
    prefilled: "Parametrai perkelti iš skaičiuoklės",
    nameLabel: "Vardas",
    namePlaceholder: "Vardenis",
    phoneLabel: "Telefonas",
    typeLabel: "Objekto tipas",
    areaLabel: "Plotas, m²",
    messageLabel: "Apie objektą",
    messagePlaceholder:
      "Sklypas, terminai, ką jau turite (projektą, leidimą, sąmatą)…",
    submit: "Siųsti užklausą",
    demoNote: "Demonstracinė forma — užklausa niekur neišsiunčiama.",
    /** The confirmation that replaces the form after "submit". */
    sentEyebrow: "Užklausa suformuota",
    sentTitle: "Forma veikia — bet niekas neišsiųsta.",
    sentBody:
      "Tai demonstracinė svetainė, todėl užklausa niekur nekeliavo ir jokio skambučio nebus. Tikroje svetainėje ši užklausa jau būtų nukeliavusi į jūsų el. paštą su visais skaičiuoklės parametrais.",
    back: "Grįžti į formą",
  },

  footer: {
    /** Screen-reader text on the wordmark link. */
    backToTop: "Grįžti į viršų",
    contacts: "Pavyzdiniai kontaktai · +370 600 00000 · info@konstrukta.demo",
  },
};

export type KonstruktaCopy = typeof konstruktaLt;
