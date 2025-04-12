const fs = require("fs")
const path = require("path")

// Define the content directory
const contentDir = path.join(process.cwd(), "content")

// Create the main content directory if it doesn't exist
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true })
}

// Create language directories
const languages = ["fr", "ba"]
languages.forEach((lang) => {
  const langDir = path.join(contentDir, lang)
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true })
  }

  // Create subdirectories for different content types
  const contentTypes = ["services", "events"]
  contentTypes.forEach((type) => {
    const typeDir = path.join(langDir, type)
    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir, { recursive: true })
    }
  })
})

// Create about.md files
const aboutContentFr = `---
title: "À propos de nous"
subtitle: "Notre mission et nos valeurs"
---

L'Association Bosniaque de Lausanne est une organisation à but non lucratif qui sert la communauté bosniaque musulmane de Lausanne et ses environs. Fondée sur les principes de l'Islam selon l'école Hanafite et les valeurs d'ouverture et de tolérance, nous nous efforçons de préserver notre identité culturelle tout en favorisant l'intégration et le dialogue interculturel.

## Notre mission

Œuvrer pour que les musulmans puissent accomplir leurs pratiques rituelles et cultuelles, assurer un lieu de culte pour les musulmans originaires de Bosnie-Herzégovine, et préserver la cohésion et la paix sociale.

## Nos valeurs

Respect, tolérance, ouverture, dialogue et préservation de notre héritage culturel et religieux.
`

const aboutContentBa = `---
title: "O nama"
subtitle: "Naša misija i vrijednosti"
---

Udruženje Bošnjaka Lozane je neprofitna organizacija koja služi bosanskoj muslimanskoj zajednici u Lozani i okolini. Osnovano na principima islama prema hanefijskoj školi i vrijednostima otvorenosti i tolerancije, trudimo se očuvati naš kulturni identitet uz poticanje integracije i međukulturnog dijaloga.

## Naša misija

Raditi na tome da muslimani mogu obavljati svoje obredne i kultne prakse, osigurati molitveni prostor za muslimane iz Bosne i Hercegovine, i raditi na očuvanju socijalne kohezije i mira.

## Naše vrijednosti

Poštovanje, tolerancija, otvorenost, dijalog i očuvanje našeg kulturnog i vjerskog naslijeđa.
`

fs.writeFileSync(path.join(contentDir, "fr", "about.md"), aboutContentFr)
fs.writeFileSync(path.join(contentDir, "ba", "about.md"), aboutContentBa)

// Create service files
const servicesFr = [
  {
    filename: "prayer.md",
    content: `---
title: "Prières quotidiennes"
icon: "BookOpen"
order: 1
---

Nous offrons un espace pour les cinq prières quotidiennes ainsi que la prière du vendredi (Jumu'ah). Notre mosquée est ouverte à tous les musulmans, quelle que soit leur origine.
`,
  },
  {
    filename: "education.md",
    content: `---
title: "Éducation religieuse"
icon: "Users"
order: 2
---

Cours de Coran, d'arabe et d'éducation islamique pour enfants et adultes. Nos cours sont dispensés par des enseignants qualifiés et expérimentés.
`,
  },
  {
    filename: "language.md",
    content: `---
title: "Cours de langue"
icon: "Languages"
order: 3
---

Cours de langue bosniaque pour préserver notre héritage culturel. Ces cours sont ouverts à tous, enfants comme adultes, qui souhaitent apprendre ou améliorer leur connaissance de la langue bosniaque.
`,
  },
  {
    filename: "community.md",
    content: `---
title: "Événements communautaires"
icon: "Calendar"
order: 4
---

Célébrations des fêtes religieuses, iftar pendant le Ramadan, et autres événements sociaux. Ces événements sont l'occasion de renforcer les liens au sein de notre communauté et de partager notre culture avec nos voisins.
`,
  },
]

const servicesBa = [
  {
    filename: "prayer.md",
    content: `---
title: "Dnevni namazi"
icon: "BookOpen"
order: 1
---

Nudimo prostor za pet dnevnih namaza kao i za džuma namaz. Naša džamija je otvorena za sve muslimane, bez obzira na njihovo porijek
`,
  },
  {
    filename: "education.md",
    content: `---
title: "Vjersko obrazovanje"
icon: "Users"
order: 2
---

Kursevi Kur'ana, arapskog i islamskog obrazovanja za djecu i odrasle. Naši kursevi su vođeni od strane kvalificiranih i iskusnih učitelja.
`,
  },
  {
    filename: "language.md",
    content: `---
title: "Jezički kursevi"
icon: "Languages"
order: 3
---

Kursevi bosanskog jezika za očuvanje našeg kulturnog naslijeđa. Ovi kursevi su otvoreni za sve, djecu i odrasle, koji žele naučiti ili poboljšati svoje znanje bosanskog jezika.
`,
  },
  {
    filename: "community.md",
    content: `---
title: "Događaji zajednice"
icon: "Calendar"
order: 4
---

Proslave vjerskih praznika, iftari tokom Ramazana, i drugi društveni događaji. Ovi događaji su prilika za jačanje veza unutar naše zajednice i dijeljenje naše kulture sa našim komšijama.
`,
  },
]

servicesFr.forEach((service) => {
  fs.writeFileSync(path.join(contentDir, "fr", "services", service.filename), service.content)
})

servicesBa.forEach((service) => {
  fs.writeFileSync(path.join(contentDir, "ba", "services", service.filename), service.content)
})

