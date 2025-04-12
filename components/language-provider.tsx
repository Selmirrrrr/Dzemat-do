"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "fr" | "ba"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  // Header
  "nav.home": {
    fr: "Accueil",
    ba: "Početna",
  },
  "nav.about": {
    fr: "À propos",
    ba: "O nama",
  },
  "nav.services": {
    fr: "Services",
    ba: "Usluge",
  },
  "nav.prayer": {
    fr: "Prières",
    ba: "Namaz",
  },
  "nav.events": {
    fr: "Événements",
    ba: "Događaji",
  },
  "nav.contact": {
    fr: "Contact",
    ba: "Kontakt",
  },
  "nav.committee": {
    fr: "Comité",
    ba: "Odbor",
  },
  "nav.membership": {
    fr: "Adhésion",
    ba: "Članstvo",
  },
  "nav.login": {
    fr: "Connexion",
    ba: "Prijava",
  },

  // Hero
  "hero.title": {
    fr: "Association Bosniaque de Lausanne",
    ba: "Udruženje Bošnjaka Lozane",
  },
  "hero.subtitle": {
    fr: "Džemat Lozana",
    ba: "Džemat Lozana",
  },
  "hero.description": {
    fr: "Un lieu de prière, d'éducation et de communauté pour les musulmans bosniaques de Lausanne",
    ba: "Mjesto molitve, obrazovanja i zajednice za bosanske muslimane u Lozani",
  },
  "hero.button": {
    fr: "En savoir plus",
    ba: "Saznajte više",
  },

  // Contact
  "contact.title": {
    fr: "Contactez-nous",
    ba: "Kontaktirajte nas",
  },
  "contact.subtitle": {
    fr: "Nous sommes là pour vous aider",
    ba: "Tu smo da vam pomognemo",
  },
  "contact.address": {
    fr: "Adresse",
    ba: "Adresa",
  },
  "contact.phone": {
    fr: "Téléphone",
    ba: "Telefon",
  },
  "contact.email": {
    fr: "Email",
    ba: "Email",
  },
  "contact.form.name": {
    fr: "Nom",
    ba: "Ime",
  },
  "contact.form.email": {
    fr: "Email",
    ba: "Email",
  },
  "contact.form.message": {
    fr: "Message",
    ba: "Poruka",
  },
  "contact.form.submit": {
    fr: "Envoyer",
    ba: "Pošalji",
  },

  // Prayer Times
  "prayer.title": {
    fr: "Horaires des prières",
    ba: "Vrijeme namaza",
  },
  "prayer.subtitle": {
    fr: "Horaires pour aujourd'hui",
    ba: "Današnji raspored",
  },
  "prayer.today": {
    fr: "Aujourd'hui",
    ba: "Danas",
  },
  "prayer.last_updated": {
    fr: "Dernière mise à jour",
    ba: "Posljednje ažuriranje",
  },
  "prayer.iqama": {
    fr: "Iqama",
    ba: "Ikameta",
  },
  "prayer.source": {
    fr: "Source des données",
    ba: "Izvor podataka",
  },
  "prayer.fajr": {
    fr: "Fajr",
    ba: "Zora",
  },
  "prayer.sunrise": {
    fr: "Lever du soleil",
    ba: "Izlazak sunca",
  },
  "prayer.sunrise_info": {
    fr: "Moment où le soleil apparaît à l'horizon",
    ba: "Trenutak kada se sunce pojavljuje na horizontu",
  },
  "prayer.dhuhr": {
    fr: "Dhuhr",
    ba: "Podne",
  },
  "prayer.asr": {
    fr: "Asr",
    ba: "Ikindija",
  },
  "prayer.maghrib": {
    fr: "Maghrib",
    ba: "Akšam",
  },
  "prayer.isha": {
    fr: "Isha",
    ba: "Jacija",
  },
  "prayer.jummah": {
    fr: "Jumu'ah (Vendredi)",
    ba: "Džuma (Petak)",
  },

  // Events
  "events.title": {
    fr: "Événements à venir",
    ba: "Predstojeći događaji",
  },
  "events.subtitle": {
    fr: "Rejoignez-nous pour nos prochains événements",
    ba: "Pridružite nam se na našim predstojećim događajima",
  },
  "events.no-events": {
    fr: "Aucun événement à venir pour le moment. Revenez bientôt!",
    ba: "Trenutno nema predstojećih događaja. Navratite uskoro!",
  },
  "events.more": {
    fr: "Voir tous les événements",
    ba: "Pogledajte sve događaje",
  },
  "events.read-more": {
    fr: "Lire la suite",
    ba: "Pročitajte više",
  },
  "events.upcoming": {
    fr: "Événements à venir",
    ba: "Predstojeći događaji",
  },
  "events.past": {
    fr: "Événements passés",
    ba: "Prošli događaji",
  },
  "events.no-past-events": {
    fr: "Aucun événement passé",
    ba: "Nema prošlih događaja",
  },
  "events.pagination.prev": {
    fr: "Précédent",
    ba: "Prethodno",
  },
  "events.pagination.next": {
    fr: "Suivant",
    ba: "Sljedeće",
  },

  // Committee
  "committee.title": {
    fr: "Comité de l'Association",
    ba: "Odbor Udruženja",
  },
  "committee.subtitle": {
    fr: "Structure et membres du comité de l'Association Bosniaque de Lausanne",
    ba: "Struktura i članovi odbora Udruženja Bošnjaka Lozane",
  },
  "committee.organigram": {
    fr: "Organigramme du Comité",
    ba: "Organigram Odbora",
  },
  "committee.members": {
    fr: "Membres du Comité",
    ba: "Članovi Odbora",
  },
  "committee.biography": {
    fr: "Biographie",
    ba: "Biografija",
  },
  "committee.contact": {
    fr: "Contact",
    ba: "Kontakt",
  },
  "committee.president": {
    fr: "Président",
    ba: "Predsjednik",
  },
  "committee.vice-president": {
    fr: "Vice-Président",
    ba: "Potpredsjednik",
  },
  "committee.secretary": {
    fr: "Secrétaire",
    ba: "Sekretar",
  },
  "committee.assistant-secretary": {
    fr: "Secrétaire adjoint",
    ba: "Pomoćnik sekretara",
  },
  "committee.treasurer": {
    fr: "Caissier",
    ba: "Blagajnik",
  },
  "committee.assistant-treasurer": {
    fr: "Caissier adjoint",
    ba: "Pomoćnik blagajnika",
  },
  "committee.technical": {
    fr: "Responsable technique",
    ba: "Tehnički odgovorni",
  },
  "committee.member": {
    fr: "Membre",
    ba: "Član",
  },

  // Footer
  "footer.rights": {
    fr: "Tous droits réservés",
    ba: "Sva prava zadržana",
  },
  "footer.design": {
    fr: "Conçu avec",
    ba: "Dizajnirano s",
  },
  "footer.privacy": {
    fr: "Politique de confidentialité",
    ba: "Politika privatnosti",
  },
  "footer.terms": {
    fr: "Conditions d'utilisation",
    ba: "Uslovi korištenja",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    if (!translations[key as keyof typeof translations]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key as keyof typeof translations][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
