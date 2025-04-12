"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white pt-16 pb-8 relative overflow-hidden">
      {/* Motif subtil en arrière-plan */}
      <div className="absolute inset-0 islamic-pattern opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-6 text-white">Džemat Lozana</h3>
            <p className="mb-6 text-gray-300">Association Bosniaque de Lausanne</p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-md transition-colors duration-300">
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-md transition-colors duration-300">
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
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-md transition-colors duration-300">
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="mailto:info@dzemat-lozana.ch"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-md transition-colors duration-300"
              >
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
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold mb-6 text-white">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#home"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="bg-white/20 w-2 h-2 rounded-full mr-2"></span>
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="bg-white/20 w-2 h-2 rounded-full mr-2"></span>
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="bg-white/20 w-2 h-2 rounded-full mr-2"></span>
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#prayer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="bg-white/20 w-2 h-2 rounded-full mr-2"></span>
                  {t("nav.prayer")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#events"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="bg-white/20 w-2 h-2 rounded-full mr-2"></span>
                  {t("nav.events")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="bg-white/20 w-2 h-2 rounded-full mr-2"></span>
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/comite"
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="bg-white/20 w-2 h-2 rounded-full mr-2"></span>
                  {t("nav.committee")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold mb-6 text-white">Contact</h3>
            <address className="not-italic text-gray-300 space-y-3">
              <p className="flex items-start">
                <span className="bg-white/10 p-1 rounded mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>
                  123 Rue de Lausanne
                  <br />
                  1000 Lausanne
                  <br />
                  Suisse
                </span>
              </p>
              <p className="flex items-center">
                <span className="bg-white/10 p-1 rounded mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                +41 21 123 45 67
              </p>
              <p className="flex items-center">
                <span className="bg-white/10 p-1 rounded mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                info@dzemat-lozana.ch
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Džemat Lozana. {t("footer.rights")}
          </p>
          <p className="mt-2 text-sm text-gray-400 flex items-center justify-center">
            {t("footer.design")}
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
              className="h-4 w-4 mx-1 text-secondary"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            for the Bosnian community
          </p>
        </div>
      </div>
    </footer>
  )
}
