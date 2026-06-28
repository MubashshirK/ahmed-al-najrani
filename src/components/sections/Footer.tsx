"use client"

import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from "react"
import { motion } from "framer-motion"
import { NAV_LINKS, CLIENT } from "@/lib/constants"
import { Particles } from "@/components/three/Particles"
import { useTheme } from "@/components/ui/ThemeProvider"

export default function Footer() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

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

  // Detect touch device and set initial centered position
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    setIsTouchDevice(isTouch)
    if (isTouch && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPos({ x: rect.width / 2, y: rect.height / 2 })
    }
  }, [])

  // Smooth auto-sweep using requestAnimationFrame on touch devices
  useEffect(() => {
    if (!isTouchDevice) return

    let angle = 0
    let rafId: number

    const sweep = () => {
      if (isTouchDevice && !isInteracting && ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const sweepX = (Math.sin(angle) * 0.4 + 0.5) * rect.width
        const sweepY = rect.height / 2
        setPos({ x: sweepX, y: sweepY })
        angle += 0.004
      }
      rafId = requestAnimationFrame(sweep)
    }

    rafId = requestAnimationFrame(sweep)
    return () => cancelAnimationFrame(rafId)
  }, [isTouchDevice, isInteracting])

  const text = CLIENT.name

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      <Particles
        className="absolute inset-0 h-full w-full"
        quantity={80}
        color={theme === "dark" ? "#ffffff" : "#a08030"}
        staticity={30}
        ease={80}
        size={0.5}
      />
      {/* Subtle bottom-centered radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--warm)_0%,transparent_70%)] opacity-[0.06] pointer-events-none" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a040]/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
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
          className="relative cursor-default select-none text-center font-heading text-[clamp(2rem,6vw,6rem)] font-black leading-none tracking-tighter py-4 max-w-4xl mx-auto"
        >
          {/* Muted background text */}
          <p className="text-warm/15 dark:text-warm/10" aria-hidden="true">
            {text}
          </p>
          {/* Highlighted text revealed by mask */}
          <p
            className="absolute inset-0 py-4"
            style={{
              maskImage: `radial-gradient(${isTouchDevice ? 240 : 160}px at ${pos.x}px ${pos.y}px, black 25%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(${isTouchDevice ? 240 : 160}px at ${pos.x}px ${pos.y}px, black 25%, transparent 100%)`,
              color: "#e8c860",
              textShadow: "0 1px 0 #a08030, 0 2px 0 #908030, 0 3px 0 #8a7020, 0 4px 6px rgba(0,0,0,0.4), 0 0 20px rgba(232,200,96,0.3)",
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
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#c8a040] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Credits and Copyright */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-[10px] text-text-muted/40">
            <span className="justify-self-end">&copy; {new Date().getFullYear()} {CLIENT.name}</span>
            <span className="h-3 w-px bg-border" />
            <a href="https://mubashshir.vercel.app" target="_blank" rel="noopener noreferrer" className="justify-self-start hover:text-text-primary transition-colors duration-300">Design & Built by Mubashshir Khan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
