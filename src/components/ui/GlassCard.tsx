"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className={`rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      {children}
    </motion.div>
  )
}
