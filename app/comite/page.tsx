"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CommitteeOrganigram from "@/components/committee-organigram"

export default function CommitteePage() {
  const { language } = useLanguage()
  const [pageTitle, setPageTitle] = useState("")
  const [pageSubtitle, setPageSubtitle] = useState("")

  useEffect(() => {
    if (language === "fr") {
      setPageTitle("Comité de l'Association")
      setPageSubtitle("Structure et membres du comité de l'Association Bosniaque de Lausanne")
    } else {
      setPageTitle("Odbor Udruženja")
      setPageSubtitle("Struktura i članovi odbora Udruženja Bošnjaka Lozane")
    }
  }, [language])

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {language === "fr" ? "Retour à l'accueil" : "Povratak na početnu"}
      </Link>

      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">{pageTitle}</h1>
        <p className="text-xl text-muted-foreground">{pageSubtitle}</p>
      </div>

      <div className="mb-16">
        <CommitteeOrganigram />
      </div>
    </div>
  )
}
