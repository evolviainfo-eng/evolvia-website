/* ─────────────────────────────────────────────────────────────
   Fumé demo, Lithuanian: every word a visitor sees or hears.

   This file is the source. en/fume.ts must have the same shape, and
   TypeScript checks it. Lists keep the order the page renders them in.

   The menu and wine prices are euro figures and are the same on both
   language versions: change one here, change it in en/fume.ts too.
   Image paths, sizes, anchors and the booking widget's hours stay in
   the components.
   ───────────────────────────────────────────────────────────── */

/** The parts of a calendar day the booking widget prints. `wd` is
 *  Date#getDay() (0 = Sunday), `month` is Date#getMonth() (0 = January). */
export type FumeDate = { wd: number; day: number; month: number };

/* Fixed word lists rather than Intl: the widget prints exactly the same
   text on the server and in every browser, whatever locale data they ship. */
const WD_LONG = [
  "sekmadienis",
  "pirmadienis",
  "antradienis",
  "trečiadienis",
  "ketvirtadienis",
  "penktadienis",
  "šeštadienis",
];
const WD_ACC = [
  "sekmadienį",
  "pirmadienį",
  "antradienį",
  "trečiadienį",
  "ketvirtadienį",
  "penktadienį",
  "šeštadienį",
];
const MONTH_GEN = [
  "sausio",
  "vasario",
  "kovo",
  "balandžio",
  "gegužės",
  "birželio",
  "liepos",
  "rugpjūčio",
  "rugsėjo",
  "spalio",
  "lapkričio",
  "gruodžio",
];

/** "trečiadienis, rugsėjo 17 d." */
function longDate(d: FumeDate) {
  return `${WD_LONG[d.wd]}, ${MONTH_GEN[d.month]} ${d.day} d.`;
}

/** Accusative — "laukiame jūsų penktadienį", not "…penktadienis". */
function whenDate(d: FumeDate) {
  return `${WD_ACC[d.wd]}, ${MONTH_GEN[d.month]} ${d.day} d.`;
}

/** Lithuanian numeral agreement: 1 laikas · 2–9 laikai · 10–20 laikų. */
function freeLabel(n: number) {
  const last = n % 10;
  const tens = Math.floor(n / 10) % 10;
  if (last === 1 && tens !== 1) return `Laisvas ${n} laikas`;
  if (last === 0 || tens === 1) return `Laisva ${n} laikų`;
  return `Laisvi ${n} laikai`;
}

