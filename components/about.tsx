const stats = [
  { value: "120+", label: "Proyectos lanzados" },
  { value: "10", label: "Años de chispa" },
  { value: "24", label: "Premios creativos" },
  { value: "98%", label: "Clientes que repiten" },
]

const services = [
  {
    title: "Marca",
    desc: "Naming, identidad visual, sistemas de diseño y guías que hacen reconocible una marca en cualquier lugar.",
  },
  {
    title: "Marketing",
    desc: "Estrategia, campañas integradas, social y contenido que mueve a las personas a actuar.",
  },
  {
    title: "Producto",
    desc: "Webs, apps y experiencias digitales diseñadas y desarrolladas para escalar.",
  },
]

export function About() {
  return (
    <section id="estudio" className="border-t border-border px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              El estudio
            </span>
            <h2 className="mt-6 font-heading text-5xl leading-[0.9] tracking-tight md:text-7xl">
              Pocas mentes
              <br />
              haciendo el
              <br />
              trabajo de
              <span className="text-primary"> muchas.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6 text-lg leading-relaxed text-muted-foreground">
            <p className="text-pretty">
              Órbita nació para romper el modelo de las agencias gigantes y lentas.
              Somos un equipo compacto y senior que trabaja codo con codo contigo,
              sin intermediarios ni capas innecesarias.
            </p>
            <p className="text-pretty">
              Combinamos pensamiento estratégico con ejecución impecable. Lo mismo
              construimos una identidad desde cero que lanzamos una plataforma
              digital completa, siempre con la misma obsesión por el detalle.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-6 md:p-8">
              <div className="font-heading text-4xl tracking-tight text-primary md:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="bg-background p-8 md:p-10">
              <h3 className="font-heading text-3xl tracking-tight md:text-4xl">
                {service.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
