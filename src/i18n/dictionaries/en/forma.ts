import type { FormaCopy } from "@/i18n/dictionaries/lt/forma";

/* ─────────────────────────────────────────────────────────────
   Forma demo, English. Same shape as lt/forma.ts (TypeScript enforces
   it). British spelling, the same short and calm voice, no em dashes.

   Place names keep their Lithuanian spelling. Prices stay in euros with
   the same figures as the Lithuanian page; only the format changes.
   ───────────────────────────────────────────────────────────── */

export const formaEn: FormaCopy = {
  meta: {
    title: "Forma: interior architecture studio",
    description:
      "Demo website: the portfolio of an interior architecture studio, with a filterable project index and a full-screen gallery.",
  },

  sections: {
    approach: "Approach",
    studio: "Studio",
    projects: "Projects",
    services: "Services",
    process: "Process",
    contact: "Contact",
  },

  nav: {
    home: "Forma, back to the top",
    tagline: "Interior architecture",
    label: "Page sections",
  },

  hero: {
    eyebrow: "Interior architecture studio · Vilnius",
    lines: ["A space where", "everything is", "in its place."],
    lead: "Two architects. Flats, private houses and small commercial spaces, from the first plan to the last door handle, with no one in between.",
    imageAlt: "Bright living room with a panoramic window facing the trees",
    view: "View project",
  },

  studio: {
    split: ["The", "studio"],
    link: "How we work",
    kinds: ["Flats", "Houses", "Commercial spaces"],
  },

  approach: {
    items: [
      {
        title: "We start with your day, not a photograph.",
        body: "The first conversation is about how your morning goes, how many people sit down to dinner and where you leave your keys in the evening. The plan comes from the answers, not from a catalogue.",
      },
      {
        title: "Fewer materials, chosen more precisely.",
        body: "Three or four across the whole project. They have to work together for ten years, not one season, so we choose slowly and always from real samples, not from a screen.",
      },
      {
        title: "A drawing is not yet an interior.",
        body: "So we stay on the job until the very end. When something doesn't fit on site, and on every build something doesn't, we solve it there and then, not over email.",
      },
    ],
  },

  projects: {
    split: ["Selected", "projects"],
    view: "View",
    title: "The six projects we show first.",
    lead: "Flats, houses and small commercial spaces in and around Vilnius. Open a project to see a large photograph and a short explanation of the design.",
    filterLabel: "Filter projects by type",
    filters: {
      visi: "All",
      butas: "Flats",
      namas: "Houses",
      komercine: "Commercial",
    },
    showing: "Showing",
    announce: (shown, total) =>
      `Showing ${shown} of ${total} ${total === 1 ? "project" : "projects"}.`,
    emptyTitle: "We don't show this kind of work publicly yet.",
    emptyBody:
      "We have some in our archive. Write to us and we will send the ones best suited to your space.",
    showAll: "Show all projects",
    cardLabel: (p) =>
      `Open project: ${p.title}. ${p.kindLabel}, ${p.area}, ${p.place}, ${p.year}. ${p.scope}`,
    kinds: {
      butas: "Flat",
      namas: "House",
      komercine: "Commercial",
    },
    items: {
      "p-1": {
        title: "Flat in Žvėrynas",
        place: "Vilnius",
        scope: "Full design · site supervision",
        note: "A three-room flat in an interwar building. Taking down one partition wall opened up a long living area with a view of the trees in the courtyard. The furniture was made to our design to fit the uneven walls.",
        alt: "Living room in neutral tones with a sofa and daylight",
      },
      "p-5": {
        title: "House in Sudervė",
        place: "Near Vilnius",
        scope: "Full design · site supervision",
        note: "A house for a family with two children. The fireplace is the only heavy mass in a light space; everything else stands clear of the walls, so the floor reads as one surface.",
        alt: "Bright living room with a fireplace and upholstered furniture",
      },
      "p-2": {
        title: "Beauty studio in Naujamiestis",
        place: "Vilnius",
        scope: "Full design",
        note: "A studio on the ground floor of a residential building. Ash floors and a single row of niches along one wall, so the equipment and products stay out of sight and the client sees only the light and herself.",
        alt: "Bright space with wooden floors and large windows",
      },
      "p-3": {
        title: "Flat in Šnipiškės",
        place: "Vilnius",
        scope: "Full design · furniture design",
        note: "A flat in a new-build block, where the kitchen and living room are one space. The island was set at a height that suits the family and became the main table in the home. They never needed a dining table after all.",
        alt: "Kitchen with an island and tall cabinets",
      },
      "p-6": {
        title: "Guest apartments in Užupis",
        place: "Vilnius",
        scope: "Full design · site supervision",
        note: "Two rental apartments on the edge of the Old Town. A warm palette and textiles instead of decoration: a room has to feel lived in, not like a hotel, and take no more than forty minutes to clean.",
        alt: "Bedroom in a warm palette with textiles",
      },
      "p-4": {
        title: "House in Balsiai",
        place: "Vilnius",
        scope: "Consultation · full design",
        note: "A bedroom with two windows facing opposite ways, one east and one west. The wardrobe is hidden behind panels flush with the wall, so all you see in the room is the bed and the light.",
        alt: "Bedroom with two windows and a calm sleeping area",
      },
    },
  },

  lightbox: {
    strip: "Gallery frames",
    show: (title) => `Show project: ${title}`,
    close: "Close project view",
    closeShort: "Close",
    previous: "Previous project",
    next: "Next project",
  },

  services: {
    split: ["Our", "services"],
    title: "Three ways to work together.",
    lead: "Most clients choose the full design with site supervision. But if the space is small or there is only one decision to make, a smaller step is enough.",
    items: [
      {
        title: "Full interior design",
        price: "from €45/m²",
        body: "Layout, visualisations, working drawings, and specifications for materials and furniture. Your builders get a document they can work from without further questions.",
        points: [
          "Two or three layout options",
          "Furniture design and drawings",
          "Materials list with prices and suppliers",
        ],
      },
      {
        title: "Consultation",
        price: "€180 per visit",
        body: "Two hours in your space or over your floor plan. Useful when you need to get a few decisions right before work starts, not a whole project.",
        points: [
          "Layout check for mistakes",
          "Colour and material direction",
          "Written summary within three days",
        ],
      },
      {
        title: "Site supervision",
        price: "from €12/m²",
        body: "We visit the site, coordinate with contractors, and check the details and the actual dimensions. So that the interior as built matches the one on paper.",
        points: [
          "Visits every two weeks",
          "Drawings adjusted to site conditions",
          "Liaising with contractors and suppliers",
        ],
      },
    ],
    note: "Prices are a guide and depend on how complex the space is. We confirm the exact figure in writing after the first meeting, and it does not change after that.",
  },

  process: {
    split: ["Our", "process"],
    label: "How a project runs, four steps",
    title: "From the first measurement to the last handle.",
    steps: [
      {
        title: "Meeting on site",
        body: "We measure, take photographs and ask a lot of questions. Within a week you get a proposal with a firm price and timings.",
        when: "1 week",
      },
      {
        title: "Layout",
        body: "Two or three options on paper. We choose together until one is clearly right, and only then do we move on.",
        when: "2-3 weeks",
      },
      {
        title: "Design and materials",
        body: "Visualisations, working drawings, specifications. We go to the showrooms together and feel every material by hand.",
        when: "4-6 weeks",
      },
      {
        title: "Site supervision",
        body: "We are on site every two weeks, and whenever we are needed. Down to the last handle and the last switch.",
        when: "During build",
      },
    ],
  },

  mood: {
    alts: [
      "Living room at dusk, soft light",
      "Detail of a wooden spiral staircase",
      "Three wooden windows and warm afternoon light",
      "Attic bedroom in the evening",
    ],
  },

  contact: {
    title: "Let's start with a conversation.",
    lead: "Write a few sentences about your space. We will reply with what we see in it, and what a project like this would cost.",
    sample: "Sample contact details",
    rows: [
      { label: "Email", value: "labas@forma.demo" },
      { label: "Phone", value: "+370 600 00000" },
      { label: "Studio", value: "Naujamiestis, Vilnius" },
      { label: "Office hours", value: "Mon-Fri 9:00-18:00" },
    ],
  },

  form: {
    sentTitle: "Thank you, but nothing was sent.",
    sentBody:
      "This is a demo website, so your enquiry went nowhere. On a real website, this form would reach the studio's inbox within seconds, and you would get a confirmation.",
    again: "Start again",
    name: "Name",
    namePlaceholder: "What should we call you?",
    email: "Email",
    emailPlaceholder: "name@example.com",
    type: "Property",
    types: {
      butas: "Flat",
      namas: "House",
      komercine: "Commercial space",
      nezinau: "Not sure yet",
    },
    area: "Area, m²",
    areaPlaceholder: "e.g. 74",
    message: "About the space",
    messagePlaceholder:
      "When you plan to start, what isn't working in the space, what you'd like.",
    submit: "Send enquiry",
    note: "We reply within one working day. The first conversation is free.",
  },

  footer: {
    nav: "Footer links",
  },
};
