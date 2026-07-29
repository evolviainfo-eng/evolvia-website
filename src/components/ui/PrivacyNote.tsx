import { site } from "@/content/site";

/** The GDPR Art. 13 notice, at the point of collection rather than buried on
 *  a page nobody opens.
 *
 *  A form that takes a name, an email and a message triggers a duty to tell
 *  people who is processing it, why, on what basis, who else sees it and how
 *  to get it deleted. That duty is real; a full standalone policy page is not
 *  required, and putting the disclosure directly under the fields is better
 *  compliance than linking away from them.
 *
 *  There is deliberately NO cookie banner anywhere on this site. Consent under
 *  the ePrivacy rules is needed to store or READ things on someone's device
 *  unless it is strictly necessary for something they asked for. Nothing here
 *  does: the only thing written is the light/dark choice, at the moment the
 *  visitor clicks the toggle, and Vercel Web Analytics is cookieless — it
 *  counts page views from the request itself and puts nothing in the browser.
 *
 *  That is the line to hold. Analytics that DID set an identifier would move
 *  this site into banner territory, and this notice would have to change with
 *  it. Keep the two in step: whatever the site actually does is what this
 *  text has to say.
 */
export function PrivacyNote({ className }: { className?: string }) {
  return (
    <div id="privatumas" className={className}>
      <p className="text-[0.85rem] leading-relaxed text-text-muted">
        Jūsų duomenis naudojame tik atsakymui į šią užklausą. Slapukų
        nenaudojame ir jūsų neseka.{" "}
        <span className="text-text">Kaip tvarkome duomenis — žemiau.</span>
      </p>

      <details className="group mt-3 border-t border-border pt-3">
        <summary className="cursor-pointer list-none text-[0.85rem] font-medium text-text marker:content-['']">
          <span className="underline decoration-border underline-offset-4 transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] group-hover:decoration-text">
            Privatumo informacija
          </span>
        </summary>

        <dl className="mt-4 flex flex-col gap-3 text-[0.85rem] leading-relaxed text-text-muted">
          <div>
            <dt className="font-medium text-text">Kas tvarko</dt>
            <dd>
              Evolvia, {site.location}. Klausimai ir prašymai —{" "}
              <a
                href={`mailto:${site.email}`}
                className="break-words text-text underline decoration-border underline-offset-4"
              >
                {site.email}
              </a>
              .
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">Kokie duomenys ir kam</dt>
            <dd>
              Vardas, el. pašto adresas ir jūsų žinutės tekstas — tik tai, ką
              patys įrašote. Naudojame atsakyti į užklausą ir, jei to prašote,
              paruošti pasiūlymą.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">Kokiu pagrindu</dt>
            <dd>
              Jūsų pačių prašymu atliekami veiksmai prieš sudarant sutartį
              (BDAR 6 str. 1 d. b punktas).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">Kas dar mato</dt>
            <dd>
              Formą aptarnauja „Formspree“ (JAV) — per jų sistemą žinutė
              atkeliauja į mūsų pašto dėžutę. Svetainę talpina „Vercel“.
              Daugiau niekam neperduodame ir niekada nepardavinėjame.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">Kiek saugome</dt>
            <dd>
              Kol vyksta susirašinėjimas ir iki 12 mėnesių po jo. Paprašius
              ištriname anksčiau.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">Jūsų teisės</dt>
            <dd>
              Galite susipažinti su savo duomenimis, juos ištaisyti, ištrinti
              arba nesutikti su tvarkymu — užtenka parašyti mums. Jei atsakymas
              netenkina, galite kreiptis į Valstybinę duomenų apsaugos
              inspekciją (vdai.lrv.lt).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">Lankomumo statistika</dt>
            <dd>
              Matome tik tai, kiek kartų atidaryti puslapiai — tam naudojame
              „Vercel Analytics“. Jis neįrašo nieko į jūsų naršyklę, nekuria
              jūsų profilio ir neseka jūsų kitose svetainėse. Nematome, kas
              jūs esate.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">Slapukai</dt>
            <dd>
              Nenaudojame — nei reklamos, nei stebėjimo. Į naršyklę įrašome
              vienintelį dalyką: pasirinktą šviesią ar tamsią temą, ir tik
              tada, kai patys ją perjungiate. Todėl ir sutikimo juostos čia
              nėra — nėra ko sutikti.
            </dd>
          </div>
        </dl>
      </details>
    </div>
  );
}
