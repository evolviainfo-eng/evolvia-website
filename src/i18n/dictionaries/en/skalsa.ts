import type { SkalsaCopy } from "@/i18n/dictionaries/lt/skalsa";

/* ─────────────────────────────────────────────────────────────
   Skalsa demo, English. Same shape as lt/skalsa.ts (TypeScript enforces
   it). British spelling and shop words (basket, checkout, delivery), the
   same short and warm voice, no em dashes.

   The shop is in Lithuania, so prices stay in euros with the same
   figures as the Lithuanian page; only the format changes (€40, €3.50).
   ───────────────────────────────────────────────────────────── */

/** 1 → "1 item", 3 → "3 items". */
const items = (count: number) => (count === 1 ? "1 item" : `${count} items`);

export const skalsaEn: SkalsaCopy = {
  meta: {
    title: "Skalsa: handmade candle shop",
    description:
      "A demo online shop: hand-poured soy wax candles, a working basket and checkout. A fictional company, a real website.",
  },

  units: {
    hours: (hours) => `${hours} h`,
    specs: (hours, grams) => `${hours}\u00a0h · ${grams}\u00a0g`,
  },

  header: {
    navLabel: "Main",
    links: {
      katalogas: "Catalogue",
      rinkiniai: "Gift sets",
      dirbtuve: "Workshop",
      pristatymas: "Delivery",
    },
    freeDelivery: "Free delivery from €40",
    basket: "Basket",
    openBasket: (count) =>
      count > 0 ? `Open basket, ${items(count)}` : "Open basket, empty",
  },

  hero: {
    line: "Evenings that smell of *home*.",
    eyebrow: "Handmade candles · poured in Vilnius",
    title: ["Evenings that", "smell of home."],
    lead: "Soy wax, a cotton wick and recycled glass. We pour in small batches, so each candle burns slowly and evenly, with no harsh smoke.",
    shop: "Shop now",
    how: "How we pour",
    facts: ["Soy wax", "45-hour burn", "Poured in Vilnius"],
    imageAlt: "Three lit soy wax candles on a wooden table",
    stillAlt: "Two candles in macramé holders on a wooden table by a white wall",
  },

  intro: {
    close: "This is *Skalsa*.",
  },

  discover: "Discover",

  catalog: {
    eyebrow: "Catalogue",
    title: "Six scents. One *wax*.",
    lead: "We blend each scent to draw the evening out, not to take over the room. Every candle is poured into recyclable glass, so you can wash the jar and use it again.",
    prev: "Prev",
    next: "Next",
  },

  products: {
    "p-1": {
      name: "Amber and cedar",
      scent: "Resinous, warm, with a hint of smoke",
      alt: "Amber-coloured jar candle in low light",
    },
    "p-2": {
      name: "Meadow hay",
      scent: "Dry grass, chamomile, the end of summer",
      alt: "Labelled candle on linen cloth",
    },
    "p-3": {
      name: "Lavender and vanilla",
      scent: "Soft, soothing, never soapy",
      alt: "Lavender candle with dried flowers",
    },
    "p-4": {
      name: "Resin and smoke",
      scent: "Pine forest after rain, a distant bonfire",
      alt: "Two jars in macramé hangers",
    },
    "p-5": {
      name: "Morning coffee",
      scent: "Freshly ground, with a milky sweetness",
      alt: "Small candle on a wooden tray",
    },
    "p-6": {
      name: "Fig and blackcurrant",
      scent: "Green, juicy, slightly tart",
      alt: "Two candles beside a ceramic bowl",
    },
  },

  addToBasket: {
    label: "Add to basket",
    added: "Added",
    addLabel: (name) => `Add ‘${name}’ to basket`,
    addedLabel: (name) => `${name}, added to basket`,
  },

  bundles: {
    eyebrow: "Gift sets",
    title: "When you need a gift, not just a product.",
    blockLine: "Two ready sets: one for evenings at home, one to give, packed in the workshop.",
    imageAlt: "Candles, matches and a linen bag, seen from above",
    items: {
      "b-1": {
        name: "Evening trio",
        lead: "Three scents for one week, from a warm start to a calm finish.",
        contains: ["Amber and cedar", "Meadow hay", "Lavender and vanilla"],
        note: "€68.00 separately",
        meta: "Set · 3 candles",
        alt: "A selection of candles, seen from above",
      },
      "b-2": {
        name: "Gift box",
        lead: "Packed so that there is nothing left to do but hand it over.",
        contains: [
          "Resin and smoke",
          "Morning coffee",
          "Long matches in a wooden box",
          "Linen bag and a handwritten card",
        ],
        meta: "Set · 2 candles and extras",
        alt: "A selection of candles, seen from above",
      },
    },
  },

  studio: {
    eyebrow: "Workshop",
    title: "Three steps, no rushed batches.",
    lead: "We pour about forty candles at a time: as many as fit on the table, and as many as we can check by hand.",
    steps: [
      {
        title: "Melting",
        body: "Pure soy wax is melted to 65\u00a0°C. No paraffin and no dyes, so the wax stays the colour of milk rather than bleached white.",
        alt: "Melted wax being poured into a glass jar in the workshop",
      },
      {
        title: "Mixing by hand",
        body: "We stir in the fragrance oil once the wax cools to 52\u00a0°C. Two minutes by hand is enough, and the scent does not burn off on the first evening.",
        alt: "Two pairs of hands making candles in the workshop",
      },
      {
        title: "Curing",
        body: "Once set, a candle rests for ten days, then is labelled and its wick trimmed to 5\u00a0mm. The first time, burn it for two hours so the wax melts to the edges.",
        alt: "A match lighting a candle's cotton wick",
      },
    ],
  },

  mood: {
    eyebrow: "Evening",
    quote: "One candle for the evening. Not decor, but a sign the day is over.",
    rowAlt: "A row of candles reflected in a smooth surface",
    groupAlt: "A group of candles in a dark room",
  },

  shipping: {
    eyebrow: "Delivery and returns",
    title: "Four things worth knowing.",
    facts: [
      {
        title: "Dispatched in 1-2 working days",
        body: "Orders are packed in the morning. Our courier delivers anywhere in Lithuania within 2-4 working days.",
      },
      {
        title: "Free delivery from €40",
        body: "Delivery on smaller orders costs €3.50. Collection from the workshop is free.",
      },
      {
        title: "14-day returns",
        body: "We take back any unlit candle, no questions asked. We cover the cost of the return.",
      },
      {
        title: "Packed as a gift",
        body: "Recycled cardboard, wood shavings and a handwritten card. No plastic.",
      },
    ],
  },

  progressLabel: (from) => `Progress towards free delivery at €${from}`,

  meter: {
    eyebrow: "Your basket",
    empty: (from) => `Free delivery starts at €${from}.`,
    covered: "Delivery is on us.",
    missing: (amount) => `You're ${amount} away from free delivery.`,
    open: "Open basket",
    view: "View basket",
    nothing: "Nothing in your basket yet.",
    summary: (count, subtotal) => `${items(count)} in your basket · ${subtotal}`,
  },

  basket: {
    steps: {
      cart: "Basket",
      checkout: "Details",
      done: "Confirmation",
    },
    dialog: {
      cart: "Basket",
      order: "Order",
    },
    heading: {
      cart: (count) => (count > 0 ? `Basket (${count})` : "Basket"),
      checkout: "Order summary",
      done: "Order not placed",
    },
    close: "Close basket",

    empty: {
      title: "Your basket is empty for now.",
      body: (from) =>
        `Every candle is poured by hand, so our batches are small. Free delivery from €${from}.`,
      browse: "Browse catalogue",
      suggest: "A good place to start",
    },

    remove: (name) => `Remove ‘${name}’ from basket`,
    decrease: (name) => `Decrease quantity of ‘${name}’`,
    increase: (name) => `Increase quantity of ‘${name}’`,

    freeNow: "Delivery is free.",
    freeFrom: (from, missing) =>
      `Free delivery from €${from}: ${missing} to go.`,
    subtotal: "Subtotal",
    delivery: "Delivery",
    deliveryFree: "Free",
    total: "Total",
    toCheckout: "Go to checkout",

    fields: {
      name: "Full name",
      email: "Email",
      address: "City and delivery address",
    },
    validation: {
      name: "Please enter your full name.",
      email: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      address: "Please enter your city and delivery address.",
    },
    demoNote:
      "This is a demo shop. Pressing ‘Place order’ places no order, takes no payment and sends nothing: no goods are shipped and your details go nowhere.",
    includesDelivery: (delivery) => `Including delivery: ${delivery}`,
    includesFree: "free",
    placeOrder: "Place order",
    back: "Back to basket",

    done: {
      title: "A confirmation would go here.",
      body: "This is where the demo ends: no order was placed, no payment was taken and no details were sent. In a real shop, the customer would now get an order number and an email, and you would be notified of the new order.",
      items: "Items",
      count: (count) => `${count}`,
      total: "Total",
    },
    keepShopping: "Continue shopping",
  },

  footer: {
    blurb:
      "A small workshop where soy wax candles are poured by hand in small batches. We deliver all over Lithuania.",
    navLabel: "Footer",
    shop: "Shop",
    links: {
      katalogas: "Catalogue",
      rinkiniai: "Gift sets",
      dirbtuve: "Workshop",
      pristatymas: "Delivery and returns",
    },
    contacts: "Sample contact details",
    workshop: "Workshop in Vilnius",
    hours: "Mon-Fri 10:00-17:00",
    legal: "© 2026 Skalsa · Soy wax, cotton wick, recyclable glass",
    toTop: "Back to top",
  },
};
