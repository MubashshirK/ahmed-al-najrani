import Hero from "@/components/sections/Hero"
import Stats from "@/components/sections/Stats"
import About from "@/components/sections/About"
import Education from "@/components/sections/Education"
import Expertise from "@/components/sections/Expertise"
import Timeline from "@/components/sections/Timeline"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Timeline />
      <Education />
      <Expertise />
      <Contact />
      <Footer />
    </main>
  )
}
