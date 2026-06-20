import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Nébula Drinks",
    category: "Branding · Packaging",
    year: "2025",
    image: "/work/work-1.png",
  },
  {
    title: "Atlas Wear",
    category: "Campaña · Dirección de arte",
    year: "2024",
    image: "/work/work-2.png",
  },
  {
    title: "Pulse OS",
    category: "Producto digital · Web",
    year: "2025",
    image: "/work/work-3.png",
  },
  {
    title: "Forma Studio",
    category: "Identidad · Motion",
    year: "2024",
    image: "/work/work-4.png",
  },
]

export function Work() {
  return (
    <section id="trabajos" className="px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <h2 className="font-heading text-6xl leading-none tracking-tight md:text-8xl">
            Trabajos
            <br />
            <span className="text-primary">seleccionados</span>
          </h2>
          <p className="max-w-sm text-pretty text-muted-foreground">
            Una muestra de las marcas que hemos ayudado a encender. Cada proyecto,
            una colaboración de principio a fin.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href="#contacto"
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`Proyecto ${project.title}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 flex size-12 items-center justify-center bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="size-6" />
                </span>
                <span className="absolute left-4 top-4 bg-foreground px-2 py-1 font-mono text-xs text-background">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h3 className="font-heading text-3xl tracking-tight md:text-4xl">
                  {project.title}
                </h3>
                <span className="font-mono text-sm text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <p className="mt-3 text-sm uppercase tracking-wider text-muted-foreground">
                {project.category}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
