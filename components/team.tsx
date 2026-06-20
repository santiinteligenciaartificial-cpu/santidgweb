import Image from "next/image"

const team = [
  { name: "Marta Ríos", role: "Directora Creativa", image: "/team/team-1.png" },
  { name: "Leo Vargas", role: "Director de Arte", image: "/team/team-2.png" },
  { name: "Sam Cano", role: "Diseñador & Dev", image: "/team/team-3.png" },
  { name: "Irene Soto", role: "Head of Strategy", image: "/team/team-4.png" },
]

export function Team() {
  return (
    <section id="equipo" className="border-t border-border px-5 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <h2 className="font-heading text-6xl leading-none tracking-tight md:text-8xl">
            El equipo
          </h2>
          <p className="max-w-sm text-pretty text-muted-foreground">
            Sin departamentos infinitos. Solo gente con talento que firma cada
            decisión y se involucra en tu proyecto.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden border border-border bg-card grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:border-primary">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={`Retrato de ${member.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-heading text-2xl tracking-tight md:text-3xl">
                {member.name}
              </h3>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
