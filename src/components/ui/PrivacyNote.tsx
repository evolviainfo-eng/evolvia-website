import { site } from "@/content/site";
import { fill } from "@/i18n/fill";
import type { Dictionary } from "@/i18n/dictionaries/lt";

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
 *  does: the only things written are the light/dark choice and the language
 *  choice, each at the moment the visitor clicks the control for it, and
 *  Vercel Web Analytics is cookieless — it counts page views from the request
 *  itself and puts nothing in the browser.
 *
 *  That is the line to hold. Analytics that DID set an identifier would move
 *  this site into banner territory, and this notice would have to change with
 *  it. Keep the two in step: whatever the site actually does is what this
 *  text has to say.
 *
 *  Rendered inside the contact form, a client component, so its words arrive
 *  as props rather than from the dictionary directly.
 */
export function PrivacyNote({
  t,
  location,
  className,
}: {
  t: Dictionary["privacy"];
  location: string;
  className?: string;
}) {
  return (
    <div id="privatumas" className={className}>
      <p className="text-[0.8125rem] leading-relaxed text-text-muted">
        {t.intro}{" "}
        <span className="text-text">{t.introStrong}</span>
      </p>

      <details className="group mt-3 border-t border-border pt-3">
        <summary className="cursor-pointer list-none text-[0.8125rem] font-medium text-text marker:content-['']">
          <span className="underline decoration-border underline-offset-4 transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] group-hover:decoration-text">
            {t.summary}
          </span>
        </summary>

        <dl className="mt-4 flex flex-col gap-3 text-[0.8125rem] leading-relaxed text-text-muted">
          <div>
            <dt className="font-medium text-text">{t.controllerTerm}</dt>
            <dd>
              {fill(t.controllerLead, { location })}{" "}
              <a
                href={`mailto:${site.email}`}
                className="break-words text-text underline decoration-border underline-offset-4"
              >
                {site.email}
              </a>
              .
            </dd>
          </div>
          {t.rows.map((row) => (
            <div key={row.term}>
              <dt className="font-medium text-text">{row.term}</dt>
              <dd>{row.body}</dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  );
}
