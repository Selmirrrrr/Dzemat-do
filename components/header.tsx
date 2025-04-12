"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Détecter le défilement pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Modifier la structure des éléments de navigation pour inclure des sous-menus
  // Remplacer la définition actuelle de navItems par celle-ci:

  const navItems = [
    { label: t("nav.home"), href: "/#home", submenu: null },
    {
      label: t("nav.about"),
      href: "/#about",
      submenu: [
        { label: t("nav.about"), href: "/#about" },
        { label: t("nav.committee"), href: "/comite" },
      ],
    },
    {
      label: t("nav.services"),
      href: "/#services",
      submenu: [
        { label: t("nav.services"), href: "/#services" },
        { label: t("nav.prayer"), href: "/#prayer" },
      ],
    },
    { label: t("nav.events"), href: "/#events", submenu: null },
    { label: t("nav.contact"), href: "/#contact", submenu: null },
  ]

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && href.endsWith(pathname)
    }
    return pathname === href
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <span className="font-heading text-xl font-bold text-primary">Džemat Lozana</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {navItems.map((item, index) =>
              item.submenu ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.href) ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      {item.label}
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
                        className="ml-1 h-3 w-3"
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.submenu.map((subItem, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link href={subItem.href} className={`w-full ${isActive(subItem.href) ? "font-medium" : ""}`}>
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href) ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Boutons de connexion et d'adhésion pour desktop */}
            <div className="hidden md:flex md:gap-2">
              <Button variant="outline" size="sm" asChild className="flex items-center">
                <Link href="/connexion">
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
                    className="h-4 w-4 mr-1"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" x2="3" y1="12" y2="12"></line>
                  </svg>
                  {t("nav.login")}
                </Link>
              </Button>
              <Button size="sm" asChild className="flex items-center">
                <Link href="/adhesion">
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
                    className="h-4 w-4 mr-1"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <line x1="19" x2="19" y1="8" y2="14"></line>
                    <line x1="22" x2="16" y1="11" y2="11"></line>
                  </svg>
                  {t("nav.membership")}
                </Link>
              </Button>
            </div>

            {/* Language Selector - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden md:flex">
                <Button variant="outline" size="sm" className="h-8 px-2">
                  {language.toUpperCase()}
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
                    className="ml-1 h-3 w-3"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("fr")}>
                  <span className={language === "fr" ? "font-bold" : ""}>Français</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ba")}>
                  <span className={language === "ba" ? "font-bold" : ""}>Bosanski</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
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
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                  </svg>
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile menu header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-heading text-lg font-bold text-primary">Džemat Lozana</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
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
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </div>

                  {/* Mobile navigation */}
                  <div className="flex-1 overflow-auto py-4">
                    <nav className="flex flex-col px-4 space-y-1">
                      {navItems.map((item, index) =>
                        item.submenu ? (
                          <div key={index} className="space-y-1">
                            <div
                              className={`flex items-center justify-between px-3 py-3 text-base rounded-md transition-colors ${
                                isActive(item.href) ? "bg-primary/10 text-primary font-medium" : "hover:bg-primary/5"
                              }`}
                            >
                              <Link href={item.href} onClick={handleNavClick}>
                                {item.label}
                              </Link>
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
                                className="h-4 w-4"
                              >
                                <path d="m6 9 6 6 6-6"></path>
                              </svg>
                            </div>
                            <div className="pl-4 ml-2 border-l border-primary/10 space-y-1">
                              {item.submenu.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  onClick={handleNavClick}
                                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                                    isActive(subItem.href)
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "hover:bg-primary/5"
                                  }`}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={index}
                            href={item.href}
                            onClick={handleNavClick}
                            className={`flex items-center px-3 py-3 text-base rounded-md transition-colors ${
                              isActive(item.href) ? "bg-primary/10 text-primary font-medium" : "hover:bg-primary/5"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ),
                      )}
                    </nav>

                    {/* Mobile auth buttons */}
                    <div className="flex flex-col gap-2 mt-6 px-4 pt-4 border-t">
                      <Button variant="outline" asChild className="justify-start">
                        <Link href="/connexion" onClick={handleNavClick}>
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
                            className="h-4 w-4 mr-2"
                          >
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" x2="3" y1="12" y2="12"></line>
                          </svg>
                          {t("nav.login")}
                        </Link>
                      </Button>
                      <Button asChild className="justify-start">
                        <Link href="/adhesion" onClick={handleNavClick}>
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
                            className="h-4 w-4 mr-2"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <line x1="19" x2="19" y1="8" y2="14"></line>
                            <line x1="22" x2="16" y1="11" y2="11"></line>
                          </svg>
                          {t("nav.membership")}
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Mobile language selector */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant={language === "fr" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setLanguage("fr")
                          setIsMenuOpen(false)
                        }}
                      >
                        Français
                      </Button>
                      <Button
                        variant={language === "ba" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setLanguage("ba")
                          setIsMenuOpen(false)
                        }}
                      >
                        Bosanski
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
