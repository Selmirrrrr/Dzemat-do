"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the form data to a server
    console.log("Form submitted")
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Motif subtil en arrière-plan */}
      <div className="absolute inset-0 islamic-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/5 text-primary px-4 py-2 rounded-md mb-4 font-medium">
            {t("contact.title")}
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("contact.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-border">
            <h3 className="font-heading text-2xl font-bold mb-6 text-primary">Information</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/5 rounded-md">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">{t("contact.address")}</h4>
                  <p className="text-muted-foreground">
                    123 Rue de Lausanne
                    <br />
                    1000 Lausanne
                    <br />
                    Suisse
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/5 rounded-md">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">{t("contact.phone")}</h4>
                  <p className="text-muted-foreground">+41 21 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-3 bg-primary/5 rounded-md">
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
                    className="h-6 w-6 text-primary"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">{t("contact.email")}</h4>
                  <p className="text-muted-foreground">info@dzemat-lozana.ch</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43916.92303880181!2d6.602768071889133!3d46.52285232656878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c293ecd89a7e5%3A0xd9ea5be965ee5da!2sLausanne%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1712873400000!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-sm"
              ></iframe>
            </div>
          </div>

          <div className="bg-primary rounded-lg shadow-sm p-8 text-white">
            <h3 className="font-heading text-2xl font-bold mb-6">Contact Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/90">
                  {t("contact.form.name")}
                </label>
                <Input
                  id="name"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                  placeholder={t("contact.form.name")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/90">
                  {t("contact.form.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                  placeholder={t("contact.form.email")}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/90">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white/30"
                  placeholder={t("contact.form.message")}
                />
              </div>

              <Button type="submit" className="w-full bg-white text-primary hover:bg-white/90 hover-lift">
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
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
                {t("contact.form.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
