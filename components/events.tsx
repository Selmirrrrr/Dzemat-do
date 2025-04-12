"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import MarkdownContent from "./markdown-content"

export default function Events() {
  const { language, t } = useLanguage()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      try {
        const response = await fetch(`/api/content?type=events&locale=${language}`)
        const data = await response.json()
        setEvents(data.slice(0, 3)) // Only show the 3 most recent events
      } catch (error) {
        console.error("Error loading events content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [language])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "bs-BA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <section id="events" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
          <div className="animate-pulse h-4 w-96 bg-muted rounded mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-80 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className="py-16 md:py-24 relative overflow-hidden section-alt">
      {/* Motif subtil en arrière-plan */}
      <div className="absolute inset-0 islamic-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-md mb-4 font-medium">
            {language === "fr" ? "Événements" : "Događaji"}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("events.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("events.subtitle")}</p>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-muted-foreground">{t("events.no-events")}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any, index: number) => {
              const colors = ["border-primary", "border-secondary", "border-accent-blue"]
              const borderColor = colors[index % colors.length]

              return (
                <div
                  key={event.slug}
                  className={`card-modern overflow-hidden hover-lift bg-white border-t-4 ${borderColor}`}
                >
                  <div className="relative h-48">
                    <Image
                      src={event.frontmatter.image || "/placeholder.svg"}
                      alt={event.frontmatter.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center text-sm text-white mb-2">
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
                          className="mr-2 h-4 w-4"
                        >
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                        <span>
                          {formatDate(event.frontmatter.date)} • {event.frontmatter.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-3">{event.frontmatter.title}</h3>
                    <div className="prose prose-sm line-clamp-3 mb-4">
                      <MarkdownContent content={event.content.split("\n").slice(0, 1).join("\n")} />
                    </div>
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      {t("events.read-more")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {events.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-md border-primary/20 hover-lift" asChild>
              <Link href="/events" className="inline-flex items-center">
                {t("events.more")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
