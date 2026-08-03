import { BAND, CONTAINER, SectionHead, SpecRow, T_MICRO, T_SM, Tag } from "./ui";
import { ContactForm } from "./ContactForm";

const DETAILS: Array<[string, string]> = [
  ["Telefonas", "+370 600 00000"],
  ["El. paštas", "info@konstrukta.demo"],
  ["Adresas", "Savanorių pr. 000, Kaunas"],
  ["Įmonės kodas", "000 000 000"],
  ["PVM kodas", "LT000000000"],
];

const HOURS: Array<[string, string]> = [
  ["I–IV", "8:00–17:00"],
  ["V", "8:00–15:00"],
  ["VI–VII", "Nedirbame"],
];

export function Contact() {
  return (
    <section id="kontaktai" className={`${BAND} border-t border-white/[0.11]`}>
      <div className={CONTAINER}>
        <SectionHead
          index="07"
          label="Kontaktai"
          title="Pradedame nuo apžiūros, ne nuo sutarties."
          lead="Atvažiuojame į sklypą arba objektą Kaune ir 60 km spinduliu — nemokamai. Po apžiūros gaunate sąmatą su išskaidytomis eilutėmis ir realiu grafiku."
        />

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-[clamp(32px,4vw,56px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="min-w-0"
          >
            <Tag>Pavyzdiniai kontaktai</Tag>

            <dl className="mt-6 border-t border-white/[0.11]">
              {DETAILS.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>

            <p className={`${T_MICRO} mt-9 text-[#9A9791]`}>Darbo laikas</p>
            <dl className="mt-3 border-t border-white/[0.11]">
              {HOURS.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>

            <p
              className={`mt-8 max-w-[44ch] text-pretty ${T_SM} text-[#9A9791]`}
            >
              Į skambučius atsiliepia objektų vadovas, ne registratūra. Jei
              nepavyko prisiskambinti — vadinasi, esame ant stogo; parašykite ir
              perskambinsime tą pačią dieną.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
