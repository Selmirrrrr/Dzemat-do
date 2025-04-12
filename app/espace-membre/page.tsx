"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, CreditCard, Calendar, Bell, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function MemberDashboard() {
  const { language } = useLanguage()

  // Données simulées pour le tableau de bord
  const dashboardData = {
    nextPayment: "15/05/2025",
    memberSince: "10/01/2023",
    status: "active",
    notifications: 2,
    lastPayment: "15/04/2025",
    paymentAmount: "30 CHF",
  }

  const translations = {
    title: language === "fr" ? "Tableau de bord" : "Kontrolna tabla",
    welcome: language === "fr" ? "Bienvenue dans votre espace membre" : "Dobrodošli u vaš korisnički prostor",
    memberStatus: language === "fr" ? "Statut du membre" : "Status člana",
    active: language === "fr" ? "Actif" : "Aktivan",
    inactive: language === "fr" ? "Inactif" : "Neaktivan",
    memberSince: language === "fr" ? "Membre depuis" : "Član od",
    nextPayment: language === "fr" ? "Prochain paiement" : "Sljedeće plaćanje",
    lastPayment: language === "fr" ? "Dernier paiement" : "Posljednje plaćanje",
    amount: language === "fr" ? "Montant" : "Iznos",
    notifications: language === "fr" ? "Notifications" : "Obavještenja",
    viewProfile: language === "fr" ? "Voir mon profil" : "Pogledaj moj profil",
    viewPayments: language === "fr" ? "Voir mes cotisations" : "Pogledaj moje članarine",
    makePayment: language === "fr" ? "Effectuer un paiement" : "Izvrši plaćanje",
    quickActions: language === "fr" ? "Actions rapides" : "Brze akcije",
    paymentStatus: language === "fr" ? "État des paiements" : "Status plaćanja",
    upToDate: language === "fr" ? "À jour" : "Ažurno",
    overdue: language === "fr" ? "En retard" : "Kasni",
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">{translations.title}</h1>
      <p className="text-muted-foreground mb-8">{translations.welcome}</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{translations.memberStatus}</CardTitle>
            <CardDescription>
              {translations.memberSince}: {dashboardData.memberSince}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${dashboardData.status === "active" ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span className="font-medium">
                {dashboardData.status === "active" ? translations.active : translations.inactive}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{translations.paymentStatus}</CardTitle>
            <CardDescription>
              {translations.nextPayment}: {dashboardData.nextPayment}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium">{translations.upToDate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{translations.notifications}</CardTitle>
            <CardDescription>
              {dashboardData.notifications} {language === "fr" ? "nouvelles" : "nova"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium">
                {language === "fr" ? "Dernière activité: " : "Posljednja aktivnost: "}
                {dashboardData.lastPayment}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">{translations.quickActions}</h2>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Button asChild className="h-auto py-4 justify-start">
          <Link href="/espace-membre/profil">
            <User className="h-5 w-5 mr-2" />
            {translations.viewProfile}
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 justify-start">
          <Link href="/espace-membre/cotisations">
            <CreditCard className="h-5 w-5 mr-2" />
            {translations.viewPayments}
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-auto py-4 justify-start">
          <Link href="/espace-membre/paiement">
            <Calendar className="h-5 w-5 mr-2" />
            {translations.makePayment}
          </Link>
        </Button>
      </div>

      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <h3 className="font-medium mb-2">{translations.lastPayment}</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">{dashboardData.lastPayment}</p>
            <p className="font-medium">
              {translations.amount}: {dashboardData.paymentAmount}
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/espace-membre/cotisations">{language === "fr" ? "Détails" : "Detalji"}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
