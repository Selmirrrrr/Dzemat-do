"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CreditCard, CheckCircle2, Calendar, AlertCircle, Info } from "lucide-react"

// Simuler les données du dernier mois payé
const lastPaidMonth = "2025-04" // Format: YYYY-MM

export default function PaymentPage() {
  const { language } = useLanguage()
  const [paymentType, setPaymentType] = useState("monthly")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")

  // Calculer le prochain mois à payer
  const getNextPaymentPeriod = () => {
    const [year, month] = lastPaidMonth.split("-").map(Number)

    if (paymentType === "monthly") {
      // Pour le paiement mensuel, calculer le mois suivant
      let nextMonth = month + 1
      let nextYear = year

      if (nextMonth > 12) {
        nextMonth = 1
        nextYear += 1
      }

      return {
        display: `${getMonthName(nextMonth)} ${nextYear}`,
        value: `${nextYear}-${String(nextMonth).padStart(2, "0")}`,
      }
    } else {
      // Pour le paiement annuel, calculer les 12 prochains mois
      const startMonth = month + 1 > 12 ? 1 : month + 1
      const startYear = month + 1 > 12 ? year + 1 : year
      const endMonth = startMonth === 1 ? 12 : startMonth - 1
      const endYear = startMonth === 1 ? startYear + 1 : startYear + 1

      return {
        display: `${getMonthName(startMonth)} ${startYear} - ${getMonthName(endMonth)} ${endYear}`,
        value: `${startYear}-${String(startMonth).padStart(2, "0")} à ${endYear}-${String(endMonth).padStart(2, "0")}`,
      }
    }
  }

  const getMonthName = (monthNumber: number) => {
    const months = [
      language === "fr" ? "Janvier" : "Januar",
      language === "fr" ? "Février" : "Februar",
      language === "fr" ? "Mars" : "Mart",
      language === "fr" ? "Avril" : "April",
      language === "fr" ? "Mai" : "Maj",
      language === "fr" ? "Juin" : "Juni",
      language === "fr" ? "Juillet" : "Juli",
      language === "fr" ? "Août" : "August",
      language === "fr" ? "Septembre" : "Septembar",
      language === "fr" ? "Octobre" : "Oktobar",
      language === "fr" ? "Novembre" : "Novembar",
      language === "fr" ? "Décembre" : "Decembar",
    ]
    return months[monthNumber - 1]
  }

  const nextPaymentPeriod = getNextPaymentPeriod()

  const translations = {
    title: language === "fr" ? "Paiement de cotisation" : "Plaćanje članarine",
    subtitle: language === "fr" ? "Effectuez votre paiement en toute sécurité" : "Izvršite vašu uplatu sigurno",
    paymentType: language === "fr" ? "Type de paiement" : "Vrsta plaćanja",
    monthly: language === "fr" ? "Mensuel (30 CHF)" : "Mjesečno (30 CHF)",
    annual: language === "fr" ? "Annuel (360 CHF)" : "Godišnje (360 CHF)",
    paymentMethod: language === "fr" ? "Méthode de paiement" : "Način plaćanja",
    card: language === "fr" ? "Carte de crédit / débit" : "Kreditna / debitna kartica",
    bank: language === "fr" ? "Virement bancaire" : "Bankovni transfer",
    cash: language === "fr" ? "Paiement en espèces" : "Plaćanje gotovinom",
    cardDetails: language === "fr" ? "Détails de la carte" : "Detalji kartice",
    cardNumber: language === "fr" ? "Numéro de carte" : "Broj kartice",
    cardName: language === "fr" ? "Nom sur la carte" : "Ime na kartici",
    cardExpiry: language === "fr" ? "Date d'expiration (MM/AA)" : "Datum isteka (MM/GG)",
    cardCvc: language === "fr" ? "CVC" : "CVC",
    bankDetails: language === "fr" ? "Coordonnées bancaires" : "Bankovni podaci",
    bankInfo:
      language === "fr"
        ? "Veuillez effectuer un virement bancaire avec les informations suivantes:"
        : "Molimo izvršite bankovni transfer sa sljedećim informacijama:",
    accountName: language === "fr" ? "Nom du compte" : "Ime računa",
    accountNumber: language === "fr" ? "Numéro de compte" : "Broj računa",
    iban: language === "fr" ? "IBAN" : "IBAN",
    swift: language === "fr" ? "Code SWIFT" : "SWIFT kod",
    reference: language === "fr" ? "Référence" : "Referenca",
    cashInfo:
      language === "fr"
        ? "Vous pouvez effectuer votre paiement en espèces directement à notre bureau:"
        : "Možete izvršiti vašu uplatu gotovinom direktno u našoj kancelariji:",
    address: language === "fr" ? "Adresse" : "Adresa",
    openingHours: language === "fr" ? "Heures d'ouverture" : "Radno vrijeme",
    contactPerson: language === "fr" ? "Personne de contact" : "Kontakt osoba",
    makePayment: language === "fr" ? "Effectuer le paiement" : "Izvrši plaćanje",
    processing: language === "fr" ? "Traitement en cours..." : "Obrada u toku...",
    paymentSuccess: language === "fr" ? "Paiement réussi!" : "Plaćanje uspješno!",
    paymentSuccessMessage:
      language === "fr"
        ? "Votre paiement a été traité avec succès. Vous recevrez une confirmation par email."
        : "Vaša uplata je uspješno obrađena. Primit ćete potvrdu putem emaila.",
    returnToDashboard: language === "fr" ? "Retour au tableau de bord" : "Povratak na kontrolnu tablu",
    securePayment: language === "fr" ? "Paiement sécurisé" : "Sigurno plaćanje",
    secureInfo:
      language === "fr"
        ? "Toutes les informations de paiement sont cryptées et sécurisées."
        : "Sve informacije o plaćanju su šifrirane i sigurne.",
    paymentWarning:
      language === "fr"
        ? "Veuillez noter que le paiement sera traité immédiatement."
        : "Imajte na umu da će uplata biti obrađena odmah.",
    nextPaymentPeriod: language === "fr" ? "Période de paiement" : "Period plaćanja",
    monthlyPaymentInfo: language === "fr" ? "Paiement pour le mois suivant" : "Plaćanje za sljedeći mjesec",
    annualPaymentInfo: language === "fr" ? "Paiement pour les 12 prochains mois" : "Plaćanje za sljedećih 12 mjeseci",
    lastPaidMonth: language === "fr" ? "Dernier mois payé" : "Posljednji plaćeni mjesec",
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 digits
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim()
    setCardNumber(formattedValue)
  }

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format expiry date as MM/YY
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (value.length <= 2) {
      setCardExpiry(value)
    } else {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simuler le traitement du paiement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setPaymentSuccess(true)

    toast({
      title: language === "fr" ? "Paiement réussi" : "Plaćanje uspješno",
      description: translations.paymentSuccessMessage,
    })
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">{translations.paymentSuccess}</h1>
        <p className="text-muted-foreground mb-8">{translations.paymentSuccessMessage}</p>
        <Button asChild>
          <a href="/espace-membre">{translations.returnToDashboard}</a>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">{translations.title}</h1>
      <p className="text-muted-foreground mb-8">{translations.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{translations.paymentType}</CardTitle>
              <CardDescription>
                {language === "fr"
                  ? "Choisissez comment vous souhaitez payer votre cotisation"
                  : "Odaberite kako želite platiti članarinu"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md flex items-start mb-6">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  {language === "fr"
                    ? `Votre dernier mois payé est ${getMonthName(Number.parseInt(lastPaidMonth.split("-")[1]))} ${lastPaidMonth.split("-")[0]}. Le paiement s'appliquera à partir du mois suivant.`
                    : `Vaš posljednji plaćeni mjesec je ${getMonthName(Number.parseInt(lastPaidMonth.split("-")[1]))} ${lastPaidMonth.split("-")[0]}. Plaćanje će se primijeniti od sljedećeg mjeseca.`}
                </div>
              </div>

              <RadioGroup value={paymentType} onValueChange={setPaymentType} className="space-y-4">
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                    <div className="font-medium">{translations.monthly}</div>
                    <div className="text-sm text-muted-foreground">
                      {translations.monthlyPaymentInfo}: <strong>{nextPaymentPeriod.display}</strong>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value="annual" id="annual" />
                  <Label htmlFor="annual" className="flex-1 cursor-pointer">
                    <div className="font-medium">{translations.annual}</div>
                    <div className="text-sm text-muted-foreground">
                      {translations.annualPaymentInfo}: <strong>{nextPaymentPeriod.display}</strong>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{translations.paymentMethod}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                  <TabsTrigger value="card" className="flex items-center justify-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    {translations.card}
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {translations.bank}
                  </TabsTrigger>
                  <TabsTrigger value="cash" className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {translations.cash}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="card">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">{translations.cardNumber}</Label>
                        <Input
                          id="cardNumber"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">{translations.cardName}</Label>
                        <Input
                          id="cardName"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">{translations.cardExpiry}</Label>
                          <Input
                            id="cardExpiry"
                            value={cardExpiry}
                            onChange={handleCardExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">{translations.cardCvc}</Label>
                          <Input
                            id="cardCvc"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ""))}
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {translations.processing}
                          </span>
                        ) : (
                          translations.makePayment
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="bank">
                  <div className="space-y-4">
                    <p>{translations.bankInfo}</p>
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-muted-foreground">{translations.accountName}:</div>
                        <div className="font-medium">Association Bosniaque de Lausanne</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-muted-foreground">{translations.iban}:</div>
                        <div className="font-medium">CH93 0076 7000 S123 4567 8</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-muted-foreground">{translations.swift}:</div>
                        <div className="font-medium">POFICHBEXXX</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-muted-foreground">{translations.reference}:</div>
                        <div className="font-medium">
                          {paymentType === "monthly"
                            ? `Cotisation mensuelle - ${nextPaymentPeriod.display}`
                            : `Cotisation annuelle - ${nextPaymentPeriod.display}`}
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-700">
                        {language === "fr"
                          ? "Après avoir effectué le virement, veuillez nous envoyer une confirmation par email à finance@dzemat-lozana.ch"
                          : "Nakon izvršenja transfera, molimo pošaljite nam potvrdu putem emaila na finance@dzemat-lozana.ch"}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cash">
                  <div className="space-y-4">
                    <p>{translations.cashInfo}</p>
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-muted-foreground">{translations.address}:</div>
                        <div className="font-medium">
                          Association Bosniaque de Lausanne
                          <br />
                          Rue de Lausanne 123
                          <br />
                          1000 Lausanne
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-muted-foreground">{translations.openingHours}:</div>
                        <div className="font-medium">
                          {language === "fr" ? "Lundi - Vendredi: 09:00 - 17:00" : "Ponedjeljak - Petak: 09:00 - 17:00"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-muted-foreground">{translations.contactPerson}:</div>
                        <div className="font-medium">Hamed Salkić (Caissier)</div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-700">
                        {language === "fr"
                          ? "Veuillez demander un reçu lors de votre paiement en espèces."
                          : "Molimo zatražite potvrdu prilikom plaćanja gotovinom."}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{paymentType === "monthly" ? translations.monthly : translations.annual}</CardTitle>
              <CardDescription>
                {language === "fr" ? "Résumé de votre paiement" : "Sažetak vaše uplate"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">
                    {paymentType === "monthly"
                      ? language === "fr"
                        ? "Cotisation mensuelle"
                        : "Mjesečna članarina"
                      : language === "fr"
                        ? "Cotisation annuelle"
                        : "Godišnja članarina"}
                  </span>
                  <span className="font-medium">{paymentType === "monthly" ? "30.00 CHF" : "360.00 CHF"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "fr" ? "Période" : "Period"}</span>
                  <span>{nextPaymentPeriod.display}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>{language === "fr" ? "Total" : "Ukupno"}</span>
                <span>{paymentType === "monthly" ? "30.00 CHF" : "360.00 CHF"}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                {translations.securePayment}
              </div>
              <div className="text-xs text-muted-foreground">{translations.secureInfo}</div>
              <div className="text-xs text-muted-foreground">{translations.paymentWarning}</div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
