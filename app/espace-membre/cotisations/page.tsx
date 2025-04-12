"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Download, CreditCard } from "lucide-react"
import Link from "next/link"

// Données simulées des cotisations
const mockPaymentsData = {
  memberSince: "2023-01-10",
  currentYear: 2025,
  membershipFee: {
    monthly: 30,
    annual: 360,
  },
  paymentMethod: "Carte de crédit",
  lastPaidMonth: "2025-04", // Format: YYYY-MM
  paymentHistory: [
    { id: 1, date: "2025-04-15", amount: 30, type: "monthly", status: "paid", period: "2025-04" },
    { id: 2, date: "2025-03-15", amount: 30, type: "monthly", status: "paid", period: "2025-03" },
    { id: 3, date: "2025-02-15", amount: 30, type: "monthly", status: "paid", period: "2025-02" },
    { id: 4, date: "2025-01-15", amount: 30, type: "monthly", status: "paid", period: "2025-01" },
    { id: 5, date: "2024-12-15", amount: 30, type: "monthly", status: "paid", period: "2024-12" },
    { id: 6, date: "2024-11-15", amount: 30, type: "monthly", status: "paid", period: "2024-11" },
    { id: 7, date: "2024-10-15", amount: 30, type: "monthly", status: "paid", period: "2024-10" },
    { id: 8, date: "2024-09-15", amount: 30, type: "monthly", status: "paid", period: "2024-09" },
    { id: 9, date: "2024-08-15", amount: 30, type: "monthly", status: "paid", period: "2024-08" },
    { id: 10, date: "2024-07-15", amount: 30, type: "monthly", status: "paid", period: "2024-07" },
    { id: 11, date: "2024-06-15", amount: 30, type: "monthly", status: "paid", period: "2024-06" },
    { id: 12, date: "2024-05-15", amount: 30, type: "monthly", status: "paid", period: "2024-05" },
    { id: 13, date: "2024-04-15", amount: 30, type: "monthly", status: "paid", period: "2024-04" },
    { id: 14, date: "2024-03-15", amount: 30, type: "monthly", status: "paid", period: "2024-03" },
    { id: 15, date: "2024-02-15", amount: 30, type: "monthly", status: "paid", period: "2024-02" },
    { id: 16, date: "2024-01-15", amount: 30, type: "monthly", status: "paid", period: "2024-01" },
    { id: 17, date: "2023-12-15", amount: 30, type: "monthly", status: "paid", period: "2023-12" },
    { id: 18, date: "2023-11-15", amount: 30, type: "monthly", status: "paid", period: "2023-11" },
    { id: 19, date: "2023-10-15", amount: 30, type: "monthly", status: "paid", period: "2023-10" },
    { id: 20, date: "2023-09-15", amount: 30, type: "monthly", status: "paid", period: "2023-09" },
    { id: 21, date: "2023-08-15", amount: 30, type: "monthly", status: "paid", period: "2023-08" },
    { id: 22, date: "2023-07-15", amount: 30, type: "monthly", status: "paid", period: "2023-07" },
    { id: 23, date: "2023-06-15", amount: 30, type: "monthly", status: "paid", period: "2023-06" },
    { id: 24, date: "2023-05-15", amount: 30, type: "monthly", status: "paid", period: "2023-05" },
    { id: 25, date: "2023-04-15", amount: 30, type: "monthly", status: "paid", period: "2023-04" },
    { id: 26, date: "2023-03-15", amount: 30, type: "monthly", status: "paid", period: "2023-03" },
    { id: 27, date: "2023-02-15", amount: 30, type: "monthly", status: "paid", period: "2023-02" },
    { id: 28, date: "2023-01-15", amount: 30, type: "monthly", status: "paid", period: "2023-01" },
    { id: 29, date: "2024-01-05", amount: 360, type: "annual", status: "paid", period: "2024" },
    { id: 30, date: "2023-01-15", amount: 360, type: "annual", status: "paid", period: "2023" },
  ],
}

