import type { FumeCopy, FumeDate } from "@/i18n/dictionaries/lt/fume";

/* ─────────────────────────────────────────────────────────────
   Fumé demo, English. Same shape as lt/fume.ts (TypeScript enforces
   it). British spelling, the same short and plain voice, no em dashes.

   Place names in Lithuania keep their Lithuanian spelling; wine, grape
   and appellation names stay as the producers write them. Prices stay
   in euros with the same figures as the Lithuanian page; only the
   format changes ("€24").
   ───────────────────────────────────────────────────────────── */

/* Fixed word lists rather than Intl, so the server and every browser
   print exactly the same dates. */
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "Wednesday 17 September": British order, no comma, no ordinal. */
function longDate(d: FumeDate) {
  return `${WEEKDAYS[d.wd]} ${d.day} ${MONTHS[d.month]}`;
}

export const fumeEn: FumeCopy = {
  meta: {
    title: "Fumé: restaurant and wine bar, Užupis (demo)",
    description:
      "Demo website: a small open-fire restaurant and wine bar in Užupis, Vilnius. A seasonal menu, a wine list and working table booking.",
  },

  price: (amount: number) => `€${amount}`,

  nav: {
    label: "Main navigation",
    links: {
      menu: "Menu",
      wine: "Wine",
      space: "Space",
      contact: "Contact",
    },
    book: "Book",
  },

  hero: {
    photoAlt: "The Fumé dining room in half-light, with the tables laid",
    lead: "An open-fire kitchen and a wine bar. Thirty-four seats in Užupis.",
    book: "Book a table",
    menu: "Evening menu",
    meta: ["Užupis, Vilnius", "Tuesday–Sunday", "Doors from 17:00"],
  },

  intro: {
    eyebrow: "Užupis, Vilnius",
    title: ["An unhurried", "evening."],
    body: [
      "Fumé is a small restaurant and wine bar in an old blacksmith's workshop in Užupis. Thirty-four seats, one open-fire kitchen and one sitting a night: a booked table is yours until closing.",
      "The menu changes with the season and with what the farmers bring in that week. You won't find it printed a year in advance: it is less a set menu than a conversation with whatever is best right now.",
    ],
    facts: [
      { k: "34", v: "seats in the dining room" },
      { k: "~120", v: "wines on the list" },
      { k: "17:00", v: "doors open" },
    ],
    photoAlt: "The Fumé dining room, tables laid, in warm evening light",
  },

  fire: {
    kitchenAlt: "The Fumé kitchen during service, with cooks at the open fire",
    eyebrow: "The kitchen",
    title: {
      line1: "Everything",
      before: "meets the ",
      italic: "fire",
      after: ".",
    },
    body: [
      "The hearth is lit at two in the afternoon and burns until the last order. Oak and alder, no gas. Hence the name: fumé means smoked.",
      "The heat of the coals changes through the evening, so a rib served at six is never quite the same as one served at ten. That seems right to us.",
    ],
    lambAlt: "Lamb shoulder in a bowl with white beans",
    meatAlt: "A meat dish cooked over coals, on a white plate",
  },

  menu: {
    eyebrow: "Menu",
    title: "The seasonal menu",
    lead: "We rewrite it every three to four weeks. If you have allergies or don't eat meat, tell the restaurant manager: we can adapt almost any dish.",
    courses: [
      {
        title: "To start",
        note: "For sharing",
        items: [
          {
            n: "Coal-grilled bread with bacon butter",
            d: "onion ash, sea salt",
            p: 6,
          },
          {
            n: "Roasted leek hearts",
            d: "smoked cream, toasted hazelnuts",
            p: 11,
          },
          {
            n: "Salt-cured cod",
            d: "beetroot, soured cream, dill oil",
            p: 12,
          },
          {
            n: "Smoked eel tartine",
            d: "rye bread, apple, horseradish",
            p: 14,
          },
          {
            n: "Beef tartare",
            d: "fried bread, bone marrow, capers",
            p: 15,
          },
        ],
      },
      {
        title: "Mains",
        note: "All from the open fire",
        items: [
          {
            n: "Fire-roasted cabbage",
            d: "lentils, smoked soured cream, walnuts",
            p: 19,
          },
          {
            n: "Salmon grilled over alder coals",
            d: "parsnip, lemon butter sauce",
            p: 24,
          },
          {
            n: "Lamb shoulder, braised for twelve hours",
            d: "white beans, mint oil",
            p: 28,
          },
          {
            n: "Coal-grilled beef rib",
            d: "roasted Jerusalem artichoke, black garlic sauce",
            p: 32,
          },
        ],
      },
      {
        title: "Desserts",
        note: "We suggest sweet wine by the glass",
        items: [
          {
            n: "Burnt sugar cream",
            d: "sea buckthorn, honey cracker",
            p: 9,
          },
          {
            n: "Chocolate cake with smoked salt",
            d: "sweet cream ice cream",
            p: 10,
          },
          {
            n: "Selection of Lithuanian cheeses",
            d: "honey, nut bread",
            p: 14,
          },
        ],
      },
    ],
    footnote:
      "Service is not included. The tasting evening, five courses at €58 per person, runs on Wednesdays by advance booking.",
    plateAlts: [
      "Coal-grilled beef on a black plate",
      "A dish of seasonal vegetables",
      "A fish dish in a pale sauce",
      "Salmon in a black bowl",
      "A row of desserts on a wooden table",
    ],
  },

  wine: {
    eyebrow: "Wine list",
    title: ["About 120 wines.", "Here are five."],
    lead: "Our list centres on small family vineyards and small batches. You'll find all of it at the table, or just ask what we've opened tonight.",
    columns: {
      wines: "By glass and bottle",
      glass: "Glass",
      bottle: "Bottle",
    },
    srGlass: "Glass: ",
    srBottle: "Bottle: ",
    list: [
      {
        n: "Nerello Mascalese",
        r: "Etna Rosso · Sicily, Italy",
        g: 9,
        b: 46,
      },
      { n: "Riesling Trocken", r: "Mosel · Germany", g: 8, b: 39 },
      {
        n: "Chenin Blanc",
        r: "Savennières, Loire · France",
        g: 10,
        b: 52,
      },
      { n: "Blaufränkisch", r: "Burgenland · Austria", g: 8, b: 42 },
      { n: "Tempranillo Reserva", r: "Rioja Alta · Spain", g: 9, b: 48 },
    ],
    note: "We keep the ten seats at the bar free of bookings, so you can drop in for just a glass of wine.",
    pourAlt: "Red wine being poured into a glass in low light",
    studioAlt: "Wine being poured into a glass against a plain background",
  },

  space: {
    eyebrow: "The space",
    title: "One room, ten candles.",
    body: "A brick wall, bare oak tables and just enough light to read the menu. The music is kept low, so you hear the conversation at your own table, not the one next to it.",
    barAlt: "The Fumé bar with candles burning",
    barCaption: "The bar: ten seats at the counter, no booking needed.",
    windowAlt: "The glowing bar counter, seen through the glass from the street",
    lampsAlt: "Pendant lights above the dining tables",
    lampsCaption: "Later in the evening, only the candles and these lamps stay lit.",
  },

  reservation: {
    eyebrow: "Reservations",
    title: "Book a table",
    lead: "The table is yours for the whole evening: we don't do a second sitting. Choose the evening and the time, and we'll take care of the rest.",
    facts: {
      closed: {
        dt: "Closed on Mondays",
        dd: "The dining room rests and the kitchen prepares the new menu.",
      },
      kitchen: {
        dt: "Kitchen until 22:30, Sundays 21:30",
        dd: "We seat the last table at 22:00, on Sundays at 21:00. Wine is served later than that.",
      },
      groups: {
        dt: "More than eight?",
        dd: "Write to us: we arrange larger groups separately.",
      },
    },

    labels: {
      evening: "Evening",
      date: "Date",
      time: "Time",
      guests: "Guests",
      name: "Name",
      phone: "Phone",
      note: "Note",
    },
    optional: "(optional)",

    weekdayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dateLabel: longDate,
    /* English needs no separate form: the "on" is part of done.lead. */
    dateInSentence: longDate,

    day: {
      today: "Today",
      /* "Tomorrow" is 69px set in the chip's 11px caps; the chip is 67px.
         The label says "Next day" and screen readers still hear "tomorrow". */
      tomorrow: "Next day",
      tomorrowSpoken: "tomorrow",
      closed: "Closed",
      late: "Too late",
    },
    dayAria: (date: string, status: string) => `${date}, ${status}`,
    closedAria: "closed",
    lateAria: "no tables left today",
    takenAria: (time: string) => `${time}, taken`,

    guests: (n: number) => (n === 1 ? "1 guest" : `${n} guests`),

    helper: {
      noDay: "Crossed-out times are taken.",
      full: "No times left for this evening.",
      free: (n: number) =>
        `${n} ${n === 1 ? "time" : "times"} available · crossed out means taken.`,
    },

    full: {
      title: "This evening is fully booked.",
      note: "The seats at the bar are kept for walk-ins. Or choose another evening.",
      pick: (d: FumeDate) => `Choose ${longDate(d)}`,
    },

    errors: {
      time: "Choose a time.",
      name: "Enter the name for the booking.",
      phone: "Enter a phone number.",
    },

    namePlaceholder: "Full name",
    notePlaceholder: "Allergies, a birthday, a table by the window…",
    submit: "Book",
    summaryEmpty: "Choose a time.",
    formNote: "Demo form: nothing is sent or saved when you press the button.",

    done: {
      title: "Booking confirmed",
      lead: "We'll see you on ",
      join: " at ",
      end: ".",
      note: "This is a demo form. No booking was made and no details were sent anywhere. Fumé does not exist.",
      again: "Start again",
    },
  },

  footer: {
    eyebrow: "Find us",
    title: "Užupis, Vilnius",
    badge: "Demo contact details",
    address: "Užupis, Vilnius",
    hoursLabel: "Opening hours",
    hoursCaption: "Fumé's weekly opening hours",
    hours: [
      { d: "Monday", h: "Closed" },
      { d: "Tuesday–Thursday", h: "17:00–23:00" },
      { d: "Friday–Saturday", h: "17:00–24:00" },
      { d: "Sunday", h: "17:00–22:00" },
    ],
    hoursNote:
      "The kitchen takes last orders at 22:30, on Sundays at 21:30. The bar serves until we close.",
    goodToKnowLabel: "Good to know",
    goodToKnow: [
      "Your table, all evening",
      "No booking needed at the bar",
      "Half portions for children",
      "Dogs welcome at the bar",
    ],
    tagline: "Restaurant and wine bar · Vilnius",
  },
};
