"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function CommitteeOrganigram() {
  const { language } = useLanguage()
  const [orgTitle, setOrgTitle] = useState("")

  useEffect(() => {
    if (language === "fr") {
      setOrgTitle("Organigramme du Comité")
    } else {
      setOrgTitle("Organigram Odbora")
    }
  }, [language])

  const committeeStructure = [
    // Première ligne: Président et Imam
    {
      id: "president",
      title: language === "fr" ? "Président" : "Predsjednik",
      name: "Emir Suljagić",
    },
    {
      id: "imam",
      title: "Imam",
      name: "Mustafa Cerić",
    },
    // Deuxième ligne: Vice-président, Secrétaire, Secrétaire adjoint
    {
      id: "vice-president",
      title: language === "fr" ? "Vice-Président" : "Potpredsjednik",
      name: "Selmir Hajruli",
    },
    {
      id: "secretary",
      title: language === "fr" ? "Secrétaire" : "Sekretar",
      name: "Hasan Ahmetović",
    },
    {
      id: "assistant-secretary",
      title: language === "fr" ? "Secrétaire adjoint" : "Pomoćnik sekretara",
      name: "Mirfet Orić",
    },
    // Troisième ligne: Caissier, Caissier adjoint, Responsable technique
    {
      id: "treasurer",
      title: language === "fr" ? "Caissier" : "Blagajnik",
      name: "Hamed Salkić",
    },
    {
      id: "assistant-treasurer",
      title: language === "fr" ? "Caissier adjoint" : "Pomoćnik blagajnika",
      name: "Mirzet Hrnjić",
    },
    {
      id: "technical",
      title: language === "fr" ? "Responsable technique" : "Tehnički odgovorni",
      name: "Ševko Bećirović",
    },
  ]

  // Diviser les membres en rangées
  const firstRow = committeeStructure.slice(0, 2) // Président et Imam
  const secondRow = committeeStructure.slice(2, 5) // Vice-président, Secrétaire, Secrétaire adjoint
  const thirdRow = committeeStructure.slice(5, 8) // Caissier, Caissier adjoint, Responsable technique

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold mb-8 text-center">{orgTitle}</h2>

      <div className="space-y-12">
        {/* Première rangée: Président et Imam */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {firstRow.map((member) => (
            <OrganigramCard key={member.id} member={member} />
          ))}
        </div>

        {/* Deuxième rangée: Vice-président, Secrétaire, Secrétaire adjoint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondRow.map((member) => (
            <OrganigramCard key={member.id} member={member} />
          ))}
        </div>

        {/* Troisième rangée: Caissier, Caissier adjoint, Responsable technique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {thirdRow.map((member) => (
            <OrganigramCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}

function OrganigramCard({ member }: { member: any }) {
  return (
    <Card className="w-full max-w-[250px] mx-auto relative z-10 bg-white">
      <CardContent className="p-4 flex flex-col items-center">
        <h3 className="font-heading font-bold text-lg text-center">{member.name}</h3>
        <p className="text-muted-foreground text-center">{member.title}</p>
      </CardContent>
    </Card>
  )
}