export default function PaymentsPage() {
  const { language } = useLanguage()
  const [paymentsData, setPaymentsData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    // Simuler le chargement des données de paiement
    const loadPaymentsData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setPaymentsData(mockPaymentsData)
      setIsLoading(false)
    }

    loadPaymentsData()
  }, [])

  const translations = {
    title: language === "fr" ? "Mes cotisations" : "Moje članarine",
    subtitle: language === "fr" ? "Historique et état de vos cotisations" : "Historija i stanje vaših članarina",
    overview: language === "fr" ? "Aperçu" : "Pregled",
    history: language === "fr" ? "Historique" : "Historija",
    annual: language === "fr" ? "Annuel" : "Godišnje",
    monthly: language === "fr" ? "Mensuel" : "Mjesečno",
    memberSince: language === "fr" ? "Membre depuis" : "Član od",
    paymentMethod: language === "fr" ? "Méthode de paiement" : "Način plaćanja",
    membershipFee: language === "fr" ? "Cotisation de membre" : "Članarina",
    currentStatus: language === "fr" ? "Statut actuel" : "Trenutni status",
    upToDate: language === "fr" ? "À jour" : "Ažurno",
    overdue: language === "fr" ? "En retard" : "Kasni",
    makePayment: language === "fr" ? "Effectuer un paiement" : "Izvrši plaćanje",
    paymentHistory: language === "fr" ? "Historique des paiements" : "Historija plaćanja",
    date: language === "fr" ? "Date" : "Datum",
    amount: language === "fr" ? "Montant" : "Iznos",
    period: language === "fr" ? "Période" : "Period",
    status: language === "fr" ? "Statut" : "Status",
    paid: language === "fr" ? "Payé" : "Plaćeno",
    pending: language === "fr" ? "En attente" : "Na čekanju",
    failed: language === "fr" ? "Échoué" : "Neuspjelo",
    downloadReceipt: language === "fr" ? "Télécharger le reçu" : "Preuzmi potvrdu",
    selectYear: language === "fr" ? "Sélectionner l'année" : "Odaberi godinu",
    january: language === "fr" ? "Janvier" : "Januar",
    february: language === "fr" ? "Février" : "Februar",
    march: language === "fr" ? "Mars" : "Mart",
    april: language === "fr" ? "Avril" : "April",
    may: language === "fr" ? "Mai" : "Maj",
    june: language === "fr" ? "Juin" : "Juni",
    july: language === "fr" ? "Juillet" : "Juli",
    august: language === "fr" ? "Août" : "August",
    september: language === "fr" ? "Septembre" : "Septembar",
    october: language === "fr" ? "Octobre" : "Oktobar",
    november: language === "fr" ? "Novembre" : "Novembar",
    december: language === "fr" ? "Décembre" : "Decembar",
    paymentStatus: language === "fr" ? "État des paiements" : "Status plaćanja",
    monthlyPayments: language === "fr" ? "Paiements mensuels" : "Mjesečna plaćanja",
    noPayments: language === "fr" ? "Aucun paiement trouvé pour cette période" : "Nema plaćanja za ovaj period",
    yearlyOverview: language === "fr" ? "Aperçu annuel" : "Godišnji pregled",
    monthlyDetails: language === "fr" ? "Détails mensuels" : "Mjesečni detalji",
    paymentOptions: language === "fr" ? "Options de paiement" : "Opcije plaćanja",
    monthlyOption: language === "fr" ? "Mensuel (30 CHF/mois)" : "Mjesečno (30 CHF/mjesec)",
    annualOption: language === "fr" ? "Annuel (360 CHF/an)" : "Godišnje (360 CHF/godina)",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "bs-BA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const getMonthName = (monthNumber: number) => {
    const months = [
      translations.january,
      translations.february,
      translations.march,
      translations.april,
      translations.may,
      translations.june,
      translations.july,
      translations.august,
      translations.september,
      translations.october,
      translations.november,
      translations.december,
    ]
    return months[monthNumber - 1]
  }

  const getMonthlyPaymentStatus = (year: number, month: number) => {
    if (!paymentsData) return null

    const monthStr = month.toString().padStart(2, "0")
    const periodStr = `${year}-${monthStr}`

    const payment = paymentsData.paymentHistory.find((p: any) => p.period === periodStr)

    return payment ? payment.status : null
  }

  const getYearlyPaymentSummary = (year: number) => {
    if (!paymentsData) return { paidMonths: 0, totalMonths: 12 }

    const yearPayments = paymentsData.paymentHistory.filter(
      (p: any) => p.period.startsWith(year.toString()) && p.period.includes("-"),
    )

    const paidMonths = yearPayments.filter((p: any) => p.status === "paid").length

    return { paidMonths, totalMonths: 12 }
  }

  const getYearlyPayments = (year: number) => {
    if (!paymentsData) return []

    return paymentsData.paymentHistory
      .filter((p: any) => p.period.startsWith(year.toString()))
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getAvailableYears = () => {
    if (!paymentsData) return []

    const memberSinceYear = Number.parseInt(paymentsData.memberSince.split("-")[0])
    const currentYear = new Date().getFullYear()

    const years = []
    for (let year = currentYear; year >= memberSinceYear; year--) {
      years.push(year)
    }

    return years
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">{translations.title}</h1>
      <p className="text-muted-foreground mb-8">{translations.subtitle}</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="overview">{translations.overview}</TabsTrigger>
          <TabsTrigger value="history">{translations.history}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{translations.memberSince}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatDate(paymentsData.memberSince)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{translations.paymentMethod}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{paymentsData.paymentMethod}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{translations.currentStatus}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  <span className="text-xl font-bold text-green-600">{translations.upToDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{translations.yearlyOverview}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Sélectionnez une année pour voir les détails mensuels"
                    : "Odaberite godinu da biste vidjeli mjesečne detalje"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">{translations.membershipFee}</p>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="font-medium">{translations.monthlyOption}</p>
                    <p className="font-medium">{translations.annualOption}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {getAvailableYears().map((year) => {
                    const { paidMonths, totalMonths } = getYearlyPaymentSummary(year)
                    const isComplete = paidMonths === totalMonths
                    const progress = (paidMonths / totalMonths) * 100

                    return (
                      <div
                        key={year}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedYear === year ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedYear(year)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-lg">{year}</span>
                          <Badge
                            variant={isComplete ? "default" : "outline"}
                            className={isComplete ? "bg-green-600" : ""}
                          >
                            {paidMonths}/{totalMonths} {language === "fr" ? "mois payés" : "plaćenih mjeseci"}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{translations.monthlyDetails}</CardTitle>
                <CardDescription>
                  {language === "fr" ? `Détails mensuels pour ${selectedYear}` : `Mjesečni detalji za ${selectedYear}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
                    const status = getMonthlyPaymentStatus(selectedYear, month)
                    return (
                      <div
                        key={month}
                        className={`p-2 text-center rounded-md border ${
                          status === "paid"
                            ? "bg-green-50 border-green-200"
                            : status === "pending"
                              ? "bg-yellow-50 border-yellow-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="text-xs mb-1">{getMonthName(month).substring(0, 3)}</div>
                        {status === "paid" ? (
                          <CheckCircle className="h-4 w-4 mx-auto text-green-500" />
                        ) : status === "pending" ? (
                          <AlertCircle className="h-4 w-4 mx-auto text-yellow-500" />
                        ) : (
                          <XCircle className="h-4 w-4 mx-auto text-gray-300" />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-8">
                  <Button asChild className="w-full">
                    <Link href="/espace-membre/paiement">
                      <CreditCard className="h-4 w-4 mr-2" />
                      {translations.makePayment}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>{translations.paymentHistory}</CardTitle>
              <CardDescription>
                {language === "fr" ? "Historique complet de vos paiements" : "Kompletna historija vaših plaćanja"}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {getAvailableYears().map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                    className="rounded-full"
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">{translations.date}</th>
                      <th className="text-left py-3 px-2">{translations.amount}</th>
                      <th className="text-left py-3 px-2">{translations.period}</th>
                      <th className="text-left py-3 px-2">{translations.status}</th>
                      <th className="text-right py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getYearlyPayments(selectedYear).length > 0 ? (
                      getYearlyPayments(selectedYear).map((payment: any) => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3 px-2">{formatDate(payment.date)}</td>
                          <td className="py-3 px-2">{payment.amount} CHF</td>
                          <td className="py-3 px-2">
                            {payment.type === "annual"
                              ? `${payment.period} (${translations.annual})`
                              : `${getMonthName(Number.parseInt(payment.period.split("-")[1]))} ${payment.period.split("-")[0]}`}
                          </td>
                          <td className="py-3 px-2">
                            {payment.status === "paid" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {translations.paid}
                              </Badge>
                            ) : payment.status === "pending" ? (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {translations.pending}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <XCircle className="h-3 w-3 mr-1" />
                                {translations.failed}
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-2 text-right">
                            {payment.status === "paid" && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                <span className="sr-only md:not-sr-only md:inline-block">
                                  {translations.downloadReceipt}
                                </span>
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          {translations.noPayments}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
