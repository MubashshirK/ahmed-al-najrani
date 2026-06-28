"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // Transform scroll progress (0 to 1) into SVG strokeDashoffset (138.23 to 0)
  // Circumference = 2 * PI * r = 2 * 3.14159 * 22 = 138.23
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [138.23, 0])

  useEffect(() => {
    const handleScroll = () => {
      // Toggle button visibility based on scroll depth
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Run once on mount to handle initial refreshed state
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-elevated/80 text-text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-surface-elevated hover:text-accent focus:outline-none"
          aria-label="Scroll to top"
        >
          {/* Progress Ring */}
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
            {/* Background Circle */}
            <circle
              cx="24"
              cy="24"
              r="22"
              className="stroke-border/30 fill-none"
              strokeWidth="2"
            />
            {/* Animated Active Progress Circle */}
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              className="fill-none"
              strokeWidth="2"
              stroke="#A08035"
              strokeDasharray="138.23"
              strokeLinecap="round"
              style={{ strokeDashoffset }}
            />
          </svg>
          {/* Up Arrow Icon */}
          <ArrowUp size={16} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
