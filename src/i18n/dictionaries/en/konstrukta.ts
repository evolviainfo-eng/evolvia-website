import type { KonstruktaCopy } from "@/i18n/dictionaries/lt/konstrukta";

/* ─────────────────────────────────────────────────────────────
   Konstrukta demo, English. Same shape as lt/konstrukta.ts (TypeScript
   enforces it). British spelling, the same short and plain voice, no em
   dashes.

   Place and street names keep their Lithuanian spelling. Prices stay in
   euros with the same figures as the Lithuanian page; only the format
   changes (symbol first, comma grouping).
   ───────────────────────────────────────────────────────────── */

export const konstruktaEn: KonstruktaCopy = {
  meta: {
    title: "Konstrukta: construction company in Kaunas",
    description:
      "Demo website: a general contractor with a working estimate calculator. The company is fictional, the website is real.",
  },

  objectTypes: {
    namas: "House",
    butas: "Flat",
    komercija: "Commercial premises",
    kita: "Other",
  },

  nav: {
    label: "Main navigation",
    links: {
      paslaugos: "Services",
      objektai: "Projects",
      eiga: "Process",
      samata: "Estimate",
      kontaktai: "Contact",
    },
    ctaShort: "Estimate",
    ctaLong: "Get an estimate",
  },

  hero: {
    alt: "A building site in the evening: the lit frame of a building going up, and a crane",
    eyebrow: "General contractor · Kaunas",
    title: ["We build", "what lasts."],
    lead: "Timber-frame and masonry construction, renovation, interior finishing. One contractor, one schedule, from excavation to the completion certificate.",
    primary: "Get an estimate",
    secondary: "See our projects",
    facts: ["Since 2009", "Kaunas County", "40 projects", "Team of 12"],
  },

  company: {
    label: "Company",
    title: "One team, one point of responsibility.",
    lead: "Konstrukta has been building in Kaunas since 2009. We take on each project as the general contractor: we draw up the schedule, hire the subcontractors and answer for it ourselves if anything goes off track. The client has one number to call and one person who knows the whole project.",
    facts: [
      ["Founded", "2009"],
      ["Legal form", "Limited company (UAB)"],
      ["Activity", "General contracting"],
      ["Service area", "Kaunas · 60 km radius"],
      ["Team", "12 permanent staff"],
      ["Projects since 2009", "40"],
      ["Structural warranty", "5 years"],
      ["Site visit", "Free"],
    ],
    alt: "White concrete forms: the surface texture of a structure",
    caption:
      "Unfinished in-situ concrete · we leave the surface exposed only when the formwork deserves it",
  },

  services: {
    label: "What we build",
    title: "Four areas, not a ‘we can do that too’ among them.",
    lead: "We only take on work that our own crew or a tried and tested subcontractor can do. A shorter list means fewer surprises in the schedule.",
    alt: "A timber house frame with scaffolding on a building site",
    caption: "Frame · Ringaudai · 11 working days to a weathertight shell",
    items: [
      {
        no: "01",
        title: "Timber-frame construction",
        body: "The timber frame is cut to the factory drawing and assembled on site. A weathertight shell 3–5 weeks after the foundations.",
        specs: ["C24 timber", "600 mm centres", "U ≤ 0.13 W/m²K"],
      },
      {
        no: "02",
        title: "Masonry construction",
        body: "Expanded clay block and clay brick walls with in-situ concrete floor slabs. Heavier and slower, but built to last a century.",
        specs: ["Expanded clay block", "In-situ slab", "A++ rated"],
      },
      {
        no: "03",
        title: "Renovation and façades",
        body: "Insulating older houses, rendered and ventilated façade systems, roof replacement. We start with a thermal image, not a catalogue.",
        specs: ["Render system", "Ventilated façade", "Thermal imaging survey"],
      },
      {
        no: "04",
        title: "Interior finishing",
        body: "Electrics, plumbing, ventilation, plastering, flooring, painting. The same team that built the walls, so there is no one else to blame.",
        specs: ["Building services", "Finishing works", "Project handover"],
      },
    ],
  },

  projects: {
    label: "Projects",
    title: "Four projects out of forty.",
    lead: "Each entry shows what actually matters: area, year, duration and the one technical factor that shaped the solution.",
    items: {
      ringaudai: {
        title: "Detached house, Ringaudai",
        body: "A timber-frame house with a half-sunken terrace. The plot has a 2.4 m fall, so the foundations were stepped and no soil had to be taken off site.",
        alt: "A finished modern detached house with a dark façade",
        specs: [
          ["Area", "186 m²"],
          ["Year", "2024"],
          ["Type", "Turnkey timber-frame build"],
          ["Duration", "7 months"],
          ["Status", "Completed"],
        ],
      },
      domeikava: {
        title: "House with panoramic windows, Domeikava",
        body: "A masonry house with a south wall that is almost entirely glass. The floor slab is cast in situ, as nothing else would have carried the 4.8 m span over the living room.",
        alt: "A house with large windows and a well-kept lawn in front",
        specs: [
          ["Area", "214 m²"],
          ["Year", "2023"],
          ["Type", "Masonry build"],
          ["Duration", "11 months"],
          ["Status", "Completed"],
        ],
      },
      aleksotas: {
        title: "Office building, Kaunas, Aleksotas",
        body: "A three-storey commercial building for small businesses. The façade is exposed concrete, so the formwork was bought new rather than hired.",
        alt: "A concrete public building with rhythmic rows of windows",
        specs: [
          ["Area", "640 m²"],
          ["Year", "2025"],
          ["Type", "Commercial build"],
          ["Duration", "14 months"],
          ["Status", "Completed"],
        ],
      },
      garliava: {
        title: "In-situ floor slabs, Garliava",
        body: "Structural work on another contractor's site. Poured in three stages, each in a single day, so there are no cold joints.",
        alt: "An in-situ concrete floor slab, photographed from below",
        specs: [
          ["Area", "1,240 m² of slabs"],
          ["Year", "2025"],
          ["Type", "Structural work"],
          ["Duration", "5 months"],
          ["Status", "In progress"],
        ],
      },
    },
  },

  phases: {
    alt: "A building site from above: reinforcement laid out before the concrete pour",
    label: "How we work",
    title: "Five stages with dates, not promises.",
    lead: "Durations are for a typical 180–220 m² project. The contract sets out the actual dates for your project, and each stage ends with a signed certificate.",
    items: [
      {
        no: "01",
        title: "Site visit and quote",
        body: "We visit the site, take measurements and ask openly about the budget. Then we come back with a quote that shows every line, not a single total at the bottom.",
        time: "1–2 weeks",
      },
      {
        no: "02",
        title: "Design and permits",
        body: "Technical design, utility approvals, the building permit. We handle the paperwork; all the client has to do is sign.",
        time: "4–8 weeks",
      },
      {
        no: "03",
        title: "Foundations and structure",
        body: "Excavation, foundations, walls, floor slabs. From this stage on there is work on site every day, and every Friday you get photos and a weekly report.",
        time: "6–12 weeks",
      },
      {
        no: "04",
        title: "Roof, façade, building services",
        body: "The shell is made weathertight, then come the electrics, plumbing and ventilation. The building is ready for finishing before the frosts arrive. That is what the schedule is for.",
        time: "8–14 weeks",
      },
      {
        no: "05",
        title: "Finishing and handover",
        body: "Interior finishing, tidied grounds, the completion certificate, the keys and a folder with the declarations for every material used.",
        time: "6–10 weeks",
      },
    ],
  },

  estimator: {
    label: "Estimate calculator",
    title: "Check the ballpark before you call.",
    lead: "Enter the area and tick the work packages: the range updates straight away. These are the same rates we start from when we price a real quote.",
    typeLegend: "Property type",
    areaLabel: "Area, m²",
    areaSlider: "Floor area in square metres",
    worksLegend: "Scope of works",
    works: {
      pamatai: {
        label: "Foundations",
        note: "Excavation, foundation, waterproofing",
      },
      karkasas: {
        label: "Frame and walls",
        note: "Structure, floor slabs",
      },
      stogas: {
        label: "Roof",
        note: "Trusses, roof covering, guttering",
      },
      fasadas: {
        label: "Façade",
        note: "Insulation, cladding, windows",
      },
      apdaila: {
        label: "Interior finishing",
        note: "From plastering to flooring",
      },
      inzinerija: {
        label: "Building services",
        note: "Electrics, plumbing, ventilation",
      },
    },
    finishLevel: "Finish level",
    finishes: {
      standartine: "Standard",
      aukstesne: "Enhanced",
      premium: "Premium",
    },
    finishHint:
      "The level only changes the rates for interior finishing and building services. The structure costs the same either way.",
    resultTitle: "Preliminary estimate",
    from: "from",
    to: "to",
    emptyTotal: "€ –",
    emptyPrompt: "Tick at least one work package.",
    groups: (n) => (n === 1 ? "1 work package" : `${n} work packages`),
    breakdown: "Breakdown",
    breakdownUnit: "Your project, €/m²",
    breakdownEmpty:
      "No work package is ticked, so the estimate has no lines yet. Tick one on the left and the range appears straight away.",
    finishNone: "–",
    finishNotIncluded: "Not included",
    disclaimer:
      "Rates include VAT. The exact price comes after a site visit and a review of the technical design. The figure does not include external works, furniture or design fees.",
    cta: "Get an exact quote",
    ctaDisabledNote: "Tick a work package to continue",
    ctaNote: "Details carry over to the enquiry form",
    /** "84,200" → "€84,200"; "84,200–128,400" → "€84,200–128,400". */
    price: (amount) => `€${amount}`,
    /** "180–260" → "€180–260/m²". */
    pricePerM2: (amount) => `€${amount}/m²`,
    message: (d) =>
      [
        `Property type: ${d.type}`,
        `Area: ${d.area} m²`,
        `Scope of works: ${d.works.join(", ")}`,
        `Finish level: ${d.finish}`,
        `Preliminary estimate: ${d.total} (${d.perM2})`,
        "",
        "I would like an exact quote after a site visit.",
      ].join("\n"),
  },

  craft: {
    label: "Craft",
    title: "Quality shows where nobody is looking.",
    lead: "Four details from ordinary working days. Nothing staged for the camera, just what a tidy site looks like.",
    shots: {
      cut: {
        alt: "Cutting concrete with a diamond blade, dust rising",
        caption:
          "Openings are cut with a diamond blade. No hammering, so no cracks are left around the cut.",
      },
      worker: {
        alt: "A builder working on a timber frame structure",
        caption:
          "The frame is assembled to the factory drawing. Every joint has its own number and its own bolt.",
      },
      truss: {
        alt: "Roof trusses seen from inside",
        caption:
          "Trusses at 600 mm centres, C24 timber, treated with preservative while still in the warehouse.",
      },
      scaffold: {
        alt: "Scaffolding against a building façade at dusk",
        caption:
          "Scaffolding goes up with safety netting, and the site is tidied up at the end of every stage.",
      },
    },
  },

  contact: {
    label: "Contact",
    title: "We start with a site visit, not a contract.",
    lead: "We visit plots and buildings in Kaunas and within a 60 km radius, free of charge. After the visit you get an itemised quote and a realistic schedule.",
    tag: "Sample contact details",
    details: [
      ["Phone", "+370 600 00000"],
      ["Email", "info@konstrukta.demo"],
      ["Address", "Savanorių pr. 000, Kaunas"],
      ["Company code", "000 000 000"],
      ["VAT number", "LT000000000"],
    ],
    hoursTitle: "Working hours",
    hours: [
      ["Mon–Thu", "8:00–17:00"],
      ["Fri", "8:00–15:00"],
      ["Sat–Sun", "Closed"],
    ],
    note: "Calls are answered by the site manager, not a receptionist. If you can't get through, it means we're up on a roof. Send us a message and we'll call you back the same day.",
  },

  form: {
    title: "Site visit request",
    replyTime: "Reply within 1 working day",
    prefilled: "Details copied from the calculator",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone",
    typeLabel: "Property type",
    areaLabel: "Area, m²",
    messageLabel: "Your project",
    messagePlaceholder:
      "Plot, timeline, what you already have (plans, permit, estimate)…",
    submit: "Send enquiry",
    demoNote: "Demo form: nothing is sent anywhere.",
    sentEyebrow: "Enquiry prepared",
    sentTitle: "The form works, but nothing was sent.",
    sentBody:
      "This is a demo website, so the enquiry went nowhere and nobody will call. On a real website it would already be in your inbox, with every setting from the calculator.",
    back: "Back to the form",
  },

  footer: {
    backToTop: "Back to top",
    contacts: "Sample contact details · +370 600 00000 · info@konstrukta.demo",
  },
};
