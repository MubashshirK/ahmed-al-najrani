"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  label: string
  delay?: number
}

export default function AnimatedCounter({ value, suffix = "", label, delay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = Date.now() - delay * 1000

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    const timeout = setTimeout(() => requestAnimationFrame(tick), delay * 1000)
    return () => clearTimeout(timeout)
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <span
        className="font-heading text-5xl font-bold"
        style={{
          background: "linear-gradient(315deg, #6B5A1E 0%, #A08035 30%, #C9A84C 50%, #A08035 70%, #6B5A1E 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 2px 4px rgba(139,105,20,0.5))",
        }}
      >
        {count}
        {suffix}
      </span>
      <span className="text-center text-sm text-text-muted">{label}</span>
    </motion.div>
  )
}
