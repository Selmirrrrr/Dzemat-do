"use client"

import { MDXRemote } from "next-mdx-remote/rsc"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function EventPageClient({ frontmatter, content }: { frontmatter: any; content: any }) {
  const { language } = useLanguage()

  if (!frontmatter.title) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "bs-BA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/#events" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {language === "fr" ? "Retour aux événements" : "Povratak na događaje"}
      </Link>

      <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <Image src={frontmatter.image || "/placeholder.svg"} alt={frontmatter.title} fill className="object-cover" />
      </div>

      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>
          {formatDate(frontmatter.date)} • {frontmatter.time}
        </span>
      </div>

      <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6">{frontmatter.title}</h1>

      <div className="prose prose-lg max-w-none">
        <MDXRemote source={content} />
      </div>
    </div>
  )
}
