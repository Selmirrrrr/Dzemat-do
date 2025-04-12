import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import PrayerTimes from "@/components/prayer-times"
import Events from "@/components/events"
import Contact from "@/components/contact"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Services />
      </Suspense>
      <PrayerTimes />
      <Suspense fallback={<Loading />}>
        <Events />
      </Suspense>
      <Contact />
    </>
  )
}
