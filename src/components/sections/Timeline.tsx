 "use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Brain, GraduationCap, Users } from "lucide-react"
import { EXPERIENCES } from "@/lib/constants"

import { Particles } from "@/components/three/Particles"
import { useTheme } from "@/components/ui/ThemeProvider"

function TimelineNode({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCES)[0]
  index: number
}) {
  const isEven = index % 2 === 0

  const nodeConfig = [
    { icon: Briefcase, color: "var(--tint-blue)" },
    { icon: Brain, color: "var(--tint-green)" },
    { icon: GraduationCap, color: "var(--tint-amber)" },
  ][index % 3]

  const Icon = nodeConfig.icon
  const color = nodeConfig.color
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative pb-12 pl-14 md:pl-0 group ${
        isEven ? "md:pl-12" : "md:pr-12"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute top-2.5 md:top-8 z-10 ${
          isEven
            ? "left-0 md:left-0 md:-translate-x-1/2"
            : "left-0 md:left-auto md:right-0 md:translate-x-1/2"
        }`}
      >
        <div
          className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 bg-bg transition-all duration-500 overflow-hidden"
          style={{
            borderColor: color,
            boxShadow: `0 0 10px ${color}`,
            transform: hovered ? "scale(1.15)" : "scale(1)",
          } as React.CSSProperties}
        >
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-500"
            style={{ backgroundColor: color, opacity: hovered ? 1 : 0 }}
          />
          <Icon
            size={15}
            className="relative z-10 transition-colors duration-500"
            style={{ color: hovered ? "#fff" : color }}
          />
        </div>
      </div>

      <motion.div
        whileHover={{
          y: -4,
          scale: 1.015,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        <div
          className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-500 scale-x-50 group-hover:scale-x-100 ${
            isEven ? "origin-left" : "origin-right"
          }`}
          style={{
            backgroundImage: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          }}
        />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-[10px] font-medium text-accent">
          {experience.period}
        </span>
        <h3 className="mt-3 font-heading text-lg font-bold text-text-primary">
          {experience.role}
        </h3>
        <p className="mt-1 text-sm font-medium text-text-primary/70">{experience.organization}</p>
        <p className="mt-3 text-base leading-relaxed text-text-primary/80">
          {experience.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="relative py-24">
      <Particles
        className="absolute inset-0 h-full w-full"
        quantity={150}
        color={theme === "dark" ? "#ffffff" : "#a08030"}
        staticity={30}
        ease={80}
        size={0.6}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, var(--warm) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="section-heading-title">Experience</h2>
          <div className="section-heading-line" />
        </motion.div>

        <div ref={ref} className="relative">
          <div className="absolute left-[18px] top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-accent to-accent/40"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="relative space-y-0 md:space-y-0">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.role}
                className={`relative flex ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div className="md:w-1/2">
                  <TimelineNode experience={exp} index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
