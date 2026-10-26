/* Words of the enquiry: the form (on /kontaktai and in the sheet that
   opens from every "Parašyti užklausą" button) and the sheet around it.
   {name} and {email} are filled in by the form. Everything promised here
   comes from the facts: a reply within a working day, then a live draft,
   and payment only after the client has seen it. */

export const enquiry = {
  lt: {
    sheet: {
      title: "Parašyti užklausą",
      lead: "Užtenka kelių sakinių apie jūsų verslą ir tai, ko reikia.",
      close: "Uždaryti",
    },
    fields: {
      name: { label: "Vardas", autocomplete: "name" },
      email: { label: "El. paštas", autocomplete: "email" },
      phone: { label: "Telefonas", autocomplete: "tel" },
      business: { label: "Verslo pavadinimas", autocomplete: "organization" },
      website: { label: "Dabartinė svetainė", placeholder: "jusu-imone.lt", autocomplete: "url" },
      need: { label: "Ko reikia" },
      message: {
        label: "Žinutė",
        placeholder: "Kuo užsiimate, kam skirta svetainė, ką norite, kad ji darytų.",
      },
    },
    optional: "nebūtina",
    needs: [
      { value: "new", label: "Nauja svetainė" },
      { value: "redesign", label: "Svetainės atnaujinimas" },
      { value: "shop", label: "El. parduotuvė" },
      { value: "unsure", label: "Dar nežinau" },
    ],
    validation: {
      nameMissing: "Įrašykite savo vardą.",
      emailMissing: "Įrašykite el. pašto adresą, kad turėtume kur atsakyti.",
      emailInvalid: "Šis el. pašto adresas atrodo neteisingas. Patikrinkite, pvz., vardas@imone.lt.",
      phoneInvalid: "Telefono numeris atrodo neteisingas. Galite palikti tuščią.",
      businessMissing: "Įrašykite verslo pavadinimą.",
      needMissing: "Pasirinkite vieną variantą.",
      messageMissing: "Parašykite bent kelis žodžius apie tai, ko reikia.",
      messageShort: "Parašykite dar šiek tiek: bent vieną sakinį.",
      summary: "Patikrinkite pažymėtus laukus.",
    },
    submit: "Siųsti užklausą",
    sending: "Siunčiama…",
    replyNote: "Atsakome per darbo dieną.",
    privacy: "Jūsų duomenis naudojame tik atsakymui į šią užklausą.",
    privacyLink: "Kaip tvarkome duomenis",
    success: {
      title: "Užklausa išsiųsta.",
      thanks: "Ačiū, {name}. Ką toliau:",
      steps: [
        "Per darbo dieną atsakome į {email}.",
        "Paruošiame gyvą eskizą: pamatote tikrą svetainę, ne paveikslėlį.",
        "Mokate tik tada, kai ji patinka. Iki tol nieko nemokate.",
      ],
      close: "Uždaryti",
      again: "Rašyti dar vieną užklausą",
    },
    error: {
      title: "Nepavyko išsiųsti.",
      body: "Jūsų tekstas niekur nedingo. Bandykite dar kartą arba išsiųskite jį savo el. paštu:",
      mailto: "Rašyti į {email}",
      retry: "Bandyti dar kartą",
    },
    /** What lands in Evolvia's inbox. */
    notification: {
      subject: "Užklausa iš evolvia.lt: {name}",
      mailSubject: "Užklausa: {name}",
      mailBody:
        "Vardas: {name}\nEl. paštas: {email}\nTelefonas: {phone}\nVerslas: {business}\nSvetainė: {website}\nKo reikia: {need}\n\n{message}",
    },
  },
  en: {
    sheet: {
      title: "Send an enquiry",
      lead: "A few sentences about your business and what you need are enough.",
      close: "Close",
    },
    fields: {
      name: { label: "Name", autocomplete: "name" },
      email: { label: "Email", autocomplete: "email" },
      phone: { label: "Phone", autocomplete: "tel" },
      business: { label: "Business name", autocomplete: "organization" },
      website: { label: "Current website", placeholder: "yourbusiness.co.uk", autocomplete: "url" },
      need: { label: "What you need" },
      message: {
        label: "Message",
        placeholder: "What you do, who the site is for, what it should do.",
      },
    },
    optional: "optional",
    needs: [
      { value: "new", label: "A new website" },
      { value: "redesign", label: "A redesign" },
      { value: "shop", label: "An online shop" },
      { value: "unsure", label: "Not sure yet" },
    ],
    validation: {
      nameMissing: "Please enter your name.",
      emailMissing: "Please enter your email address, so we can reply.",
      emailInvalid: "This email address looks wrong. Please check it, e.g. name@business.com.",
      phoneInvalid: "This phone number looks wrong. You can leave it empty.",
      businessMissing: "Please enter your business name.",
      needMissing: "Please choose one option.",
      messageMissing: "Please write a few words about what you need.",
      messageShort: "Please write a little more: one sentence at least.",
      summary: "Please check the marked fields.",
    },
    submit: "Send enquiry",
    sending: "Sending…",
    replyNote: "We reply within one working day.",
    privacy: "We use your details only to reply to this enquiry.",
    privacyLink: "How we handle your data",
    success: {
      title: "Enquiry sent.",
      thanks: "Thank you, {name}. What happens next:",
      steps: [
        "Within one working day we reply to {email}.",
        "We prepare a live draft: you see the real website, not a picture.",
        "You pay only once you like it. Until then you pay nothing.",
      ],
      close: "Close",
      again: "Send another enquiry",
    },
    error: {
      title: "Sending failed.",
      body: "Your text is still here. Try again, or send it from your own email:",
      mailto: "Write to {email}",
      retry: "Try again",
    },
    notification: {
      subject: "Enquiry from evolvia.lt (English site): {name}",
      mailSubject: "Enquiry: {name}",
      mailBody:
        "Name: {name}\nEmail: {email}\nPhone: {phone}\nBusiness: {business}\nWebsite: {website}\nNeed: {need}\n\n{message}",
    },
  },
} as const;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

export type EnquiryCopy = Widen<(typeof enquiry)["lt"]>;
const _enCheck: EnquiryCopy = enquiry.en;
void _enCheck;

/** Fills {key} placeholders. */
export function fill(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? vars[k] : m));
}
