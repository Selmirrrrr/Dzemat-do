"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { ArrowLeft, Plus, Trash2, CheckCircle2, Heart, Users, BookOpen, Globe, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdhesionPage() {
  const { language, t } = useLanguage()
  const [gender, setGender] = useState<"male" | "female">("male")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const translations = {
    title: language === "fr" ? "Demande d'adhésion" : "Zahtjev za članstvo",
    subtitle:
      language === "fr"
        ? "Remplissez ce formulaire pour devenir membre de l'Association Bosniaque de Lausanne"
        : "Ispunite ovaj obrazac da biste postali član Udruženja Bošnjaka Lozane",
    backHome: language === "fr" ? "Retour à l'accueil" : "Povratak na početnu",
    personalInfo: language === "fr" ? "Informations personnelles" : "Lični podaci",
    lastName: language === "fr" ? "Nom" : "Prezime",
    firstName: language === "fr" ? "Prénom" : "Ime",
    gender: language === "fr" ? "Genre" : "Spol",
    male: language === "fr" ? "Masculin" : "Muški",
    female: language === "fr" ? "Féminin" : "Ženski",
    birthDate: language === "fr" ? "Date de naissance" : "Datum rođenja",
    maritalStatus: language === "fr" ? "Statut marital" : "Bračni status",
    single:
      gender === "male"
        ? language === "fr"
          ? "Célibataire"
          : "Neoženjen"
        : language === "fr"
          ? "Célibataire"
          : "Neudata",
    married: gender === "male" ? (language === "fr" ? "Marié" : "Oženjen") : language === "fr" ? "Mariée" : "Udata",
    widowed: gender === "male" ? (language === "fr" ? "Veuf" : "Udovac") : language === "fr" ? "Veuve" : "Udovica",
    spouseInfo: language === "fr" ? "Informations sur le conjoint" : "Podaci o supružniku",
    spouseLastName: language === "fr" ? "Nom du conjoint" : "Prezime supružnika",
    spouseFirstName: language === "fr" ? "Prénom du conjoint" : "Ime supružnika",
    spouseBirthDate: language === "fr" ? "Date de naissance du conjoint" : "Datum rođenja supružnika",
    children: language === "fr" ? "Enfants" : "Djeca",
    addChild: language === "fr" ? "Ajouter un enfant" : "Dodaj dijete",
    childLastName: language === "fr" ? "Nom" : "Prezime",
    childFirstName: language === "fr" ? "Prénom" : "Ime",
    childGender: language === "fr" ? "Genre" : "Spol",
    childMale: language === "fr" ? "Masculin" : "Muški",
    childFemale: language === "fr" ? "Féminin" : "Ženski",
    childBirthDate: language === "fr" ? "Date de naissance" : "Datum rođenja",
    removeChild: language === "fr" ? "Supprimer" : "Ukloni",
    contactInfo: language === "fr" ? "Coordonnées" : "Kontakt podaci",
    address: language === "fr" ? "Adresse" : "Adresa",
    street: language === "fr" ? "Rue" : "Ulica",
    postalCode: language === "fr" ? "NPA" : "Poštanski broj",
    city: language === "fr" ? "Ville" : "Grad",
    canton: language === "fr" ? "Canton" : "Kanton",
    phone: language === "fr" ? "Numéro de téléphone" : "Broj telefona",
    email: language === "fr" ? "Adresse email" : "Email adresa",
    correspondence: language === "fr" ? "Correspondance souhaitée" : "Željena korespondencija",
    byEmail: language === "fr" ? "Email" : "Email",
    byMail: language === "fr" ? "Courrier" : "Pošta",
    bySMS: language === "fr" ? "SMS" : "SMS",
    correspondenceLanguage: language === "fr" ? "Langue de correspondance" : "Jezik korespondencije",
    french: language === "fr" ? "Français" : "Francuski",
    bosnian: language === "fr" ? "Bosniaque" : "Bosanski",
    termsAndConditions: language === "fr" ? "Conditions générales" : "Opšti uslovi",
    acceptTerms:
      language === "fr"
        ? "J'accepte les conditions générales et le règlement de l'association"
        : "Prihvatam opšte uslove i pravilnik udruženja",
    submit: language === "fr" ? "Soumettre la demande" : "Pošalji zahtjev",
    selectDate: language === "fr" ? "Sélectionner une date" : "Odaberite datum",
    required: language === "fr" ? "Requis" : "Obavezno",
    successTitle: language === "fr" ? "Demande envoyée" : "Zahtjev poslan",
    successMessage:
      language === "fr"
        ? "Votre demande d'adhésion a été envoyée avec succès. Nous vous contacterons prochainement."
        : "Vaš zahtjev za članstvo je uspješno poslan. Kontaktirat ćemo vas uskoro.",
    accountInfo: language === "fr" ? "Informations de compte" : "Podaci o računu",
    password: language === "fr" ? "Mot de passe" : "Lozinka",
    confirmPassword: language === "fr" ? "Confirmer le mot de passe" : "Potvrdite lozinku",
    passwordMismatch: language === "fr" ? "Les mots de passe ne correspondent pas" : "Lozinke se ne podudaraju",
    passwordRequirements:
      language === "fr"
        ? "Le mot de passe doit contenir au moins 8 caractères"
        : "Lozinka mora sadržavati najmanje 8 znakova",
    benefits: {
      title: language === "fr" ? "Pourquoi devenir membre ?" : "Zašto postati član?",
      subtitle:
        language === "fr"
          ? "Découvrez les avantages de rejoindre notre communauté"
          : "Otkrijte prednosti pridruživanja našoj zajednici",
      community: {
        title: language === "fr" ? "Appartenance à la communauté" : "Pripadnost zajednici",
        description:
          language === "fr"
            ? "Rejoignez une communauté vivante et solidaire qui préserve et célèbre notre héritage culturel et religieux."
            : "Pridružite se živoj i solidarnoj zajednici koja čuva i slavi naše kulturno i vjersko naslijeđe.",
      },
      education: {
        title: language === "fr" ? "Éducation et transmission" : "Obrazovanje i prijenos",
        description:
          language === "fr"
            ? "Accès à des cours de religion, de langue et de culture pour vous et vos enfants, assurant la transmission de notre identité."
            : "Pristup kursevima religije, jezika i kulture za vas i vašu djecu, osiguravajući prijenos našeg identiteta.",
      },
      events: {
        title: language === "fr" ? "Événements et célébrations" : "Događaji i proslave",
        description:
          language === "fr"
            ? "Participez à nos événements communautaires, célébrations religieuses et activités culturelles tout au long de l'année."
            : "Učestvujte u našim događajima zajednice, vjerskim proslavama i kulturnim aktivnostima tokom cijele godine.",
      },
      support: {
        title: language === "fr" ? "Soutien et entraide" : "Podrška i uzajamna pomoć",
        description:
          language === "fr"
            ? "Bénéficiez du soutien de la communauté dans les moments importants de la vie et contribuez à l'entraide collective."
            : "Koristite podršku zajednice u važnim životnim trenucima i doprinesite kolektivnoj uzajamnoj pomoći.",
      },
      affiliation: {
        title: language === "fr" ? "Triple affiliation" : "Trostruka pripadnost",
        description:
          language === "fr"
            ? "En devenant membre, vous êtes automatiquement affilié à trois organisations importantes:"
            : "Postajući član, automatski ste pridruženi trima važnim organizacijama:",
        list: [
          language === "fr" ? "Association Bosniaque de Lausanne (Džemat Lozana)" : "Džemat Lozana",
          language === "fr"
            ? "Communauté Islamique des Bosniaques en Suisse"
            : "Islamska zajednica Bošnjaka u Švicarskoj",
          language === "fr" ? "Communauté Islamique en Bosnie-Herzégovine" : "Islamska zajednica u Bosni i Hercegovini",
        ],
      },
      quote:
        language === "fr"
          ? "\"Allah dit dans le Coran: 'Les mosquées d'Allah ne sont entretenues que par ceux qui croient en Allah et au Jour dernier.' En tant que musulmans, notre devoir est de préserver notre foi, notre culture et notre langue.\""
          : "\"Uzvišeni Allah u Ku'ranu kaže: 'Allahove džamije održavaju oni koji u Allaha i onaj svijet vjeruju'. Naša obaveza kao muslimana je imati izgrađenu svijest o značaju džamija, očuvanju naše vjere, kulture kao i jezika.\"",
    },
  }

  const [maritalStatus, setMaritalStatus] = useState("single")
  const [children, setChildren] = useState<
    Array<{ id: number; lastName: string; firstName: string; gender: "male" | "female"; birthDate: Date | undefined }>
  >([])
  const [correspondencePreferences, setCorrespondencePreferences] = useState<string[]>([])
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const addChild = () => {
    const newId = children.length > 0 ? Math.max(...children.map((child) => child.id)) + 1 : 1
    setChildren([...children, { id: newId, lastName: "", firstName: "", gender: "male", birthDate: undefined }])
  }

  const removeChild = (id: number) => {
    setChildren(children.filter((child) => child.id !== id))
  }

  const updateChild = (id: number, field: string, value: any) => {
    setChildren(
      children.map((child) => {
        if (child.id === id) {
          return { ...child, [field]: value }
        }
        return child
      }),
    )
  }

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError(translations.passwordMismatch)
      return false
    }
    if (password.length < 8) {
      setPasswordError(translations.passwordRequirements)
      return false
    }
    setPasswordError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswords()) {
      return
    }

    // Ici, vous pourriez envoyer les données à votre backend
    console.log("Form submitted")
    setFormSubmitted(true)
    toast({
      title: translations.successTitle,
      description: translations.successMessage,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {translations.backHome}
      </Link>

      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">{translations.title}</h1>
        <p className="text-xl text-muted-foreground">{translations.subtitle}</p>
      </div>

      {/* Section des avantages */}
      <div className="mb-12">
        <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="text-center">{translations.benefits.title}</CardTitle>
            <CardDescription className="text-center">{translations.benefits.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6 italic text-center text-muted-foreground border-l-4 border-primary/30 pl-4 pr-4 py-2 bg-primary/5">
              {translations.benefits.quote}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start mb-2">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{translations.benefits.community.title}</h3>
                    <p className="text-sm text-muted-foreground">{translations.benefits.community.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start mb-2">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{translations.benefits.education.title}</h3>
                    <p className="text-sm text-muted-foreground">{translations.benefits.education.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start mb-2">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{translations.benefits.events.title}</h3>
                    <p className="text-sm text-muted-foreground">{translations.benefits.events.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start mb-2">
                  <div className="mr-3 p-2 rounded-full bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{translations.benefits.support.title}</h3>
                    <p className="text-sm text-muted-foreground">{translations.benefits.support.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-primary/5 text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start mb-2">
                <div className="mr-3 p-2 rounded-full bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{translations.benefits.affiliation.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{translations.benefits.affiliation.description}</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {translations.benefits.affiliation.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {formSubmitted ? (
        <div className="max-w-md mx-auto text-center p-8 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{translations.successTitle}</h2>
          <p className="text-gray-600">{translations.successMessage}</p>
          <Button className="mt-6" asChild>
            <Link href="/">{language === "fr" ? "Retour à l'accueil" : "Povratak na početnu"}</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          <div>
            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle>{translations.personalInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {translations.lastName} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {translations.firstName} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">
                    {translations.gender} <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    defaultValue="male"
                    onValueChange={(value) => setGender(value as "male" | "female")}
                    className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">{translations.male}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">{translations.female}</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">
                    {translations.birthDate} <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal transition-all duration-300 hover:bg-primary/5",
                            !Date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {translations.selectDate}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" captionLayout="dropdown-buttons" fromYear={1920} toYear={2023} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">
                    {translations.maritalStatus} <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    defaultValue="single"
                    onValueChange={setMaritalStatus}
                    className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single">{translations.single}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="married" id="married" />
                      <Label htmlFor="married">{translations.married}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="widowed" id="widowed" />
                      <Label htmlFor="widowed">{translations.widowed}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          {maritalStatus === "married" && (
            <div>
              <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardTitle>{translations.spouseInfo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="spouseLastName">
                        {translations.spouseLastName} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="spouseLastName"
                        required={maritalStatus === "married"}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="spouseFirstName">
                        {translations.spouseFirstName} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="spouseFirstName"
                        required={maritalStatus === "married"}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spouseBirthDate">
                      {translations.spouseBirthDate} <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal transition-all duration-300 hover:bg-primary/5",
                              !Date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {translations.selectDate}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" captionLayout="dropdown-buttons" fromYear={1920} toYear={2023} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div>
            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle>{translations.children}</CardTitle>
                <CardDescription>
                  {language === "fr"
                    ? "Ajoutez les informations de vos enfants (si applicable)"
                    : "Dodajte informacije o vašoj djeci (ako je primjenjivo)"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {children.map((child) => (
                  <div
                    key={child.id}
                    className="space-y-4 p-4 border rounded-md bg-background/50 hover:bg-background transition-colors duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{language === "fr" ? `Enfant ${child.id}` : `Dijete ${child.id}`}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeChild(child.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {translations.removeChild}
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`childLastName-${child.id}`}>{translations.childLastName}</Label>
                        <Input
                          id={`childLastName-${child.id}`}
                          value={child.lastName}
                          onChange={(e) => updateChild(child.id, "lastName", e.target.value)}
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`childFirstName-${child.id}`}>{translations.childFirstName}</Label>
                        <Input
                          id={`childFirstName-${child.id}`}
                          value={child.firstName}
                          onChange={(e) => updateChild(child.id, "firstName", e.target.value)}
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`childGender-${child.id}`}>{translations.childGender}</Label>
                      <RadioGroup
                        defaultValue={child.gender}
                        onValueChange={(value) => updateChild(child.id, "gender", value)}
                        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id={`childMale-${child.id}`} />
                          <Label htmlFor={`childMale-${child.id}`}>{translations.childMale}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id={`childFemale-${child.id}`} />
                          <Label htmlFor={`childFemale-${child.id}`}>{translations.childFemale}</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`childBirthDate-${child.id}`}>{translations.childBirthDate}</Label>
                      <div className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal transition-all duration-300 hover:bg-primary/5",
                                !child.birthDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {child.birthDate ? format(child.birthDate, "PPP") : translations.selectDate}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={child.birthDate}
                              onSelect={(date) => updateChild(child.id, "birthDate", date)}
                              captionLayout="dropdown-buttons"
                              fromYear={1990}
                              toYear={2023}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addChild}
                    className="w-full bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {translations.addChild}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle>{translations.contactInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="street">
                    {translations.street} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="street"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      {translations.postalCode} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="city">
                      {translations.city} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canton">
                    {translations.canton} <span className="text-red-500">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary">
                      <SelectValue placeholder={language === "fr" ? "Sélectionner un canton" : "Odaberite kanton"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ag">Argovie / Aargau</SelectItem>
                      <SelectItem value="ai">Appenzell Rhodes-Intérieures / Appenzell Innerrhoden</SelectItem>
                      <SelectItem value="ar">Appenzell Rhodes-Extérieures / Appenzell Ausserrhoden</SelectItem>
                      <SelectItem value="be">Berne / Bern</SelectItem>
                      <SelectItem value="bl">Bâle-Campagne / Basel-Landschaft</SelectItem>
                      <SelectItem value="bs">Bâle-Ville / Basel-Stadt</SelectItem>
                      <SelectItem value="fr">Fribourg / Freiburg</SelectItem>
                      <SelectItem value="ge">Genève / Genf</SelectItem>
                      <SelectItem value="gl">Glaris / Glarus</SelectItem>
                      <SelectItem value="gr">Grisons / Graubünden</SelectItem>
                      <SelectItem value="ju">Jura</SelectItem>
                      <SelectItem value="lu">Lucerne / Luzern</SelectItem>
                      <SelectItem value="ne">Neuchâtel / Neuenburg</SelectItem>
                      <SelectItem value="nw">Nidwald / Nidwalden</SelectItem>
                      <SelectItem value="ow">Obwald / Obwalden</SelectItem>
                      <SelectItem value="sg">Saint-Gall / St. Gallen</SelectItem>
                      <SelectItem value="sh">Schaffhouse / Schaffhausen</SelectItem>
                      <SelectItem value="so">Soleure / Solothurn</SelectItem>
                      <SelectItem value="sz">Schwyz</SelectItem>
                      <SelectItem value="tg">Thurgovie / Thurgau</SelectItem>
                      <SelectItem value="ti">Tessin / Ticino</SelectItem>
                      <SelectItem value="ur">Uri</SelectItem>
                      <SelectItem value="vd">Vaud / Waadt</SelectItem>
                      <SelectItem value="vs">Valais / Wallis</SelectItem>
                      <SelectItem value="zg">Zoug / Zug</SelectItem>
                      <SelectItem value="zh">Zurich / Zürich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {translations.phone} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {translations.email} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label>{translations.correspondence}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="byEmail"
                        checked={correspondencePreferences.includes("email")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCorrespondencePreferences([...correspondencePreferences, "email"])
                          } else {
                            setCorrespondencePreferences(correspondencePreferences.filter((pref) => pref !== "email"))
                          }
                        }}
                        className="transition-colors duration-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="byEmail" className="font-normal">
                        {translations.byEmail}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="byMail"
                        checked={correspondencePreferences.includes("mail")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCorrespondencePreferences([...correspondencePreferences, "mail"])
                          } else {
                            setCorrespondencePreferences(correspondencePreferences.filter((pref) => pref !== "mail"))
                          }
                        }}
                        className="transition-colors duration-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="byMail" className="font-normal">
                        {translations.byMail}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bySMS"
                        checked={correspondencePreferences.includes("sms")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCorrespondencePreferences([...correspondencePreferences, "sms"])
                          } else {
                            setCorrespondencePreferences(correspondencePreferences.filter((pref) => pref !== "sms"))
                          }
                        }}
                        className="transition-colors duration-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="bySMS" className="font-normal">
                        {translations.bySMS}
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correspondenceLanguage">
                    {translations.correspondenceLanguage} <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    defaultValue="fr"
                    className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fr" id="fr" />
                      <Label htmlFor="fr">{translations.french}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ba" id="ba" />
                      <Label htmlFor="ba">{translations.bosnian}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle>{translations.accountInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {translations.password} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {translations.confirmPassword} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {passwordError && (
                  <Alert variant="destructive" className="animate-pulse">
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}

                <p className="text-sm text-muted-foreground">{translations.passwordRequirements}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle>{translations.termsAndConditions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1 transition-colors duration-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="terms" className="font-normal">
                      {translations.acceptTerms} <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "fr" ? (
                        <Link href="#" className="text-primary hover:underline">
                          Voir les conditions générales
                        </Link>
                      ) : (
                        <Link href="#" className="text-primary hover:underline">
                          Pogledajte opšte uslove
                        </Link>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300"
                    disabled={!acceptTerms}
                  >
                    {translations.submit}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </form>
      )}
      <Toaster />
    </div>
  )
}
