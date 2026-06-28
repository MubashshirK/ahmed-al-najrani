"use client"

import { motion } from "framer-motion"
import { CLIENT } from "@/lib/constants"
import { sectionLabel, fadeInUp, staggerContainer } from "@/lib/animations"

const skillRadar = [
  { domain: "AI Architecture", level: 95 },
  { domain: "Data Analytics", level: 90 },
  { domain: "Leadership", level: 92 },
  { domain: "Generative AI", level: 95 },
  { domain: "AI Strategy", level: 93 },
  { domain: "Consulting", level: 88 },
]

function RadarChart() {
  const cx = 240
  const cy = 150
  const r = 108
  const levels = 5
  const angleStep = (Math.PI * 2) / skillRadar.length

  const gridLines = Array.from({ length: levels }, (_, i) => {
    const radius = (r / levels) * (i + 1)
    const points = skillRadar
      .map((_, j) => {
        const angle = angleStep * j - Math.PI / 2
        return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`
      })
      .join(" ")
    return <polygon key={i} points={points} fill="none" stroke="var(--border)" strokeWidth="1" />
  })

  const dataPoints = skillRadar.map((skill, i) => {
    const angle = angleStep * i - Math.PI / 2
    const radius = (skill.level / 100) * r
    return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`
  })

  const labels = skillRadar.map((skill, i) => {
    const angle = angleStep * i - Math.PI / 2
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    
    // Determine text-anchor dynamically to prevent horizontal text overflow
    let textAnchor: "start" | "end" | "middle" = "middle"
    if (cos > 0.1) {
      textAnchor = "start"
    } else if (cos < -0.1) {
      textAnchor = "end"
    }

    // Determine baseline alignment dynamically to prevent vertical text overflow
    let dominantBaseline: "auto" | "hanging" | "middle" = "middle"
    if (sin < -0.9) {
      dominantBaseline = "auto" // Top label
    } else if (sin > 0.9) {
      dominantBaseline = "hanging" // Bottom label
    }

    // Label distance from chart border
    const labelDistance = r + 13
    const lx = cx + labelDistance * cos
    const ly = cy + labelDistance * sin

    return (
      <text
        key={skill.domain}
        x={lx}
        y={ly}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        className="fill-text-muted text-[10px] font-medium transition-colors duration-300"
      >
        {skill.domain}
      </text>
    )
  })

  const axisLines = skillRadar.map((_, i) => {
    const angle = angleStep * i - Math.PI / 2
    const x2 = cx + r * Math.cos(angle)
    const y2 = cy + r * Math.sin(angle)
    return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="1" opacity={0.5} />
  })

  return (
    <svg viewBox="0 0 480 300" className="h-full w-full">
      <defs>
        <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--tint-blue)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--tint-green)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {axisLines}
      {gridLines}
      <polygon points={dataPoints.join(" ")} fill="url(#radarFill)" stroke="var(--tint-blue)" strokeWidth="1.5" strokeOpacity="0.5" />
      {labels}
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at 30% 40%, var(--warm) 0%, transparent 60%)" }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={sectionLabel}
        >
          {"// about_me"}
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg"
            >
              With over 35 years of international experience, I have led enterprise technology modernization, AI strategy, platform architecture, analytics, ERP transformation, and digital innovation initiatives across Saudi Arabia, GCC, and India. I bring proven expertise in designing and operationalizing{" "}
              <span className="text-accent font-medium">enterprise AI solutions</span>,
              Generative AI platforms, AI agents, and LLM-powered applications. My work focuses on translating AI capabilities into{" "}
              <span className="text-accent font-medium">operational efficiency, ROI, and strategic value</span>{" "}
              for organizations. Skilled in AI Solution Engineering, AI Platform Architecture, Enterprise Integration, AI Governance, Machine Learning, Predictive Analytics, Cloud-enabled AI Ecosystems, Agentic AI Workflows, and Enterprise Modernization Programs.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-3">
              {CLIENT.languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent"
                >
                  {lang}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center lg:col-span-2"
          >
            <div className="w-full max-w-[480px] aspect-[1.6] flex items-center justify-center">
              <RadarChart />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
