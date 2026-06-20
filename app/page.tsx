import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { Work } from "@/components/work"
import { About } from "@/components/about"
import { Team } from "@/components/team"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { HandScrollControl } from "@/components/hand-scroll-control"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <div className="mt-20 md:mt-28">
          <Marquee />
        </div>
        <Work />
        <About />
        <Team />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
