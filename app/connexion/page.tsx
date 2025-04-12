"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { ArrowLeft, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const { language } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)

  const translations = {
    title: language === "fr" ? "Connexion" : "Prijava",
    subtitle:
      language === "fr"
        ? "Connectez-vous à votre compte pour accéder à votre espace membre"
        : "Prijavite se na svoj račun da biste pristupili svom korisničkom prostoru",
    backHome: language === "fr" ? "Retour à l'accueil" : "Povratak na početnu",
    email: language === "fr" ? "Adresse email" : "Email adresa",
    password: language === "fr" ? "Mot de passe" : "Lozinka",
    login: language === "fr" ? "Se connecter" : "Prijavi se",
    forgotPassword: language === "fr" ? "Mot de passe oublié ?" : "Zaboravili ste lozinku?",
    noAccount: language === "fr" ? "Vous n'avez pas de compte ?" : "Nemate račun?",
    register: language === "fr" ? "S'inscrire" : "Registrujte se",
    resetPassword: language === "fr" ? "Réinitialiser le mot de passe" : "Resetujte lozinku",
    resetInstructions:
      language === "fr"
        ? "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe."
        : "Unesite svoju email adresu i poslat ćemo vam link za resetovanje lozinke.",
    sendResetLink: language === "fr" ? "Envoyer le lien" : "Pošalji link",
    backToLogin: language === "fr" ? "Retour à la connexion" : "Povratak na prijavu",
    resetSent:
      language === "fr"
        ? "Un lien de réinitialisation a été envoyé à votre adresse email."
        : "Link za resetovanje je poslan na vašu email adresu.",
    loginTab: language === "fr" ? "Connexion" : "Prijava",
    resetTab: language === "fr" ? "Réinitialiser" : "Resetovanje",
    errorInvalidCredentials: language === "fr" ? "Email ou mot de passe incorrect" : "Pogrešan email ili lozinka",
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Simuler une connexion (à remplacer par une vraie API)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simuler une erreur pour démonstration
      if (email !== "demo@example.com" || password !== "password") {
        throw new Error("Invalid credentials")
      }

      // Redirection après connexion réussie
      window.location.href = "/"
    } catch (err) {
      setError(translations.errorInvalidCredentials)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simuler l'envoi d'un email (à remplacer par une vraie API)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setResetSent(true)
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {translations.backHome}
      </Link>

      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{translations.loginTab}</TabsTrigger>
            <TabsTrigger value="reset">{translations.resetTab}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-primary/20">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">{translations.title}</CardTitle>
                <CardDescription>{translations.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{translations.email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="nom@exemple.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">{translations.password}</Label>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center justify-center">
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
                          {language === "fr" ? "Chargement..." : "Učitavanje..."}
                        </span>
                      ) : (
                        translations.login
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center w-full">
                  <span className="text-muted-foreground">{translations.noAccount}</span>{" "}
                  <Link href="/adhesion" className="text-primary hover:underline">
                    {translations.register}
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="reset">
            <Card className="border-primary/20">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">{translations.resetPassword}</CardTitle>
                <CardDescription>{translations.resetInstructions}</CardDescription>
              </CardHeader>
              <CardContent>
                {resetSent ? (
                  <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                    <AlertDescription>{translations.resetSent}</AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleResetPassword}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">{translations.email}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="nom@exemple.com"
                            className="pl-10"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <span className="flex items-center justify-center">
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
                            {language === "fr" ? "Envoi..." : "Slanje..."}
                          </span>
                        ) : (
                          translations.sendResetLink
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