export const fumeLt = {
  meta: {
    title: "Fumé — restoranas ir vyno baras, Užupis (demo)",
    description:
      "Demonstracinė svetainė: mažas atviros ugnies restoranas ir vyno baras Vilniaus Užupyje. Sezoninis meniu, vyno kortelė ir veikianti stalo rezervacija.",
  },

  /** A menu or wine-list price: 24 → "24 €", with a non-breaking space. */
  price: (amount: number) => `${amount} €`,

  nav: {
    label: "Pagrindinė navigacija",
    /** Keyed by the section each link scrolls to. */
    links: {
      menu: "Meniu",
      wine: "Vynas",
      space: "Erdvė",
      contact: "Kontaktai",
    },
    book: "Rezervuoti",
  },

  hero: {
    photoAlt: "Prieblandoje skendinti Fumé salė su padengtais stalais",
    lead: "Atviros ugnies virtuvė ir vyno baras. Trisdešimt keturios vietos Užupyje.",
    book: "Rezervuoti stalą",
    menu: "Vakaro meniu",
    /** The three facts under the hairline at the foot of the hero. */
    meta: ["Užupis, Vilnius", "Antradienis–Sekmadienis", "Durys nuo 17:00"],
  },

  intro: {
    eyebrow: "Užupis, Vilnius",
    /** Set by hand, one entry per line. */
    title: ["Vakaras, kuris", "neskuba."],
    body: [
      "Fumé — mažas restoranas su vyno baru senojoje Užupio kalvio dirbtuvėje. Trisdešimt keturios vietos, viena atviros ugnies virtuvė ir vienas serviravimas per vakarą: rezervuotas stalas lieka jūsų iki uždarymo.",
      "Meniu keičiasi pagal sezoną ir pagal tai, ką tą savaitę atveža ūkininkai. Nerasite jo išspausdinto metams į priekį — tai ne kortelė, o pokalbis su tuo, kas šiuo metu geriausia.",
    ],
    facts: [
      { k: "34", v: "vietos salėje" },
      { k: "~120", v: "pozicijų vyno kortelėje" },
      { k: "17:00", v: "atsidaro durys" },
    ],
    photoAlt: "Padengta Fumé salė šiltoje vakaro šviesoje",
  },

  fire: {
    kitchenAlt: "Fumé virtuvė darbo metu — virėjai prie atviros ugnies",
    eyebrow: "Virtuvė",
    /** Two lines: the first as is, the second with one word in italics. */
    title: {
      line1: "Viskas praeina",
      before: "pro ",
      italic: "ugnį",
      after: ".",
    },
    body: [
      "Židinys užkuriamas antrą valandą dienos ir dega iki paskutinio užsakymo. Ąžuolas ir alksnis, jokių dujų. Iš čia ir pavadinimas: fumé — rūkyta.",
      "Anglių karštis per vakarą keičiasi, tad tas pats šonkaulis šeštą ir dešimtą valandą nebūna visiškai vienodas. Mums tai atrodo teisinga.",
    ],
    lambAlt: "Ėrienos petys dubenyje su baltosiomis pupelėmis",
    meatAlt: "Ant anglių keptas mėsos patiekalas baltoje lėkštėje",
  },

  menu: {
    eyebrow: "Meniu",
    title: "Sezoninė kortelė",
    lead: "Kortelę perrašome kas tris–keturias savaites. Jei turite alergijų ar nevalgote mėsos — pasakykite salės vadovui, pritaikysime beveik viską.",
    /** n = dish, d = what comes with it, p = price in euros. */
    courses: [
      {
        title: "Pradžiai",
        note: "Skirta dalintis",
        items: [
          {
            n: "Duona ant anglių su lašinių sviestu",
            d: "svogūnų pelenai, jūros druska",
            p: 6,
          },
          {
            n: "Keptos porų širdelės",
            d: "dūmų grietinėlė, skrudinti lazdyno riešutai",
            p: 11,
          },
          {
            n: "Sūdyta menkė",
            d: "burokėlis, grietinė, krapų aliejus",
            p: 12,
          },
          {
            n: "Rūkyto ungurio tartinė",
            d: "ruginė duona, obuolys, krienai",
            p: 14,
          },
          {
            n: "Jautienos tartaras",
            d: "kepta duona, kaulų čiulpai, kaparėliai",
            p: 15,
          },
        ],
      },
      {
        title: "Pagrindiniai",
        note: "Visi — nuo atviros ugnies",
        items: [
          {
            n: "Ugnyje keptas kopūstas",
            d: "lęšiai, rūkyta grietinė, graikiniai riešutai",
            p: 19,
          },
          {
            n: "Ant alksnio anglių kepta lašiša",
            d: "pastarnokas, sviesto ir citrinos padažas",
            p: 24,
          },
          {
            n: "Ėrienos petys, troškintas dvylika valandų",
            d: "baltosios pupelės, mėtų aliejus",
            p: 28,
          },
          {
            n: "Ant anglių keptas jautienos šonkaulis",
            d: "keptas topinambas, juodųjų česnakų padažas",
            p: 32,
          },
        ],
      },
      {
        title: "Desertai",
        note: "Prie jų siūlome saldų vyną taurėmis",
        items: [
          {
            n: "Deginto cukraus kremas",
            d: "šaltalankiai, medaus krekeris",
            p: 9,
          },
          {
            n: "Šokoladinis pyragas su dūmų druska",
            d: "grietinėlės ledai",
            p: 10,
          },
          {
            n: "Lietuviškų sūrių rinkinys",
            d: "medus, riešutinė duona",
            p: 14,
          },
        ],
      },
    ],
    footnote:
      "Aptarnavimas į kainą neįskaičiuotas. Degustacinis vakaras — penki patiekalai, 58 € asmeniui — vyksta trečiadieniais, iš anksto.",
    /** The five plate photographs, in the order they are laid out. */
    plateAlts: [
      "Ant anglių kepta jautiena juodoje lėkštėje",
      "Sezoninių daržovių patiekalas",
      "Žuvies patiekalas šviesiame padaže",
      "Lašiša juodame dubenyje",
      "Desertų eilė ant medinio stalo",
    ],
  },

  wine: {
    eyebrow: "Vyno kortelė",
    /** Set by hand, one entry per line. */
    title: ["Apie 120 pozicijų.", "Štai penkios."],
    lead: "Kortelė sukasi apie mažus šeimos vynuogynus ir mažas partijas. Visą sąrašą rasite prie stalo — arba tiesiog paklauskite, ką atidarėme šįvakar.",
    /** The visual column headings above the list. */
    columns: {
      wines: "Taurėmis ir buteliais",
      glass: "Taurė",
      bottle: "Butelis",
    },
    /** Read out before each figure, since the headings are visual only. */
    srGlass: "Taurė: ",
    srBottle: "Butelis: ",
    /** n = wine, r = where it comes from, g / b = glass / bottle in euros. */
    list: [
      {
        n: "Nerello Mascalese",
        r: "Etna Rosso · Sicilija, Italija",
        g: 9,
        b: 46,
      },
      { n: "Riesling Trocken", r: "Mozelis · Vokietija", g: 8, b: 39 },
      {
        n: "Chenin Blanc",
        r: "Savennières, Luara · Prancūzija",
        g: 10,
        b: 52,
      },
      { n: "Blaufränkisch", r: "Burgenlandas · Austrija", g: 8, b: 42 },
      { n: "Tempranillo Reserva", r: "Rioja Alta · Ispanija", g: 9, b: 48 },
    ],
    note: "Dešimt vietų prie baro laikome nerezervuotų — vien taurei vyno užeiti galima be išankstinio susitarimo.",
    pourAlt: "Raudonas vynas pilamas į taurę prieblandoje",
    studioAlt: "Vyno pylimas į taurę švariame fone",
  },

  space: {
    eyebrow: "Erdvė",
    title: "Viena salė, dešimt žvakių.",
    body: "Plytų siena, ąžuolo stalai be staltiesių ir tiek šviesos, kad užtektų perskaityti kortelę. Muzika tyliai — kad girdėtųsi pokalbis prie savo stalo, o ne prie gretimo.",
    barAlt: "Fumé baras su degančiomis žvakėmis",
    barCaption:
      "Baras — dešimt vietų prie prekystalio, be išankstinės rezervacijos.",
    windowAlt: "Svytintis prekystalis matomas pro stiklą iš gatvės",
    lampsAlt: "Pakabinami šviestuvai virš salės stalų",
    lampsCaption: "Vakarui įsibėgėjus lieka žvakės ir šie šviestuvai.",
  },

  reservation: {
    eyebrow: "Rezervacija",
    title: "Rezervuokite stalą",
    lead: "Stalas lieka jūsų visam vakarui — antro serviravimo nedarome. Pasirinkite vakarą ir laiką, o likusia dalimi pasirūpinsime mes.",
    /** The three notes under the introduction. */
    facts: {
      closed: {
        dt: "Pirmadieniais nedirbame",
        dd: "Salė ilsisi, virtuvė ruošia naują kortelę.",
      },
      kitchen: {
        dt: "Virtuvė iki 22:30, sekmadieniais — 21:30",
        dd: "Paskutinį stalą sodiname 22:00, sekmadieniais — 21:00. Vynas pilamas ilgiau.",
      },
      groups: {
        dt: "Daugiau nei aštuoni?",
        dd: "Parašykite mums — didesnes kompanijas deriname atskirai.",
      },
    },

    /** Field names: the form's legends and labels, and the same words as
     *  the headings of the confirmation. */
    labels: {
      evening: "Vakaras",
      date: "Data",
      time: "Laikas",
      guests: "Svečiai",
      name: "Vardas",
      phone: "Telefonas",
      note: "Pastaba",
    },
    optional: "(nebūtina)",

    /* Calendar. */
    weekdayShort: ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"],
    monthShort: [
      "Sau",
      "Vas",
      "Kov",
      "Bal",
      "Geg",
      "Bir",
      "Lie",
      "Rgp",
      "Rgs",
      "Spa",
      "Lap",
      "Grd",
    ],
    /** The date on its own: accessible names, the summary line and the
     *  confirmation's "Data" row. */
    dateLabel: longDate,
    /** The date inside the confirmation sentence. */
    dateInSentence: whenDate,

    /** The small line at the foot of an evening chip. */
    day: {
      today: "Šiandien",
      tomorrow: "Rytoj",
      /** What a screen reader says for the same chip. */
      tomorrowSpoken: "rytoj",
      closed: "Nedirbame",
      late: "Jau vėlu",
    },
    /** An evening chip's accessible name: its date, then its status. */
    dayAria: (date: string, status: string) => `${date} — ${status}`,
    closedAria: "nedirbame",
    lateAria: "šiandien laikų nebeliko",
    /** A time chip that can no longer be booked. */
    takenAria: (time: string) => `${time} — užimta`,

    guests: (n: number) => (n === 1 ? "1 svečias" : `${n} svečiai`),

    /** The live line under the time grid. */
    helper: {
      noDay: "Perbraukti laikai užimti.",
      full: "Laisvų laikų šiam vakarui nebeliko.",
      free: (n: number) => `${freeLabel(n)} · perbraukti — užimti.`,
    },

    /** An evening with nothing left. */
    full: {
      title: "Šis vakaras jau pilnas.",
      note: "Vietos prie baro lieka nerezervuotos — arba rinkitės kitą vakarą.",
      pick: (d: FumeDate) => `Rinktis ${whenDate(d)}`,
    },

    errors: {
      time: "Pasirinkite laiką.",
      name: "Įrašykite, kieno vardu rezervuoti.",
      phone: "Įrašykite telefono numerį.",
    },

    namePlaceholder: "Vardas Pavardė",
    notePlaceholder: "Alergijos, gimtadienis, vieta prie lango…",
    submit: "Rezervuoti",
    /** Next to the button until an hour is chosen. */
    summaryEmpty: "Pasirinkite laiką.",
    formNote:
      "Demonstracinė forma — paspaudus nieko neišsiunčiame ir niekur neįrašome.",

    /** The confirmation. Its sentence is `lead` + date + `join` + time
     *  (in italics) + `end`. */
    done: {
      title: "Rezervacija patvirtinta",
      lead: "Laukiame jūsų ",
      join: ", ",
      end: ".",
      note: "Tai demonstracinė forma. Rezervacija nebuvo atlikta ir jokie duomenys niekur neišsiųsti — Fumé neegzistuoja.",
      again: "Rinktis iš naujo",
    },
  },

  footer: {
    eyebrow: "Kur mus rasti",
    title: "Užupis, Vilnius",
    badge: "Pavyzdiniai kontaktai",
    address: "Užupis, Vilnius",
    hoursLabel: "Darbo laikas",
    hoursCaption: "Fumé savaitės darbo laikas",
    /** d = days, h = hours. */
    hours: [
      { d: "Pirmadienis", h: "Nedirbame" },
      { d: "Antradienis–Ketvirtadienis", h: "17:00–23:00" },
      { d: "Penktadienis–Šeštadienis", h: "17:00–24:00" },
      { d: "Sekmadienis", h: "17:00–22:00" },
    ],
    hoursNote:
      "Virtuvė paskutinius užsakymus priima 22:30, sekmadieniais — 21:30. Baras dirba iki uždarymo.",
    goodToKnowLabel: "Naudinga žinoti",
    goodToKnow: [
      "Stalas — visam vakarui",
      "Prie baro rezervacijų nereikia",
      "Vaikams — pusporcijos",
      "Šuo prie baro laukiamas",
    ],
    tagline: "Restoranas ir vyno baras · Vilnius",
  },
};

export type FumeCopy = typeof fumeLt;
