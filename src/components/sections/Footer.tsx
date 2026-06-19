"use client"

import { useState, useRef, type MouseEvent } from "react"
import { NAV_LINKS, CLIENT } from "@/lib/constants"

export default function Footer() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const ref = useRef<HTMLDivElement>(null)

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  const text = CLIENT.name.split(" ").join("\u00A0")

  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPos({ x: -9999, y: -9999 })}
          className="relative cursor-default select-none text-center font-heading text-[clamp(3rem,12vw,10rem)] font-black leading-none tracking-tighter"
        >
          <p className="text-warm/45" aria-hidden="true">
            {text}
          </p>
          <p
            className="absolute inset-0 text-text-primary/30"
            style={{
              maskImage: `radial-gradient(200px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(200px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%)`,
            }}
          >
            {text}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6 md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-xs text-text-muted/60 transition-colors hover:text-accent"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[10px] text-text-muted/30">
            <span>&copy; {new Date().getFullYear()} {CLIENT.name.split(" ")[0]}</span>
            <span className="h-3 w-px bg-border" />
            <span>Built with Next.js & Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
