import { site } from "@/content/site";
import { PRICES_GBP, gbp } from "@/i18n/prices";
import type { Dictionary } from "@/i18n/dictionaries/lt";

/* ─────────────────────────────────────────────────────────────
   English dictionary. Same shape as lt.ts (TypeScript enforces it).

   British spelling, the same short and plain voice as the Lithuanian.
   Every price comes from PRICES_GBP in prices.ts; do not type a £
   figure into this file.
   ───────────────────────────────────────────────────────────── */

const price = gbp(PRICES_GBP.site); // £350
const renewal = gbp(PRICES_GBP.renewalPerYear); // £45

export const en: Dictionary = {
  meta: {
    title: "Web design in Lithuania · Evolvia",
    description: `Websites for businesses at ${price}. Bespoke design, copywriting, launch and the first year of maintenance, all in one price. You see the website live before you pay.`,
    shareDescription: `Websites for businesses at ${price}. You see the website live and pay only once you like it.`,
    keywords: [
      "web design",
      "web design Lithuania",
      "web design Kaunas",
      "website design",
      "website cost",
      "business website",
      "online shop development",
      "evolvia",
    ],
    ogImageAlt: "evolvia. · web design",
  },

  shell: {
    skipLink: "Skip to content",
  },

  location: "Kaunas, Lithuania",

  nav: {
    home: "evolvia. Home",
    links: [
      { label: "Services", path: "/paslaugos" },
      { label: "Work", path: "/darbai" },
      { label: "Pricing", path: "/kainos" },
      { label: "FAQ", path: "/duk" },
    ],
    contact: "Get in touch",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    language: "Language",
    languageNames: { lt: "Lithuanian", en: "English" },
  },

  theme: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    light: "Light mode",
    dark: "Dark mode",
  },

  footer: {
    tagline: "web design",
    nav: "Footer navigation",
    pages: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/paslaugos" },
      { label: "Work", path: "/darbai" },
      { label: "Pricing", path: "/kainos" },
      { label: "FAQ", path: "/duk" },
      { label: "Contact", path: "/kontaktai" },
    ],
    privacy: "Privacy",
    registration: "Self-employed, certificate No. {no}",
  },

  crumbs: {
    home: "Home",
  },

  hero: {
    eyebrow: "web design",
    lines: ["Your competitors", "are online.", "Are you?"],
    lead: "Web design for businesses. From the first draft to launch, everything is done for you.",
    primary: "Get a free draft",
    secondary: "See the work",
    caption: "A demo site. It opens and it works.",
  },

  process: {
    eyebrow: "How we work",
    title: "A process with no surprises.",
    lead: "Photos on your phone, a price list on paper, reviews on a listings site, opening hours. The material is already there, just scattered. Our job is to collect it and put it in order, and you see the real website before you pay.",
    steps: [
      {
        title: "An enquiry by email",
        body: "You tell us what you do and what you need. A few sentences is enough. Prefer to talk it through? That works too.",
        lead: false,
      },
      {
        title: "A live draft",
        body: "Within a few days you see a real website, live, not a picture. Only then do you decide.",
        lead: true,
      },
      {
        title: "Payment and launch",
        body: "Once you approve it, we move it to your domain and launch it.",
        lead: false,
      },
      {
        title: "Maintenance",
        body: "Hosting, updates and support. Nothing for you to think about.",
        lead: false,
      },
    ],
  },

  trust: {
    eyebrow: "No risk",
    statement: "You see your site live. Only then do you pay.",
    sub: "No risk. No guesswork. We build a real draft for your business. If you don't like it, you pay nothing.",
  },

  minerda: {
    sector: "Paintless dent repair, bodywork care",
    summary:
      "An established business with no website. A site built from scratch, four articles, an FAQ page, structured data and a launch on the client's server with valid SSL.",
    situation:
      "Minerda removes dents from car bodywork without repainting, polishes paintwork and applies ceramic nano-coating. The business was up and running and had customers, but no website of its own: photos of its work and its reviews lived only on social media, and there was no address to give a customer or enter into Google.",
    work: [
      {
        title: "A website from scratch",
        detail:
          "Structure, copy, photo preparation and code. No template and no site builder.",
      },
      {
        title: "Four articles for search",
        detail:
          "Paintless dent repair, body polishing, nano-coating and headlight polishing. Each at its own address.",
      },
      {
        title: "A separate FAQ page",
        detail:
          "Questions and answers on a page of their own, not in a block at the bottom of the site.",
      },
      {
        title: "Structured data",
        detail:
          "JSON-LD, sitemap.xml and robots.txt, so search engines understand what is on each page.",
      },
      {
        title: "Enquiry form",
        detail: "A completed enquiry goes straight to the company's inbox.",
      },
      {
        title: "Launch on the client's server",
        detail:
          "The website runs on the client's own hosting with a valid SSL certificate.",
      },
      {
        title: "Google Search Console",
        detail: "The site is connected and its pages are indexed.",
      },
    ],
    result:
      "minerda.lt runs on the client's server and is found on Google. You can open the website and look around yourself.",
    title: "Minerda. A website for a dent repair studio in Kaunas.",
    homeAlt: "Minerda website home page",
    openDomain: "Open {domain}",
    viewProject: "View the full project",
  },

  caseStudy: {
    eyebrow: "Work",
  },

  work: {
    eyebrow: "Examples",
    title: "Examples you can try out.",
    all: "All examples",
  },

  demoNote: {
    strong: "These are sample projects.",
    body: "You can open the sites and click around: try the calculator, the booking or the basket. That is the quality to expect.",
  },

  demos: {
    labels: { demo: "Demo", concept: "Concept" },
    open: "Open demo",
    openSite: "Open the demo site",
    newWindow: "opens in a new window",
    frameLabel: "Open the {name} demo site in a new window",
    frameAlt: "Screenshot of the {name} demo site",
    items: {
      konstrukta: {
        sector: "Construction company",
        tagline:
          "A construction company website: solid, structured and convincing from the first screen.",
        scope: ["Brochure website", "Project gallery", "Estimate calculator"],
        feature: "Working estimate calculator",
      },
      fume: {
        sector: "Restaurant · wine bar",
        tagline:
          "A restaurant with table booking and a menu. You feel the atmosphere before you open the door.",
        scope: ["Menu", "Table booking", "Atmosphere photography"],
        feature: "Working table booking",
      },
      forma: {
        sector: "Interior design studio",
        tagline:
          "An interior studio portfolio: a project index where the work speaks for itself.",
        scope: ["Portfolio", "Project filter", "Gallery"],
        feature: "Filterable project index",
      },
      skalsa: {
        sector: "Online shop",
        tagline:
          "An online shop for handmade candles: catalogue, basket and checkout in one clean system.",
        scope: ["Product catalogue", "Basket", "Checkout flow"],
        feature: "Working basket",
      },
    },
  },

  pricing: {
    eyebrow: "Pricing",
    title: "One website. One price.",
    lead: "We agree it before any work starts, and it does not change.",
    plan: {
      name: "Website",
      price,
      priceSuffix: "one-off payment. No monthly fees.",
      summary:
        "One price for all of the work: design, development, copywriting, launch and the first year of maintenance.",
      includes: [
        "Bespoke design and development",
        "Copywriting and photo preparation",
        "Domain, launch and migration",
        "Optimisation for Google search",
        "Built for phones and tablets",
        "Hosting and SSL for the first year",
        "Updates and changes for the first year",
      ],
      cta: "Get started",
    },
    renewal: {
      label: "After the first year",
      price: `${renewal} / year`,
      body: `Hosting, SSL, updates and support then cost ${renewal} a year. If you don't want to continue, the website files are yours to keep.`,
    },
    larger: {
      name: "Online shop or larger website",
      price: "Priced by scope",
      summary:
        "Many pages, a catalogue, a basket, bookings or several languages. Tell us what you need and you will get an exact price within a day.",
      cta: "Discuss your project",
    },
    note: "The price is fixed before work starts. You see the website live first, and pay only once you like it.",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Common questions.",
    askBefore: "Can't find an answer?",
    askLink: "Write to us",
    askAfter: "and we will reply within a day.",
    srContact: "Questions: {email}",
    items: [
      {
        q: "How much does a website cost?",
        a: `A website from Evolvia costs ${price}, paid once. That price covers bespoke design, development, copywriting, photo preparation, optimisation for Google search, launch on your domain and the first year of maintenance with hosting. No monthly fees and no hidden extras. Online shops and larger multi-page sites are priced by scope.`,
      },
      {
        q: "What happens after the first year?",
        a: `After the first year, website maintenance costs ${renewal} a year. That keeps the hosting, the SSL certificate, updates and support in place, so the site keeps running and stays secure. If you decide not to continue, the website files are yours and you can move the site elsewhere.`,
      },
      {
        q: "Will I see the website before I pay?",
        a: "Yes, you see the website before you pay. First we build a live draft: a real, working website in your browser, not a picture. You pay only once you like it.",
      },
      {
        q: "How quickly will the website be ready?",
        a: "A website is usually ready within a few working days. You see the first live draft about two days after your first email, and the final launch depends only on how quickly we agree on the copy and photos.",
      },
      {
        q: "What do I need to prepare to get started?",
        a: "One email with a few sentences about your business is enough to start. We sort out the copy, photos and logo together: if you have your own, great; if not, we help you prepare them. No technical preparation is needed.",
      },
      {
        q: "Who looks after the website once it is live?",
        a: `Evolvia looks after the website once it is live. Hosting, SSL, updates, support and small changes are included in the price for the first year, and after that in the ${renewal} annual fee. You do not need to think about the technical side; just send an email saying what to change.`,
      },
      {
        q: "Will the website show up on Google?",
        a: "Yes, the website is prepared for Google from day one. On every site we set up the headings, meta descriptions, URL structure, sitemap, robots.txt and structured data, and the pages load fast, because speed is one of the things Google looks at. We cannot promise results within a week, but the groundwork is done so that people find you rather than your competitors.",
      },
      {
        q: "Are you a registered business, and will I get an invoice?",
        a: `Yes, Evolvia is a registered business. It is run by ${site.legalName} under Lithuanian self-employment certificate No. ${site.activityNo} (EVRK ${site.nace}, computer programming activities). You receive an invoice for the work, which you can include in your business expenses.`,
      },
      {
        q: "Who are Evolvia websites for?",
        a: "Evolvia builds websites for businesses: from one-person service businesses to companies that need a serious company website or an online shop. Most are in construction, interiors, car services, beauty and other services, and either have no website or have an outdated one.",
      },
    ],
  },

  contact: {
    title: "Let's begin.",
    lead: "Write to us and we will reply within a day.",
    nameLabel: "Name",
    namePlaceholder: "Name",
    emailLabel: "Email",
    emailPlaceholder: "Email",
    messageLabel: "Message",
    messagePlaceholder: "A few words about your business and what you need",
    notificationSubject: "New enquiry from evolvia.lt (English site)",
    submit: "Send enquiry",
    sending: "Sending…",
    sent: "Thank you. We have your message and will reply within a day.",
    mailtoOpening:
      "Your email app is opening. If it doesn't, write to {email} directly.",
    error: "Sending failed. Please write to {email} directly.",
    mailto: {
      subject: "Enquiry from the website: {name}",
      fallbackName: "new client",
      body: "Name: {name}\nEmail: {email}\n\n{message}",
    },
    validation: {
      nameMissing: "Please enter your name.",
      emailMissing: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageMissing: "Please write a short message.",
    },
  },

  privacy: {
    intro:
      "We use your details only to reply to this enquiry. We use no cookies and nothing tracks you.",
    introStrong: "How we handle your data is set out below.",
    summary: "Privacy information",
    controllerTerm: "Who is responsible",
    controllerLead: "Evolvia, {location}. Questions and requests:",
    rows: [
      {
        term: "What data, and why",
        body: "Your name, email address and the text of your message. Only what you type in yourself. We use it to reply to your enquiry and, if you ask for one, to prepare a quote.",
      },
      {
        term: "Legal basis",
        body: "Steps taken at your request before entering into a contract (GDPR Article 6(1)(b)).",
      },
      {
        term: "Who else sees it",
        body: "The form is run by Formspree (USA), whose system delivers the message to our inbox. The website is hosted by Vercel. We pass it to no one else and never sell it.",
      },
      {
        term: "How long we keep it",
        body: "For as long as we are corresponding, and up to 12 months after that. We delete it sooner if you ask.",
      },
      {
        term: "Your rights",
        body: "You can access, correct or delete your data, or object to its processing. Just write to us. If you are not happy with the reply, you can complain to the State Data Protection Inspectorate of Lithuania (vdai.lrv.lt).",
      },
      {
        term: "Visitor statistics",
        body: "We only see how many times pages are opened. For that we use Vercel Analytics. It stores nothing in your browser, builds no profile of you and does not follow you to other websites. We cannot see who you are.",
      },
      {
        term: "Cookies",
        body: "We use no advertising or tracking cookies. The only things we store in your browser are two choices of yours: light or dark theme, and the site language, and only when you switch them yourself. That is why there is no consent banner here: there is nothing to consent to.",
      },
    ],
  },

  ctaBand: {
    eyebrow: "Free draft",
    title: "See your website live, before you pay.",
    button: "Get a free draft",
    note: "We reply within a day. You pay only if you like it.",
  },

  copyLine: {
    copy: "Copy",
    copied: "Copied",
  },

  services: [
    {
      title: "Modern design",
      body: "Clean design that looks expensive, made for your business. Not a template.",
    },
    {
      title: "Fast and visible on Google",
      body: "Loads fast and is optimised for search. Customers find you.",
    },
    {
      title: "Built for phones",
      body: "Works on any screen, and most customers browse on a phone.",
    },
  ],

  pages: {
    services: {
      metaTitle: "Web design services",
      metaDescription:
        "Web design for businesses: bespoke design, development, copywriting, optimisation for Google search, launch and maintenance. One fixed price, one person responsible.",
      crumb: "Services",
      eyebrow: "Services",
      title: "Web design, from start to launch.",
      lead: "Evolvia is a web design studio based in Kaunas, Lithuania. From the first draft to a working website: design, development, copywriting, launch and maintenance, all in one pair of hands.",
      items: [
        {
          title: "Design that looks expensive",
          body: "We start from a blank page, with no templates. Colours, fonts and structure are chosen for your trade and your customers, so the website looks as if it cost several times more.",
        },
        {
          title: "Fast and visible on Google",
          body: "Clean code, fast loading and search optimisation from day one. The website works well on a phone, where most of your customers browse.",
        },
        {
          title: "A hassle-free launch",
          body: "Domain, launch and migration: we handle all the technical work for you. You do not need to install, configure or look after anything on launch day.",
        },
        {
          title: "Maintenance that keeps it current",
          body: `Hosting, SSL, updates and small changes are included for the first year, then cost ${renewal} a year. The website stays live and tidy, and all you need to do is send an email saying what to change.`,
        },
      ],
      fitsTitle: "Who it is for",
      fits: [
        "Businesses with no website, or an outdated one.",
        "Service companies whose customers search Google first and browse on a phone.",
        "Anyone who wants a clear, fixed price and one person responsible.",
        "Companies that want to look more serious than their competitors.",
      ],
      priceLine: `A clear price: ${price}, paid once.`,
      priceLink: "See pricing",
      or: "or",
      examplesLink: "the examples",
    },

    work: {
      metaTitle: "Work",
      metaDescription:
        "Minerda: a website for a car body studio in Kaunas, running on the client's server and found on Google. Alongside it, four sample websites you can open and try.",
      crumb: "Work",
      eyebrow: "Work",
      title: "A client website, live at its own address.",
      lead: "Minerda is a live website: a car body studio in Kaunas uses it, it runs on the client's server and it is found on Google. Below it are four examples you can open and click through.",
      clientChip: "Client work",
      examplesEyebrow: "Examples",
      examplesTitle: "Four websites you can try out.",
    },

    minerda: {
      metaTitle: "Minerda: a website for a dent repair studio in Kaunas",
      metaDescription:
        "How Minerda, a car body studio in Kaunas, got a website from scratch: four articles, an FAQ page, structured data, an enquiry form and a launch on the client's server with valid SSL.",
      crumbWork: "Work",
      breadcrumbNav: "Breadcrumb",
      title: "Minerda: a website for a dent repair studio in Kaunas.",
      facts: {
        client: "Client",
        business: "Business",
        city: "City",
        address: "Web address",
      },
      situation: "The situation",
      did: "What we did",
      didLead: "Everything that makes a working website, not just the first screen.",
      articles: "Articles and FAQ",
      articlesLead:
        "Four articles and an FAQ page answer the questions people ask before they pick up the phone. Each is a separate page with its own address, so each can be found on its own.",
      articleAlt: "Minerda article on paintless dent repair",
      articleCaption:
        "One of the four articles. The other three: body polishing, nano-coating and headlight polishing.",
      faqAlt: "Minerda FAQ page",
      faqCaption:
        "The FAQ page, with structured data so that search engines can read the questions too.",
      open: "Open",
      result: "The result",
      allWork: "All work",
    },

    pricing: {
      metaTitle: `Website price: ${price}`,
      metaDescription: `How much does a website cost? ${price}, paid once, with design, copywriting, launch and the first year of maintenance. After the first year, ${renewal} a year. No monthly fees.`,
      crumb: "Pricing",
      eyebrow: "Pricing",
      title: "A clear price. No surprises.",
      lead: `A website costs ${price}. The price covers all the work and the first year of maintenance. You see the website live first, and pay only once you like it.`,
      faqTitle: "Questions about price.",
      faqMore: "You will find more answers on the",
      faqLink: "FAQ page",
    },

    faq: {
      metaTitle: "Web design: frequently asked questions",
      metaDescription:
        "Answers about web design: what a website costs, what happens after the first year, how quickly it is ready, who looks after it and whether you will show up on Google.",
      crumb: "FAQ",
      eyebrow: "FAQ",
      title: "Common questions.",
      lead: "Everything clients usually ask before they start: price, timings, maintenance and visibility on Google.",
    },

    contact: {
      metaTitle: "Contact and website enquiries",
      metaDescription:
        "Get in touch with Evolvia about a website. Write a few sentences about your business and get a free live draft. We reply within a day.",
      crumb: "Contact",
      eyebrow: "Contact",
      title: "Let's begin.",
      lead: "Write a few lines about your business and within a day you will get a reply with the first steps and a free draft.",
      detailsTitle: "Business details",
      labels: {
        email: "Email",
        phone: "Phone",
        city: "City",
        owner: "Proprietor",
        registration: "Registration",
      },
      registrationValue: "Self-employed, No. {no} · EVRK {nace}",
      note: "We work officially, as a registered self-employed business. You receive an invoice for the work.",
    },

    notFound: {
      metaTitle: "Page not found",
      metaDescription: "This page does not exist or has moved.",
      eyebrow: "404",
      title: "This page is no longer here.",
      lead: "The link is out of date or the address is wrong. The page you are looking for does not exist.",
      home: "Back to home",
      work: "See the work",
    },
  },

  demoShell: {
    fallbackName: "This site",
    badge: "Demo",
    barShort: "Fictional company · sample website",
    barLong:
      "Demo website. {name} is a fictional company; its name, contact details, prices and projects are examples.",
    backShort: "Evolvia",
    backLong: "Back to Evolvia",
    footerEyebrow: "Demo website",
    footerTitle: "{name} does not exist. This is a sample project.",
    footerBody:
      "The company, its projects, prices and contact details are made up. Everything else works exactly as it would on your website: the design, the structure of the copy, the {feature}, the speed and the behaviour on a phone. That is what you get.",
    wantOne: "I want a site like this",
    allExamples: "All examples",
    others: "Other demo websites",
    credit: "© 2026 Evolvia · Photos: Unsplash",
  },

  schema: {
    businessDescription:
      "Evolvia builds websites for businesses. Bespoke design, development, copywriting, launch and maintenance for one fixed price.",
    jobTitle: "Web designer",
    certificate: "Lithuanian self-employment certificate",
    country: "Lithuania",
    knowsAbout: [
      "Web design",
      "Website design",
      "Online shop development",
      "Search engine optimisation",
      "Website hosting and maintenance",
    ],
    languages: ["Lithuanian", "English"],
    serviceName: "Web design",
    serviceDescription:
      "Web design for businesses: bespoke design, development, copywriting, optimisation for Google search, launch and the first year of maintenance.",
    catalogName: "Pricing",
    siteOffered: "Website build",
    renewalSuffix: "After the first year, maintenance costs {price}.",
  },
};
