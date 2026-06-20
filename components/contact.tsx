"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contacto"
      className="border-t border-border px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contacto
            </span>
            <h2 className="mt-6 font-heading text-6xl leading-[0.85] tracking-tight md:text-8xl">
              ¿Listos para
              <span className="text-primary"> encender</span> algo?
            </h2>
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  Nuevos proyectos
                </p>
                <a
                  href="mailto:hola@orbita.studio"
                  className="font-heading text-2xl tracking-tight underline-offset-4 hover:underline md:text-3xl"
                >
                  hola@orbita.studio
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  Estudio
                </p>
                <p className="font-heading text-2xl tracking-tight md:text-3xl">
                  Calle Mayor 24, Madrid
                </p>
              </div>
            </div>
          </div>

          {sent ? (
            <div className="flex flex-col items-start justify-center border border-primary bg-primary/10 p-10">
              <h3 className="font-heading text-4xl tracking-tight text-primary">
                ¡Mensaje enviado!
              </h3>
              <p className="mt-4 text-muted-foreground">
                Gracias por escribirnos. Te responderemos en menos de 24 horas
                hábiles.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nombre" name="name" placeholder="Tu nombre" />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                />
              </div>
              <Field
                label="Empresa"
                name="company"
                placeholder="Nombre de tu marca"
                required={false}
              />
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm uppercase tracking-wider text-muted-foreground"
                >
                  Cuéntanos
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="¿Qué tienes en mente?"
                  className="resize-none border-b border-border bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="group mt-2 inline-flex items-center justify-between gap-4 bg-primary px-6 py-5 text-primary-foreground transition-opacity hover:opacity-90"
              >
                <span className="font-heading text-2xl tracking-tight">
                  Enviar mensaje
                </span>
                <ArrowUpRight className="size-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="border-b border-border bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  )
}
