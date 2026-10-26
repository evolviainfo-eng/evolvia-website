/* Home, closing call to action. The button label is the shared enquiry
   label (copy/chrome.ts); contacts come from src/content/site.ts. */

type CtaCopy = { lineA: string; lineB: string; city: string; callLabel: string };

const lt: CtaCopy = {
  lineA: "Tavo konkurentai jau matomi.",
  lineB: "O tu?",
  city: "Kaunas",
  callLabel: "Skambinti",
};

const en: CtaCopy = {
  lineA: "Your competitors are already visible.",
  lineB: "Are you?",
  city: "Kaunas, Lithuania",
  callLabel: "Call",
};

export const cta = { lt, en };
