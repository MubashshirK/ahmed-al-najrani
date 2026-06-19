"use client"

import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from "react"
import { motion } from "framer-motion"
import { NAV_LINKS, CLIENT } from "@/lib/constants"

export default function Footer() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [isInteracting, setIsInteracting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setIsInteracting(true)
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect && e.touches[0]) {
      setIsInteracting(true)
      setPos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      })
    }
  }

  const handleMouseLeave = () => {
    setIsInteracting(false)
    setPos({ x: -9999, y: -9999 })
  }

  const handleTouchEnd = () => {
    setIsInteracting(false)
  }

  // Automatic sweeping glow animation on touch/mobile devices
  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)

    if (!isTouchDevice) return

    let angle = 0
    const interval = setInterval(() => {
      // Pause automatic sweep if the user is currently touching/interacting
      if (isInteracting) return

      const rect = ref.current?.getBoundingClientRect()
      if (rect) {
        const width = rect.width
        const height = rect.height
        // Calculate a gentle horizontal oscillation sweep
        const sweepX = (Math.sin(angle) * 0.45 + 0.5) * width
        const sweepY = height / 2
        setPos({ x: sweepX, y: sweepY })
        angle += 0.025
      }
    }, 20)

    return () => clearInterval(interval)
  }, [isInteracting])

  const text = CLIENT.name

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      {/* Subtle bottom-centered radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--warm)_0%,transparent_70%)] opacity-[0.06] pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Interactive flashlight text container with delayed scroll-in viewport animation */}
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative cursor-default select-none text-center font-heading text-[clamp(2.5rem,8vw,8rem)] font-black leading-none tracking-tighter py-4"
        >
          {/* Muted background text */}
          <p className="text-warm/15 dark:text-warm/10" aria-hidden="true">
            {text}
          </p>
          {/* Highlighted text revealed by mask */}
          <p
            className="absolute inset-0 py-4 text-text-primary"
            style={{
              maskImage: `radial-gradient(180px at ${pos.x}px ${pos.y}px, black 25%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(180px at ${pos.x}px ${pos.y}px, black 25%, transparent 100%)`,
            }}
          >
            {text}
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-6 md:mt-16">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="group relative text-xs text-text-muted/60 transition-colors duration-300 hover:text-text-primary"
              >
                {label}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Credits and Copyright */}
          <div className="flex items-center gap-4 text-[10px] text-text-muted/40">
            <span>&copy; {new Date().getFullYear()} {CLIENT.name.split(" ")[0]}</span>
            <span className="h-3 w-px bg-border" />
            <span>Built with Next.js & Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
