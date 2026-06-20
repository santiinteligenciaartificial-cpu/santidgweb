const items = [
  "Branding",
  "Estrategia",
  "Dirección de arte",
  "Campañas",
  "Diseño web",
  "Desarrollo",
  "Motion",
  "Social",
  "Packaging",
  "Contenido",
]

export function Marquee() {
  const row = [...items, ...items]
  return (
    <section className="overflow-hidden border-y border-border bg-primary py-5 text-primary-foreground">
      <div className="flex w-max animate-marquee">
        {row.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-6 font-heading text-3xl tracking-tight md:text-5xl">
              {item}
            </span>
            <span className="text-2xl md:text-4xl">✳</span>
          </div>
        ))}
      </div>
    </section>
  )
}