// Create event files
const eventsFr = [
  {
    filename: "iftar-communautaire.md",
    content: `---
title: "Iftar communautaire"
date: "2025-04-15"
time: "19:30"
image: "/communal-iftar.png"
---

Rejoignez-nous pour notre iftar communautaire pendant le Ramadan. C'est l'occasion de partager un repas ensemble et de renforcer les liens de notre communauté.

L'iftar aura lieu dans notre salle communautaire. Veuillez confirmer votre présence à l'avance pour nous aider à planifier le repas.

## Programme

- 19:30 - Accueil des invités
- 19:45 - Lecture du Coran
- 20:00 - Rupture du jeûne et prière du Maghrib
- 20:15 - Repas communautaire
- 21:30 - Prière de l'Isha suivie de Tarawih

Tous sont les bienvenus, membres et non-membres de l'association.
`,
  },
  {
    filename: "cours-langue.md",
    content: `---
title: "Cours de langue bosniaque"
date: "2025-04-20"
time: "10:00"
image: "/placeholder.svg?key=ibdlc"
---

Cours de langue bosniaque pour les enfants de 7 à 12 ans. Ces cours visent à préserver notre héritage culturel et à permettre aux enfants de communiquer avec leur famille en Bosnie.

## Détails

- **Date de début**: 20 avril 2025
- **Horaire**: Tous les samedis de 10h à 12h
- **Lieu**: Salle d'étude de l'Association
- **Âge**: 7-12 ans
- **Niveau**: Débutant
- **Coût**: 10 CHF par session (matériel inclus)

## Inscription

Pour inscrire votre enfant, veuillez contacter notre secrétariat par téléphone ou par email.
`,
  },
  {
    filename: "conference.md",
    content: `---
title: "Conférence sur l'Islam en Europe"
date: "2025-05-05"
time: "18:00"
image: "/diverse-conference.png"
---

Conférence sur l'intégration des musulmans en Europe. Cette conférence abordera les défis et les opportunités pour les musulmans vivant en Europe, avec un accent particulier sur la communauté bosniaque.

## Intervenants

- Prof. Ahmed Hasanović, Université de Sarajevo
- Dr. Marie Dubois, Université de Lausanne
- Imam Emir Suljagić, Association Bosniaque de Lausanne

## Programme

- 18:00 - Accueil et introduction
- 18:15 - Présentation du Prof. Hasanović
- 18:45 - Présentation du Dr. Dubois
- 19:15 - Présentation de l'Imam Suljagić
- 19:45 - Table ronde et questions du public
- 20:30 - Clôture et rafraîchissements

L'entrée est libre, mais l'inscription est recommandée en raison du nombre limité de places.
`,
  },
]

const eventsBa = [
  {
    filename: "iftar-communautaire.md",
    content: `---
title: "Zajednički iftar"
date: "2025-04-15"
time: "19:30"
image: "/communal-iftar.png"
---

Pridružite nam se na našem zajedničkom iftaru tokom Ramazana. Ovo je prilika da zajedno podijelimo obrok i ojačamo veze naše zajednice.

Iftar će se održati u našoj zajedničkoj sali. Molimo vas da potvrdite svoje prisustvo unaprijed kako biste nam pomogli u planiranju obroka.

## Program

- 19:30 - Doček gostiju
- 19:45 - Učenje Kur'ana
- 20:00 - Prekid posta i akšam namaz
- 20:15 - Zajednički obrok
- 21:30 - Jacija namaz praćen teravijom

Svi su dobrodošli, članovi i nečlanovi udruženja.
`,
  },
  {
    filename: "cours-langue.md",
    content: `---
title: "Kurs bosanskog jezika"
date: "2025-04-20"
time: "10:00"
image: "/placeholder.svg?key=ibdlc"
---

Kurs bosanskog jezika za djecu od 7 do 12 godina. Ovi kursevi imaju za cilj očuvanje našeg kulturnog naslijeđa i omogućavanje djeci da komuniciraju sa svojom porodicom u Bosni.

## Detalji

- **Datum početka**: 20. april 2025.
- **Raspored**: Svake subote od 10h do 12h
- **Mjesto**: Učionica Udruženja
- **Uzrast**: 7-12 godina
- **Nivo**: Početni
- **Cijena**: 10 CHF po sesiji (materijal uključen)

## Registracija

Da biste registrovali svoje dijete, molimo kontaktirajte naš sekretarijat telefonom ili emailom.
`,
  },
  {
    filename: "conference.md",
    content: `---
title: "Konferencija o islamu u Evropi"
date: "2025-05-05"
time: "18:00"
image: "/diverse-conference.png"
---

Konferencija o integraciji muslimana u Evropi. Ova konferencija će se baviti izazovima i mogućnostima za muslimane koji žive u Evropi, s posebnim naglaskom na bosansku zajednicu.

## Govornici

- Prof. Ahmed Hasanović, Univerzitet u Sarajevu
- Dr. Marie Dubois, Univerzitet u Lozani
- Imam Emir Suljagić, Udruženje Bošnjaka Lozane

## Program

- 18:00 - Doček i uvod
- 18:15 - Prezentacija prof. Hasanovića
- 18:45 - Prezentacija dr. Dubois
- 19:15 - Prezentacija imama Suljagića
- 19:45 - Okrugli sto i pitanja publike
- 20:30 - Zatvaranje i osvježenje

Ulaz je slobodan, ali je registracija preporučena zbog ograničenog broja mjesta.
`,
  },
]

eventsFr.forEach((event) => {
  fs.writeFileSync(path.join(contentDir, "fr", "events", event.filename), event.content)
})

eventsBa.forEach((event) => {
  fs.writeFileSync(path.join(contentDir, "ba", "events", event.filename), event.content)
})

console.log("Content directories and files created successfully!")
