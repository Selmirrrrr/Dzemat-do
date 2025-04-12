"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hero() {
  const { t } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mettre à jour l'heure toutes les minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Formater l'heure
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40">
      {/* Fond avec motif subtil */}
      <div className="absolute inset-0 islamic-pattern opacity-30"></div>

      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Contenu texte */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-md mb-6 font-medium">
              {t("hero.welcome")}
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-primary">Džemat</span> <span className="text-secondary">Lozana</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-700">{t("hero.subtitle")}</h2>

            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-xl mx-auto lg:mx-0">{t("hero.description")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-md shadow-sm hover-lift btn-shine bg-primary">
                <Link href="#about" className="flex items-center">
                  {t("hero.button")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="rounded-md border-primary/20 hover-lift">
                <Link href="#prayer" className="flex items-center">
                  {t("nav.prayer")}
                  <Calendar className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Partie visuelle */}
          <div className="lg:col-span-7 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl border border-primary/10">
              {/* Image principale */}
              <div className="aspect-[16/9] relative">
                <Image
                  src="/20220413_203051.jpg"
                  alt="Intérieur de la mosquée"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Overlay avec motif islamique */}
              <div className="absolute inset-0 islamic-pattern-2 opacity-20 mix-blend-overlay"></div>

              {/* Bandeau d'information */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/0 p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Association Bosniaque de Lausanne</h3>
                    <p className="text-white/80">Un lieu de prière, d'éducation et de communauté</p>
                  </div>
                  <div className="mt-4 md:mt-0 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-md">
                    <div className="text-sm text-white/80">Heure actuelle</div>
                    <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>

            {/* Cartes d'information */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 shadow-md border-t-4 border-primary flex flex-col items-center hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium text-center">{t("nav.prayer")}</span>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border-t-4 border-secondary flex flex-col items-center hover-lift">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
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
                    className="h-6 w-6 text-secondary"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                </div>
                <span className="text-sm font-medium text-center">{t("nav.events")}</span>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border-t-4 border-accent-blue flex flex-col items-center hover-lift">
                <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mb-3">
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
                    className="h-6 w-6 text-accent-blue"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium text-center">{t("nav.community")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full text-white fill-current"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}
