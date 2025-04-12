"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Données simulées de l'utilisateur
const mockUserData = {
  firstName: "Emir",
  lastName: "Suljagić",
  email: "emir@example.com",
  gender: "male",
  birthDate: new Date("1980-05-15"),
  maritalStatus: "married",
  spouseFirstName: "Amina",
  spouseLastName: "Suljagić",
  spouseBirthDate: new Date("1985-08-20"),
  children: [
    { id: 1, firstName: "Sara", lastName: "Suljagić", birthDate: new Date("2010-03-10"), gender: "female" },
    { id: 2, firstName: "Ahmed", lastName: "Suljagić", birthDate: new Date("2015-07-22"), gender: "male" },
  ],
  address: {
    street: "Rue de Lausanne 123",
    postalCode: "1000",
    city: "Lausanne",
    canton: "vd",
  },
  phone: "+41 76 123 45 67",
  correspondencePreferences: ["email", "sms"],
  correspondenceLanguage: "fr",
}

export default function ProfilePage() {
  const { language } = useLanguage()
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    // Simuler le chargement des données utilisateur
    const loadUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUserData(mockUserData)
      setIsLoading(false)
    }

    loadUserData()
  }, [])

  const translations = {
    title: language === "fr" ? "Mon profil" : "Moj profil",
    subtitle: language === "fr" ? "Gérez vos informations personnelles" : "Upravljajte svojim ličnim podacima",
    personalInfo: language === "fr" ? "Informations personnelles" : "Lični podaci",
    familyInfo: language === "fr" ? "Famille" : "Porodica",
    contactInfo: language === "fr" ? "Coordonnées" : "Kontakt podaci",
    preferences: language === "fr" ? "Préférences" : "Postavke",
    save: language === "fr" ? "Enregistrer" : "Sačuvaj",
    saving: language === "fr" ? "Enregistrement..." : "Čuvanje...",
    successMessage:
      language === "fr" ? "Vos informations ont été mises à jour avec succès" : "Vaši podaci su uspješno ažurirani",
    // Champs personnels
    lastName: language === "fr" ? "Nom" : "Prezime",
    firstName: language === "fr" ? "Prénom" : "Ime",
    email: language === "fr" ? "Email" : "Email",
    gender: language === "fr" ? "Genre" : "Spol",
    male: language === "fr" ? "Masculin" : "Muški",
    female: language === "fr" ? "Féminin" : "Ženski",
    birthDate: language === "fr" ? "Date de naissance" : "Datum rođenja",
    maritalStatus: language === "fr" ? "Statut marital" : "Bračni status",
    single: language === "fr" ? "Célibataire" : "Neoženjen/Neudata",
    married: language === "fr" ? "Marié(e)" : "Oženjen/Udata",
    widowed: language === "fr" ? "Veuf/Veuve" : "Udovac/Udovica",
    // Famille
    spouseInfo: language === "fr" ? "Informations sur le conjoint" : "Podaci o supružniku",
    spouseLastName: language === "fr" ? "Nom du conjoint" : "Prezime supružnika",
    spouseFirstName: language === "fr" ? "Prénom du conjoint" : "Ime supružnika",
    spouseBirthDate: language === "fr" ? "Date de naissance du conjoint" : "Datum rođenja supružnika",
    children: language === "fr" ? "Enfants" : "Djeca",
    childLastName: language === "fr" ? "Nom" : "Prezime",
    childFirstName: language === "fr" ? "Prénom" : "Ime",
    childGender: language === "fr" ? "Genre" : "Spol",
    childBirthDate: language === "fr" ? "Date de naissance" : "Datum rođenja",
    // Contact
    address: language === "fr" ? "Adresse" : "Adresa",
    street: language === "fr" ? "Rue" : "Ulica",
    postalCode: language === "fr" ? "NPA" : "Poštanski broj",
    city: language === "fr" ? "Ville" : "Grad",
    canton: language === "fr" ? "Canton" : "Kanton",
    phone: language === "fr" ? "Numéro de téléphone" : "Broj telefona",
    // Préférences
    correspondence: language === "fr" ? "Correspondance souhaitée" : "Željena korespondencija",
    byEmail: language === "fr" ? "Email" : "Email",
    byMail: language === "fr" ? "Courrier" : "Pošta",
    bySMS: language === "fr" ? "SMS" : "SMS",
    correspondenceLanguage: language === "fr" ? "Langue de correspondance" : "Jezik korespondencije",
    french: language === "fr" ? "Français" : "Francuski",
    bosnian: language === "fr" ? "Bosniaque" : "Bosanski",
    selectDate: language === "fr" ? "Sélectionner une date" : "Odaberite datum",
  }

  const handleInputChange = (field: string, value: any) => {
    setUserData({
      ...userData,
      [field]: value,
    })
  }

  const handleAddressChange = (field: string, value: any) => {
    setUserData({
      ...userData,
      address: {
        ...userData.address,
        [field]: value,
      },
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simuler l'enregistrement des données
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSuccessMessage(translations.successMessage)

    // Afficher un toast de succès
    toast({
      title: language === "fr" ? "Profil mis à jour" : "Profil ažuriran",
      description: translations.successMessage,
    })

    // Effacer le message après 3 secondes
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
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

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
          {successMessage}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 mb-8">
          <TabsTrigger value="personal">{translations.personalInfo}</TabsTrigger>
          <TabsTrigger value="family">{translations.familyInfo}</TabsTrigger>
          <TabsTrigger value="contact">{translations.contactInfo}</TabsTrigger>
          <TabsTrigger value="preferences">{translations.preferences}</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>{translations.personalInfo}</CardTitle>
              <CardDescription>
                {language === "fr" ? "Vos informations personnelles de base" : "Vaši osnovni lični podaci"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lastName">{translations.lastName}</Label>
                  <Input
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">{translations.firstName}</Label>
                  <Input
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{translations.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">{translations.gender}</Label>
                <RadioGroup
                  value={userData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
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
                <Label htmlFor="birthDate">{translations.birthDate}</Label>
                <div className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !userData.birthDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {userData.birthDate ? format(userData.birthDate, "PPP") : translations.selectDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={userData.birthDate}
                        onSelect={(date) => handleInputChange("birthDate", date)}
                        captionLayout="dropdown-buttons"
                        fromYear={1920}
                        toYear={2023}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">{translations.maritalStatus}</Label>
                <RadioGroup
                  value={userData.maritalStatus}
                  onValueChange={(value) => handleInputChange("maritalStatus", value)}
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
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? translations.saving : translations.save}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="family">
          <Card>
            <CardHeader>
              <CardTitle>{translations.familyInfo}</CardTitle>
              <CardDescription>
                {language === "fr" ? "Informations sur votre famille" : "Informacije o vašoj porodici"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userData.maritalStatus === "married" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">{translations.spouseInfo}</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="spouseLastName">{translations.spouseLastName}</Label>
                      <Input
                        id="spouseLastName"
                        value={userData.spouseLastName}
                        onChange={(e) => handleInputChange("spouseLastName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="spouseFirstName">{translations.spouseFirstName}</Label>
                      <Input
                        id="spouseFirstName"
                        value={userData.spouseFirstName}
                        onChange={(e) => handleInputChange("spouseFirstName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spouseBirthDate">{translations.spouseBirthDate}</Label>
                    <div className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !userData.spouseBirthDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {userData.spouseBirthDate
                              ? format(userData.spouseBirthDate, "PPP")
                              : translations.selectDate}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={userData.spouseBirthDate}
                            onSelect={(date) => handleInputChange("spouseBirthDate", date)}
                            captionLayout="dropdown-buttons"
                            fromYear={1920}
                            toYear={2023}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium text-lg">{translations.children}</h3>
                {userData.children.map((child: any, index: number) => (
                  <div key={child.id} className="p-4 border rounded-md space-y-4">
                    <h4 className="font-medium">{language === "fr" ? `Enfant ${index + 1}` : `Dijete ${index + 1}`}</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`childLastName-${child.id}`}>{translations.childLastName}</Label>
                        <Input
                          id={`childLastName-${child.id}`}
                          value={child.lastName}
                          onChange={(e) => {
                            const updatedChildren = [...userData.children]
                            updatedChildren[index].lastName = e.target.value
                            handleInputChange("children", updatedChildren)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`childFirstName-${child.id}`}>{translations.childFirstName}</Label>
                        <Input
                          id={`childFirstName-${child.id}`}
                          value={child.firstName}
                          onChange={(e) => {
                            const updatedChildren = [...userData.children]
                            updatedChildren[index].firstName = e.target.value
                            handleInputChange("children", updatedChildren)
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`childGender-${child.id}`}>{translations.childGender}</Label>
                      <RadioGroup
                        value={child.gender}
                        onValueChange={(value) => {
                          const updatedChildren = [...userData.children]
                          updatedChildren[index].gender = value
                          handleInputChange("children", updatedChildren)
                        }}
                        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id={`childMale-${child.id}`} />
                          <Label htmlFor={`childMale-${child.id}`}>{translations.male}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id={`childFemale-${child.id}`} />
                          <Label htmlFor={`childFemale-${child.id}`}>{translations.female}</Label>
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
                                "w-full justify-start text-left font-normal",
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
                              onSelect={(date) => {
                                const updatedChildren = [...userData.children]
                                updatedChildren[index].birthDate = date
                                handleInputChange("children", updatedChildren)
                              }}
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
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? translations.saving : translations.save}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>{translations.contactInfo}</CardTitle>
              <CardDescription>
                {language === "fr" ? "Vos coordonnées de contact" : "Vaši kontakt podaci"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">{translations.street}</Label>
                <Input
                  id="street"
                  value={userData.address.street}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">{translations.postalCode}</Label>
                  <Input
                    id="postalCode"
                    value={userData.address.postalCode}
                    onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="city">{translations.city}</Label>
                  <Input
                    id="city"
                    value={userData.address.city}
                    onChange={(e) => handleAddressChange("city", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="canton">{translations.canton}</Label>
                <Select value={userData.address.canton} onValueChange={(value) => handleAddressChange("canton", value)}>
                  <SelectTrigger>
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
                <Label htmlFor="phone">{translations.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? translations.saving : translations.save}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>{translations.preferences}</CardTitle>
              <CardDescription>
                {language === "fr" ? "Vos préférences de communication" : "Vaše komunikacijske postavke"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{translations.correspondence}</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="byEmail"
                      checked={userData.correspondencePreferences.includes("email")}
                      onChange={(e) => {
                        const newPrefs = e.target.checked
                          ? [...userData.correspondencePreferences, "email"]
                          : userData.correspondencePreferences.filter((p: string) => p !== "email")
                        handleInputChange("correspondencePreferences", newPrefs)
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="byEmail" className="font-normal">
                      {translations.byEmail}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="byMail"
                      checked={userData.correspondencePreferences.includes("mail")}
                      onChange={(e) => {
                        const newPrefs = e.target.checked
                          ? [...userData.correspondencePreferences, "mail"]
                          : userData.correspondencePreferences.filter((p: string) => p !== "mail")
                        handleInputChange("correspondencePreferences", newPrefs)
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="byMail" className="font-normal">
                      {translations.byMail}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bySMS"
                      checked={userData.correspondencePreferences.includes("sms")}
                      onChange={(e) => {
                        const newPrefs = e.target.checked
                          ? [...userData.correspondencePreferences, "sms"]
                          : userData.correspondencePreferences.filter((p: string) => p !== "sms")
                        handleInputChange("correspondencePreferences", newPrefs)
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="bySMS" className="font-normal">
                      {translations.bySMS}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="correspondenceLanguage">{translations.correspondenceLanguage}</Label>
                <RadioGroup
                  value={userData.correspondenceLanguage}
                  onValueChange={(value) => handleInputChange("correspondenceLanguage", value)}
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
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? translations.saving : translations.save}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
