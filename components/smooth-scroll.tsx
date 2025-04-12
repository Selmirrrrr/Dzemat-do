"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Fonction pour gérer les clics sur les liens d'ancrage
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href*="#"]')

      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href) return

      // Si c'est un lien interne avec une ancre
      if (href.startsWith("/#") || href.startsWith("#")) {
        e.preventDefault()

        const targetId = href.includes("/#") ? href.split("/#")[1] : href.replace("#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Défilement fluide vers l'élément cible
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Ajustement pour la hauteur du header
            behavior: "smooth",
          })

          // Mettre à jour l'URL sans recharger la page
          if (history.pushState) {
            history.pushState(null, "", href.includes("/#") ? href : `/#${targetId}`)
          }
        }
      }
    }

    // Ajouter l'écouteur d'événements
    document.addEventListener("click", handleAnchorClick)

    // Gérer le défilement initial si l'URL contient une ancre
    const handleInitialScroll = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          setTimeout(() => {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            })
          }, 100)
        }
      }
    }

    handleInitialScroll()

    // Nettoyer l'écouteur d'événements
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
