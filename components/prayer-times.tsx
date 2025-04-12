"use client"

import { useLanguage } from "@/components/language-provider"
import { useEffect, useState } from "react"

interface PrayerTime {
  time: string
  iqama: string
  iqama_minutes: string
}

interface PrayerData {
  last_updated: string
  source: string
  Fajr: PrayerTime
  Sunrise: string
  Dhuhr: PrayerTime
  Asr: PrayerTime
  Maghrib: PrayerTime
  Isha: PrayerTime
  Jumua: string
}

export default function PrayerTimes() {
  const { t, language } = useLanguage()
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        setLoading(true)
        const response = await fetch("/api/prayers")

        if (!response.ok) {
          throw new Error("Failed to fetch prayer times")
        }

        const data = await response.json()
        setPrayerData(data)
      } catch (err) {
        console.error("Error fetching prayer times:", err)
        setError("Could not load prayer times")
      } finally {
        setLoading(false)
      }
    }

    fetchPrayerTimes()
  }, [])

  // Format the last updated date
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "bs-BA", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (loading) {
    return (
      <section id="prayer" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
            <div className="animate-pulse h-4 w-96 bg-muted rounded mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse h-64 bg-white rounded-lg"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !prayerData) {
    return (
      <section id="prayer" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("prayer.title")}</h2>
            <p className="text-xl text-muted-foreground">{t("prayer.subtitle")}</p>
          </div>

          <div className="max-w-3xl mx-auto rounded-lg bg-white p-6 shadow-sm">
            <p className="text-red-500 text-center">{error || "Failed to load prayer times"}</p>
          </div>
        </div>
      </section>
    )
  }

  // Create prayer times array for display with different colors
  const prayerTimes = [
    {
      name: t("prayer.fajr"),
      time: prayerData.Fajr.time,
      iqama: prayerData.Fajr.iqama,
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
          className="h-5 w-5"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      ),
      color: "border-primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      name: t("prayer.dhuhr"),
      time: prayerData.Dhuhr.time,
      iqama: prayerData.Dhuhr.iqama,
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
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      ),
      color: "border-secondary",
      bgColor: "bg-secondary/10",
      textColor: "text-secondary",
    },
    {
      name: t("prayer.asr"),
      time: prayerData.Asr.time,
      iqama: prayerData.Asr.iqama,
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
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      ),
      color: "border-accent-blue",
      bgColor: "bg-accent-blue/10",
      textColor: "text-accent-blue",
    },
    {
      name: t("prayer.maghrib"),
      time: prayerData.Maghrib.time,
      iqama: prayerData.Maghrib.iqama,
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
          className="h-5 w-5"
        >
          <path d="M12 10V2"></path>
          <path d="m4.93 10.93 1.41 1.41"></path>
          <path d="M2 18h2"></path>
          <path d="M20 18h2"></path>
          <path d="m19.07 10.93-1.41 1.41"></path>
          <path d="M22 22H2"></path>
          <path d="M16 6 12 2 8 6"></path>
          <path d="M16 18a4 4 0 0 0-8 0"></path>
        </svg>
      ),
      color: "border-accent-green",
      bgColor: "bg-accent-green/10",
      textColor: "text-accent-green",
    },
    {
      name: t("prayer.isha"),
      time: prayerData.Isha.time,
      iqama: prayerData.Isha.iqama,
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
          className="h-5 w-5"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      ),
      color: "border-primary",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      name: t("prayer.jummah"),
      time: prayerData.Jumua,
      iqama: null,
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
          className="h-5 w-5"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
          <line x1="16" x2="16" y1="2" y2="6"></line>
          <line x1="8" x2="8" y1="2" y2="6"></line>
          <line x1="3" x2="21" y1="10" y2="10"></line>
        </svg>
      ),
      color: "border-secondary",
      bgColor: "bg-secondary/10",
      textColor: "text-secondary",
    },
  ]

  return (
    <section
      id="prayer"
      className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden"
    >
      {/* Motif subtil en arrière-plan */}
      <div className="absolute inset-0 islamic-pattern-2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-white text-primary px-4 py-2 rounded-md mb-4 font-medium">
            {language === "fr" ? "Horaires de prière" : "Vrijeme namaza"}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("prayer.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("prayer.subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Information sur le lever du soleil */}
          <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-lg p-6 mb-8 shadow-md text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-md p-3 mr-4">
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
                  >
                    <path d="M12 10V2"></path>
                    <path d="m4.93 10.93 1.41 1.41"></path>
                    <path d="M2 18h2"></path>
                    <path d="M20 18h2"></path>
                    <path d="m19.07 10.93-1.41 1.41"></path>
                    <path d="M22 22H2"></path>
                    <path d="M16 6 12 2 8 6"></path>
                    <path d="M16 18a4 4 0 0 0-8 0"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-xl">{t("prayer.sunrise")}</h3>
                  <p className="text-white/80">{t("prayer.sunrise_info")}</p>
                </div>
              </div>
              <div className="text-3xl font-bold">{prayerData.Sunrise}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prayerTimes.map((prayer, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 shadow-md border-t-4 ${prayer.color} hover:shadow-lg transition-all duration-300 hover-lift`}
              >
                <div className="flex items-center mb-4">
                  <div className={`mr-3 p-2 ${prayer.bgColor} rounded-md ${prayer.textColor}`}>{prayer.icon}</div>
                  <h3 className="font-medium text-lg">{prayer.name}</h3>
                </div>
                <div className="flex items-center mb-1">
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
                    className="h-4 w-4 mr-2 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-2xl font-bold">{prayer.time}</span>
                </div>
                {prayer.iqama && (
                  <div className={`flex items-center text-sm mt-2 ${prayer.bgColor} rounded-md px-3 py-1 inline-block`}>
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
                      className="h-3 w-3 mr-1"
                    >
                      <path d="m5 12 7-7 7 7"></path>
                      <path d="M12 19V5"></path>
                    </svg>
                    <span className={prayer.textColor}>
                      <span className="font-medium">{t("prayer.iqama")}:</span> {prayer.iqama}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-right text-muted-foreground">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {t("prayer.last_updated")}: {formatLastUpdated(prayerData.last_updated)}
              </div>
              <a
                href={prayerData.source}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center justify-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {t("prayer.source")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
