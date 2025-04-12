"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import MarkdownContent from "@/components/markdown-content"

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      try {
        const response = await fetch(`/api/content?slug=events/${params.slug}&locale=${language}`)
        const data = await response.json()

        if (!data.frontmatter.title) {
          router.push("/404")
          return
        }

        setEvent(data)
      } catch (error) {
        console.error("Error loading event content:", error)
        router.push("/404")
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      loadContent()
    }
  }, [params.slug, language, router])

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
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse h-4 w-40 bg-muted rounded mb-6"></div>
        <div className="animate-pulse h-[300px] bg-muted rounded mb-8"></div>
        <div className="animate-pulse h-4 w-60 bg-muted rounded mb-4"></div>
        <div className="animate-pulse h-8 w-96 bg-muted rounded mb-6"></div>
        <div className="space-y-4">
          <div className="animate-pulse h-4 bg-muted rounded"></div>
          <div className="animate-pulse h-4 bg-muted rounded"></div>
          <div className="animate-pulse h-4 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!event) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/#events" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {language === "fr" ? "Retour aux événements" : "Povratak na događaje"}
      </Link>

      <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <Image
          src={event.frontmatter.image || "/placeholder.svg"}
          alt={event.frontmatter.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>
          {formatDate(event.frontmatter.date)} • {event.frontmatter.time}
        </span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 tracking-tight">{event.frontmatter.title}</h1>

      <div className="prose prose-lg max-w-none">
        <MarkdownContent content={event.content} />
      </div>
    </div>
  )
}
