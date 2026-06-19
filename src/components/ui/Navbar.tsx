"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { NAV_LINKS } from "@/lib/constants"
import { useTheme } from "./ThemeProvider"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
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
      {/* Mobile Navbar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-2xl transition-colors duration-300 md:hidden ${
          scrolled ? "bg-surface-elevated/95 border-b border-border" : "bg-transparent"
        }`}
      >
        <button onClick={() => scrollTo("#hero")} className="font-heading text-lg font-bold tracking-tight text-text-primary">
          A<span className="text-text-muted">.</span>S<span className="text-text-muted">.</span>N
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-full border border-border p-2 text-text-muted transition-colors hover:text-text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-text-muted transition-colors hover:text-text-primary"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Desktop Navbar */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 hidden justify-center md:flex">
        <motion.nav
          animate={{
            y: scrolled ? 16 : 0,
            borderRadius: scrolled ? 100 : 0,
            maxWidth: scrolled ? 640 : 1440,
            paddingTop: scrolled ? 6 : 16,
            paddingBottom: scrolled ? 6 : 16,
            paddingLeft: scrolled ? 8 : 24,
            paddingRight: scrolled ? 8 : 24,
            backgroundColor: scrolled ? "var(--surface-elevated)" : "transparent",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto flex w-full items-center justify-between gap-1 backdrop-blur-2xl"
          style={{
            border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
            boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <button
            onClick={() => scrollTo("#hero")}
            className={`font-heading font-bold tracking-tight text-text-primary transition-all duration-300 ${
              scrolled ? "px-2 text-sm" : "px-0 text-lg"
            }`}
          >
            A<span className="text-text-muted">.</span>S<span className="text-text-muted">.</span>N
          </button>

          <div className="flex items-center">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`transition-all duration-300 whitespace-nowrap ${
                  scrolled
                    ? "rounded-full px-3 py-1.5 text-xs font-medium"
                    : "relative px-3 py-1 text-sm tracking-wide"
                } ${
                  activeSection === href.slice(1)
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
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              className={`rounded-full border border-border text-text-muted transition-all duration-300 hover:text-text-primary ${
                scrolled ? "p-1.5" : "p-2"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={scrolled ? 14 : 16} /> : <Moon size={scrolled ? 14 : 16} />}
            </button>
          </div>
        </motion.nav>
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
                  className={`rounded-xl px-4 py-3 text-left text-sm transition-all ${
                    activeSection === href.slice(1)
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
