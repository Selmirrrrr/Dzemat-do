"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import MarkdownContent from "./markdown-content"

export default function About() {
  const { language } = useLanguage()
  const [aboutData, setAboutData] = useState({
    frontmatter: { title: "", subtitle: "" },
    content: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      try {
        const response = await fetch(`/api/content?slug=about&locale=${language}`)
        const data = await response.json()
        setAboutData(data)
      } catch (error) {
        console.error("Error loading about content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [language])

  if (loading) {
    return (
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
          <div className="animate-pulse h-4 w-96 bg-muted rounded mx-auto mb-12"></div>
          <div className="grid gap-8">
            <div className="space-y-4">
              <div className="animate-pulse h-4 bg-muted rounded"></div>
              <div className="animate-pulse h-4 bg-muted rounded"></div>
              <div className="animate-pulse h-4 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Extraire les sections du contenu markdown
  const contentSections = aboutData.content.split("##").filter(Boolean)
  const mainContent = contentSections.shift() || ""

  // Créer des objets pour les sections avec des icônes
  const sections = [
    {
      title: language === "fr" ? "Notre mission" : "Naša misija",
      content:
        contentSections
          .find((s) => s.includes(language === "fr" ? "Notre mission" : "Naša misija"))
          ?.replace(language === "fr" ? "Notre mission" : "Naša misija", "")
          .trim() || "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
        </svg>
      ),
      color: "bg-primary text-white",
      iconBg: "bg-white/20",
    },
    {
      title: language === "fr" ? "Nos valeurs" : "Naše vrijednosti",
      content:
        contentSections
          .find((s) => s.includes(language === "fr" ? "Nos valeurs" : "Naše vrijednosti"))
          ?.replace(language === "fr" ? "Nos valeurs" : "Naše vrijednosti", "")
          .trim() || "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      ),
      color: "bg-secondary text-white",
      iconBg: "bg-white/20",
    },
  ]

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden section-alt">
      {/* Motif subtil en arrière-plan */}
      <div className="absolute inset-0 islamic-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-md mb-4 font-medium">
            {language === "fr" ? "À propos de nous" : "O nama"}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {aboutData.frontmatter.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{aboutData.frontmatter.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="card-modern p-8 mb-12 bg-white">
            <div className="prose prose-lg max-w-none">
              <MarkdownContent content={mainContent} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className={`rounded-lg overflow-hidden shadow-md ${section.color}`}>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`mr-4 p-3 rounded-md ${section.iconBg}`}>{section.icon}</div>
                    <h3 className="font-heading text-xl font-bold">{section.title}</h3>
                  </div>
                  <div className="prose prose-sm max-w-none prose-invert">
                    <MarkdownContent content={section.content} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-modern p-6 flex flex-col items-center hover-lift bg-white border-t-4 border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{language === "fr" ? "Communauté" : "Zajednica"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "fr"
                  ? "Rejoignez une communauté vivante et solidaire"
                  : "Pridružite se živoj i solidarnoj zajednici"}
              </p>
            </div>

            <div className="card-modern p-6 flex flex-col items-center hover-lift bg-white border-t-4 border-secondary">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{language === "fr" ? "Éducation" : "Obrazovanje"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "fr"
                  ? "Accès à des cours de religion et de culture"
                  : "Pristup kursevima religije i kulture"}
              </p>
            </div>

            <div className="card-modern p-6 flex flex-col items-center hover-lift bg-white border-t-4 border-accent-blue">
              <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mb-4 text-accent-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{language === "fr" ? "Tradition" : "Tradicija"}</h3>
              <p className="text-muted-foreground text-sm">
                {language === "fr" ? "Préservation de notre héritage culturel" : "Očuvanje našeg kulturnog naslijeđa"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
