const socials = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 pt-16 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-start justify-between gap-8 pb-12">
          <div className="max-w-sm">
            <p className="font-heading text-2xl tracking-tight">
              Pocas mentes haciendo el trabajo de muchas.<span className="text-primary">™</span>
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} VOLTA® Studio. Todos los derechos reservados.</span>
          <span>Madrid — Worldwide</span>
        </div>
      </div>

      <div className="-mb-[2vw] overflow-hidden">
        <h2 className="font-heading text-[24vw] leading-[0.75] tracking-tight text-foreground">
          VOLTA<span className="text-primary">®</span>
        </h2>
      </div>
    </footer>
  )
}
