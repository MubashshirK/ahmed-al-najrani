"use client"

import { motion } from "framer-motion"

interface SkillPillProps {
  name: string
  index: number
}

export default function SkillPill({ name, index }: SkillPillProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.08 }}
      className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-primary/75 backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:text-accent hover:shadow-sm"
    >
      {name}
    </motion.span>
  )
}
