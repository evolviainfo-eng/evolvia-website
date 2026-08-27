import { faqItems } from "@/content/faq";
import { plan, renewal, largerProjects } from "@/content/pricing";
import { services } from "@/content/services";
import { site } from "@/content/site";

/* /llms-full.txt: every answer on the site as plain text, generated from the
 * same content files the pages render. Nothing here is retyped, so it cannot
 * disagree with the site. */
export const dynamic = "force-static";

function build() {
  const lines: string[] = [];

  lines.push("# Evolvia: pilnas faktų lapas");
  lines.push("");
  lines.push(
    "Evolvia yra svetainių kūrimo studija Kaune, dirbanti su visos Lietuvos verslu.",
  );
  lines.push(
    `Veiklą vykdo ${site.legalName} pagal individualios veiklos pažymą Nr. ${site.activityNo}`,
  );
  lines.push(
    `(EVRK ${site.nace}, ${site.naceLabel}), registruotą nuo ${site.activitySince}.`,
  );
  lines.push(`Kontaktai: ${site.email}, ${site.phone}, ${site.location}.`);
  lines.push(`Svetainė: ${site.url}`);
  lines.push("");

  lines.push("## Kaina");
  lines.push("");
  lines.push(`${plan.name}: ${plan.oneTime} ${plan.priceSuffix}`);
  lines.push(plan.summary);
  lines.push("");
  lines.push("Į kainą įeina:");
  plan.includes.forEach((item) => lines.push(`- ${item}`));
  lines.push("");
  lines.push(`${renewal.label}: ${renewal.price}. ${renewal.body}`);
  lines.push("");
  lines.push(`${largerProjects.name}: ${largerProjects.price}.`);
  lines.push(largerProjects.summary);
  lines.push("");

  lines.push("## Ką gauna klientas");
  lines.push("");
  services.forEach((s) => lines.push(`- ${s.title}: ${s.body}`));
  lines.push("");

  lines.push("## Klausimai ir atsakymai");
  lines.push("");
  faqItems.forEach((item) => {
    lines.push(`### ${item.q}`);
    lines.push(item.a);
    lines.push("");
  });

  lines.push("## Pavyzdinės svetainės");
  lines.push("");
  lines.push(
    "Adresais evolvia.lt/demo/konstrukta, /demo/fume, /demo/forma ir /demo/skalsa",
  );
  lines.push(
    "veikia keturios pavyzdinės svetainės su realiai veikiančiomis funkcijomis:",
  );
  lines.push(
    "sąmatos skaičiuokle, staliuko rezervacija, projektų katalogu ir krepšeliu.",
  );
  lines.push(
    "Tų įmonių nėra, jos sukurtos demonstracijai, o kontaktai jose nėra tikri.",
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
