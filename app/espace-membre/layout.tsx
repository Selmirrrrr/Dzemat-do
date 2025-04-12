"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { User, CreditCard, Settings, LogOut, Home, ChevronRight, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Simuler un utilisateur connecté
const mockUser = {
  id: "1",
  firstName: "Emir",
  lastName: "Suljagić",
  email: "emir@example.com",
  isLoggedIn: true,
}

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const { language, t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données utilisateur
    const loadUser = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUser(mockUser)
      setIsLoading(false)
    }

    loadUser()
  }, [])

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !user?.isLoggedIn) {
      router.push("/connexion")
    }
  }, [isLoading, user, router])

  const handleLogout = () => {
    // Simuler la déconnexion
    router.push("/")
  }

  const menuItems = [
    {
      title: language === "fr" ? "Tableau de bord" : "Kontrolna tabla",
      href: "/espace-membre",
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      title: language === "fr" ? "Mon profil" : "Moj profil",
      href: "/espace-membre/profil",
      icon: <User className="h-5 w-5 mr-2" />,
    },
    {
      title: language === "fr" ? "Mes cotisations" : "Moje članarine",
      href: "/espace-membre/cotisations",
      icon: <CreditCard className="h-5 w-5 mr-2" />,
    },
    {
      title: language === "fr" ? "Paiement" : "Plaćanje",
      href: "/espace-membre/paiement",
      icon: <Settings className="h-5 w-5 mr-2" />,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar pour desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <span className="font-heading text-xl font-bold">Džemat Lozana</span>
          </div>
          <div className="px-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium">{language === "fr" ? "Bienvenue" : "Dobrodošli"}</p>
              <p className="text-lg font-bold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex-shrink-0 p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {language === "fr" ? "Déconnexion" : "Odjava"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-xl font-bold">Džemat Lozana</span>
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-xl font-bold">Džemat Lozana</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="px-1 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium">{language === "fr" ? "Bienvenue" : "Dobrodošli"}</p>
                    <p className="text-lg font-bold">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <nav className="flex-1 space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="flex-shrink-0 p-4 border-t mt-auto">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {language === "fr" ? "Déconnexion" : "Odjava"}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden h-16"></div>
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-primary hover:underline">
                  {language === "fr" ? "Accueil" : "Početna"}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <Link href="/espace-membre" className="text-primary hover:underline">
                  {language === "fr" ? "Espace membre" : "Korisnički prostor"}
                </Link>
              </li>
              {pathname !== "/espace-membre" && (
                <>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <li className="text-muted-foreground">
                    {menuItems.find((item) => item.href === pathname)?.title || ""}
                  </li>
                </>
              )}
            </ol>
          </nav>
          {children}
        </main>
      </div>
    </div>
  )
}
