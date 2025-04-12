"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import MarkdownContent from "@/components/markdown-content"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function EventsPage() {
  const { language, t } = useLanguage()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      try {
        const response = await fetch(`/api/content?type=events&locale=${language}`)
        const data = await response.json()
        setEvents(data)
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

  // Filter upcoming and past events
  const today = new Date()
  const upcomingEvents = events.filter((event) => new Date(event.frontmatter.date) >= today)
  const pastEvents = events.filter((event) => new Date(event.frontmatter.date) < today)

  // Pagination for past events
  const totalPages = Math.ceil(pastEvents.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentPastEvents = pastEvents.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse h-4 w-40 bg-muted rounded mb-6"></div>
        <div className="text-center mb-12">
          <div className="animate-pulse h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
          <div className="animate-pulse h-4 w-96 bg-muted rounded mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse h-80 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/#events" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {language === "fr" ? "Retour à l'accueil" : "Povratak na početnu"}
      </Link>

      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("events.title")}</h1>
        <p className="text-xl text-muted-foreground">{t("events.subtitle")}</p>
      </div>

      {/* Upcoming Events */}
      <h2 className="font-heading text-2xl font-bold mb-6 tracking-tight">
        {language === "fr" ? "Événements à venir" : "Predstojeći događaji"}
      </h2>

      {upcomingEvents.length === 0 ? (
        <p className="text-center text-muted-foreground mb-12">{t("events.no-events")}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingEvents.map((event) => (
            <EventCard key={event.slug} event={event} formatDate={formatDate} language={language} t={t} />
          ))}
        </div>
      )}

      {/* Past Events */}
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="past-events">
          <AccordionTrigger className="font-heading text-2xl font-bold tracking-tight">
            {language === "fr" ? "Événements passés" : "Prošli događaji"}
          </AccordionTrigger>
          <AccordionContent>
            {pastEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                {language === "fr" ? "Aucun événement passé" : "Nema prošlih događaja"}
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {currentPastEvents.map((event) => (
                    <EventCard key={event.slug} event={event} formatDate={formatDate} language={language} t={t} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <Button
                          key={number}
                          variant={currentPage === number ? "default" : "outline"}
                          size="sm"
                          onClick={() => paginate(number)}
                          className="w-8 h-8"
                        >
                          {number}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

// Event Card Component
function EventCard({
  event,
  formatDate,
  language,
  t,
}: { event: any; formatDate: Function; language: string; t: Function }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={event.frontmatter.image || "/placeholder.svg"}
          alt={event.frontmatter.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>
            {formatDate(event.frontmatter.date)} • {event.frontmatter.time}
          </span>
        </div>
        <CardTitle className="font-heading">{event.frontmatter.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm line-clamp-3">
          <MarkdownContent content={event.content.split("\n").slice(0, 1).join("\n")} />
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/events/${event.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            {t("events.read-more")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
