/** D.U.K. — polished from the client's own answers and direction.
 *
 *  Every answer is written to survive being quoted on its own: it restates
 *  its subject in the first sentence, so an answer engine lifting one line
 *  out of the page still says "Evolvia" and "€400" rather than "it depends".
 *  That is also simply better for a person skimming. */

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: "Kiek kainuoja svetainės sukūrimas?",
    a: "Svetainės sukūrimas Evolvijoje kainuoja €400 vienkartinai. Į šią kainą įeina individualus dizainas, programavimas, tekstai, nuotraukų paruošimas, optimizacija Google paieškai, paleidimas jūsų domene ir pirmi metai priežiūros su hostingu. Jokių mėnesinių mokesčių ir jokių paslėptų priedų. El. parduotuvės ir didesnės kelių puslapių svetainės kainuojamos pagal apimtį.",
  },
  {
    q: "Kas nutinka po pirmų metų?",
    a: "Po pirmų metų svetainės priežiūra kainuoja €50 per metus. Už tai lieka hostingas, SSL sertifikatas, atnaujinimai ir palaikymas, kad svetainė toliau veiktų ir būtų saugi. Jei nuspręsite netęsti, svetainės failai lieka jūsų ir galite ją perkelti kitur.",
  },
  {
    q: "Ar pamatysiu svetainę prieš mokėdamas?",
    a: "Taip, svetainę pamatysite prieš sumokėdami. Pirmiausia sukuriame gyvą eskizą, tai yra reali veikianti svetainė naršyklėje, o ne paveikslėlis. Mokate tik tada, kai ji jums patinka.",
  },
  {
    q: "Kaip greitai svetainė bus paruošta?",
    a: "Svetainę paprastai paruošiame per kelias darbo dienas. Pirmą gyvą eskizą pamatote maždaug po poros dienų nuo pirmo laiško, o galutinis paleidimas priklauso tik nuo to, kaip greitai sutariame dėl tekstų ir nuotraukų.",
  },
  {
    q: "Ką man reikia paruošti, kad pradėtume?",
    a: "Pradėti užtenka vieno laiško su keliais sakiniais apie jūsų verslą. Tekstus, nuotraukas ir logotipą sutvarkome kartu: turite savų, puiku, neturite, padedame juos paruošti. Nereikia jokio techninio pasiruošimo.",
  },
  {
    q: "Kas prižiūri svetainę po paleidimo?",
    a: "Svetainę po paleidimo prižiūri Evolvia. Hostingas, SSL, atnaujinimai, palaikymas ir smulkūs pakeitimai įeina į kainą pirmus metus, o vėliau į €50 metinį mokestį. Jums nereikia galvoti apie techninius dalykus, pakanka parašyti laišką, ką pakeisti.",
  },
  {
    q: "Ar svetainė bus matoma Google?",
    a: "Taip, svetainė ruošiama matomumui Google nuo pirmos dienos. Kiekvienoje svetainėje sutvarkome antraštes, meta aprašymus, adresų struktūrą, sitemap, robots.txt ir struktūrinius duomenis, o puslapiai kraunasi greitai, nes tai vienas iš Google vertinamų dalykų. Rezultatų negarantuojame per savaitę, bet pagrindas padaromas taip, kad jūsų rastų, o ne konkurentus.",
  },
  {
    q: "Ar dirbate oficialiai ir ar gausiu sąskaitą?",
    a: "Taip, Evolvia dirba oficialiai. Veiklą vykdo Martis Kuckailis pagal individualios veiklos pažymą Nr. 1527221 (EVRK 621090, kompiuterių programavimo veikla), registruotą Lietuvoje. Už atliktą darbą išrašoma sąskaita faktūra, kurią galite įtraukti į savo verslo išlaidas.",
  },
  {
    q: "Kam tinka Evolvia svetainės?",
    a: "Evolvia kuria svetaines Lietuvos verslui: nuo vieno žmogaus paslaugų verslo iki įmonių, kurioms reikia rimtos vizitinės svetainės ar el. parduotuvės. Dažniausiai tai statybų, interjero, autopaslaugų, grožio ir paslaugų sričių įmonės, kurios neturi svetainės arba turi pasenusią. Netinkame tada, kai reikia sudėtingos vidinės sistemos ar programėlės su vartotojų paskyromis.",
  },
];
