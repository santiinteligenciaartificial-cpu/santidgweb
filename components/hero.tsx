import { ArrowDownRight } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span className="inline-block size-2 bg-primary" />
          Agencia creativa full-service · Est. 2015
        </div>

        <h1 className="mt-8 font-heading text-[18vw] leading-[0.82] tracking-tight md:text-[14vw] lg:text-[12vw]">
          IDEAS
          <br />
          QUE
          <span className="text-primary"> CHISPEAN</span>
        </h1>

        <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[1.5fr_1fr] md:items-end">
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Somos Órbita, un colectivo de estrategas, diseñadores y desarrolladores.
            Convertimos marcas en movimientos: branding, campañas y producto digital
            bajo un mismo techo.
          </p>
          <a
            href="#trabajos"
            className="group inline-flex items-center justify-between gap-4 bg-foreground px-6 py-5 text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <span className="font-heading text-2xl tracking-tight">Ver trabajos</span>
            <ArrowDownRight className="size-7 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
