"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import MarkdownContent from "./markdown-content"

// Map of icon names to components
const iconMap = {
  BookOpen: (
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
  Users: (
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
  ),
  Languages: (
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
      <path d="m5 8 6 6"></path>
      <path d="m4 14 6-6 2-3"></path>
      <path d="M2 5h12"></path>
      <path d="M7 2h1"></path>
      <path d="m22 22-5-10-5 10"></path>
      <path d="M14 18h6"></path>
    </svg>
  ),
  Calendar: (
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
      <line x1="16" x2="16" y1="2" y2="6"></line>
      <line x1="8" x2="8" y1="2" y2="6"></line>
      <line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
  ),
}

// Map of icon names to colors
const colorMap = {
  BookOpen: "border-primary",
  Users: "border-secondary",
  Languages: "border-accent-blue",
  Calendar: "border-accent-green",
}

export default function Services() {
  const { language } = useLanguage()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      try {
        const response = await fetch(`/api/content?type=services&locale=${language}`)
        const data = await response.json()
        setServices(data.sort((a: any, b: any) => (a.frontmatter.order || 99) - (b.frontmatter.order || 99)))
      } catch (error) {
        console.error("Error loading services content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [language])

  if (loading) {
    return (
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
          <div className="animate-pulse h-4 w-96 bg-muted rounded mx-auto mb-12"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Motif subtil en arrière-plan */}
      <div className="absolute inset-0 islamic-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-md mb-4 font-medium">
            {language === "fr" ? "Nos services" : "Naše usluge"}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {language === "fr" ? "Ce que nous offrons" : "Šta nudimo"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "fr"
              ? "Découvrez les services que nous proposons à notre communauté"
              : "Otkrijte usluge koje nudimo našoj zajednici"}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service: any, index: number) => {
            const IconComponent = iconMap[service.frontmatter.icon as keyof typeof iconMap] || iconMap.BookOpen
            const borderColor = colorMap[service.frontmatter.icon as keyof typeof colorMap] || "border-primary"
            const colors = [
              "bg-primary/10 text-primary",
              "bg-secondary/10 text-secondary",
              "bg-accent-blue/10 text-accent-blue",
              "bg-accent-green/10 text-accent-green",
            ]
            const colorClass = colors[index % colors.length]

            return (
              <div key={service.slug} className={`card-modern p-6 hover-lift bg-white border-t-4 ${borderColor}`}>
                <div className="flex justify-center mb-6">
                  <div className={`p-3 rounded-md ${colorClass}`}>{IconComponent}</div>
                </div>
                <h3 className="font-heading text-xl font-bold mb-4 text-center">{service.frontmatter.title}</h3>
                <div className="prose prose-sm max-w-none">
                  <MarkdownContent content={service.content} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
