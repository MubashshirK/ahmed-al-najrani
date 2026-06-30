"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, Sun, Moon } from "lucide-react"
import { NAV_LINKS } from "@/lib/constants"
import { useTheme } from "./ThemeProvider"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, toggle } = useTheme()

  const mobileBgScrolled = theme === "dark" ? "rgba(30,36,50,0.8)" : "rgba(255,255,255,0.8)"
  const mobileBgDefault = theme === "dark" ? "rgba(30,36,50,0.6)" : "rgba(255,255,255,0.6)"
  const mobileBorder = theme === "dark" ? "rgba(38,45,62,0.6)" : "rgba(229,229,229,0.6)"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Single fixed container for both mobile and desktop navs */}
      <div className="fixed left-0 right-0 top-0 z-50">
        {/* Mobile Navbar */}
        <div className="pointer-events-none flex justify-center md:hidden">
          <motion.nav
            animate={{ y: scrolled ? 12 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-auto flex w-full items-center justify-between gap-1 backdrop-blur-xl"
            style={{
              borderRadius: scrolled ? 100 : 0,
              paddingTop: scrolled ? 6 : 12,
              paddingBottom: scrolled ? 6 : 12,
              marginLeft: scrolled ? 60 : 0,
              marginRight: scrolled ? 60 : 0,
              paddingLeft: scrolled ? 10 : 20,
              paddingRight: scrolled ? 10 : 20,
              backgroundColor: scrolled ? mobileBgScrolled : mobileBgDefault,
              border: scrolled ? `1px solid ${mobileBorder}` : "1px solid transparent",
              boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
              transition: "border-radius 0.4s cubic-bezier(0.25,0.1,0.25,1), padding 0.4s cubic-bezier(0.25,0.1,0.25,1), margin 0.4s cubic-bezier(0.25,0.1,0.25,1), background-color 0.4s cubic-bezier(0.25,0.1,0.25,1), border-color 0.4s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.4s cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 min-w-0">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
                <Image src="/AITexNix.webp" alt="AITekNix" fill sizes="32px" className="object-contain" />
              </div>
              <span className={`font-heading font-semibold tracking-tight text-text-primary whitespace-nowrap transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>
                Dr. Moka Akhtar - Profile
              </span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggle}
                className="rounded-full p-2 text-text-muted transition-colors hover:text-text-primary"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-full p-2 text-text-muted transition-colors hover:text-text-primary"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </motion.nav>
        </div>

        {/* Desktop Navbar */}
        <div className="pointer-events-none hidden justify-center md:flex">
          <motion.nav
            animate={{ y: scrolled ? 16 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-auto flex w-full items-center justify-between gap-1 backdrop-blur-2xl"
            style={{
              borderRadius: scrolled ? 100 : 0,
              maxWidth: scrolled ? 860 : 1440,
              paddingTop: scrolled ? 6 : 16,
              paddingBottom: scrolled ? 6 : 16,
              paddingLeft: scrolled ? 8 : 24,
              paddingRight: scrolled ? 8 : 24,
              backgroundColor: scrolled ? "var(--surface-elevated)" : "transparent",
              border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
              boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.1)" : "none",
              transition: "border-radius 0.4s cubic-bezier(0.25,0.1,0.25,1), max-width 0.4s cubic-bezier(0.25,0.1,0.25,1), padding 0.4s cubic-bezier(0.25,0.1,0.25,1), background-color 0.4s cubic-bezier(0.25,0.1,0.25,1), border-color 0.4s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.4s cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            <button
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-2 shrink-0 min-w-0"
            >
              <div
                className="relative shrink-0 overflow-hidden rounded-md"
                style={{
                  height: scrolled ? 0 : 40,
                  width: scrolled ? 0 : 40,
                  opacity: scrolled ? 0 : 1,
                  transition: "all 0.35s cubic-bezier(0.25,0.1,0.25,1)",
                }}
              >
                <Image src="/AITexNix.webp" alt="AITekNix" fill sizes="40px" className="object-contain" />
              </div>
              <span className={`font-heading font-semibold tracking-tight text-text-primary whitespace-nowrap transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>
                Dr. Moka Akhtar - Profile
              </span>
            </button>

            <div className="flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`transition-all duration-300 whitespace-nowrap ${scrolled
                    ? "rounded-full px-3.5 py-1.5 text-sm font-medium"
                    : "relative px-3 py-1 text-base tracking-wide"
                    } ${activeSection === href.slice(1)
                      ? scrolled
                        ? "bg-accent text-text-inverse"
                        : "text-accent"
                      : "text-text-muted hover:text-text-primary"
                    }`}
                >
                  {label}
                  {!scrolled && activeSection === href.slice(1) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-accent"
                    />
                  )}
                </button>
              ))}
              <button
                onClick={toggle}
                className={`rounded-full border border-border text-text-muted transition-all duration-300 hover:text-text-primary ${scrolled ? "p-1.5" : "p-2"
                  }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={scrolled ? 14 : 16} /> : <Moon size={scrolled ? 14 : 16} />}
              </button>
            </div>
          </motion.nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-4 right-4 top-20 z-40 rounded-2xl border border-border bg-surface-elevated/95 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className={`rounded-xl px-4 py-3 text-left text-sm transition-all ${activeSection === href.slice(1)
                    ? "bg-accent text-text-inverse font-medium"
                    : "text-text-muted hover:bg-surface hover:text-text-primary"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
