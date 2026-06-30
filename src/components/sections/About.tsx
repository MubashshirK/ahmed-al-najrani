"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CLIENT } from "@/lib/constants"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Brain, BarChart3, Users, Lightbulb, Shield, Monitor, BookOpen, TrendingUp } from "lucide-react"

const skillRadar = [
  { domain: "AI Architecture", level: 95, color: "#60d5fa", icon: Brain },
  { domain: "Data Analytics", level: 90, color: "#a78bfa", icon: BarChart3 },
  { domain: "Leadership", level: 96, color: "#f97316", icon: Users },
  { domain: "Generative AI", level: 92, color: "#34d399", icon: Lightbulb },
  { domain: "Research & Dev", level: 88, color: "#f472b6", icon: BookOpen },
  { domain: "AI Strategy", level: 93, color: "#c084fc", icon: Shield },
  { domain: "Consulting", level: 91, color: "#facc15", icon: TrendingUp },
  { domain: "Education & Tech", level: 97, color: "#4ade80", icon: Monitor },
]

function RadarChart() {
  const [hovered, setHovered] = useState<number | null>(null)
  const cx = 375
  const cy = 375
  const r = 390
  const levels = 5
  const count = skillRadar.length
  const angleStep = (Math.PI * 2) / count

  const getVertex = (level: number, i: number) => {
    const angle = angleStep * i - Math.PI / 2
    const radius = (level / 100) * r
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
  }

  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const radius = (r / levels) * (i + 1)
    const points = skillRadar
      .map((_, j) => {
        const angle = angleStep * j - Math.PI / 2
        return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`
      })
      .join(" ")
    return (
      <polygon
        key={i}
        points={points}
        fill="none"
        stroke="rgba(100,200,255,0.08)"
        strokeWidth="1.4"
      />
    )
  })

  const dataPointStrings = skillRadar.map((skill, i) => {
    const v = getVertex(skill.level, i)
    return `${v.x},${v.y}`
  })

  const axisLines = skillRadar.map((skill, i) => {
    const angle = angleStep * i - Math.PI / 2
    const x2 = cx + r * Math.cos(angle)
    const y2 = cy + r * Math.sin(angle)
    const isHovered = hovered === i
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={x2}
        y2={y2}
        stroke={isHovered ? skill.color : "rgba(100,200,255,0.06)"}
        strokeWidth={isHovered ? 1.5 : 0.8}
        opacity={isHovered ? 0.6 : 1}
        style={{ transition: "all 0.3s ease" }}
      />
    )
  })

  const dots = skillRadar.map((skill, i) => {
    const v = getVertex(skill.level, i)
    const isHovered = hovered === i
    return (
      <g
        key={`dot-${i}`}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: "pointer" }}
      >
        <circle
          cx={v.x}
          cy={v.y}
        r={isHovered ? 40 : 17}
        fill={skill.color}
        opacity={isHovered ? 0.2 : 0.25}
        style={{ transition: "all 0.3s ease" }}
      />
      <circle
        cx={v.x}
        cy={v.y}
        r={isHovered ? 17 : 9}
        fill={skill.color}
        style={{ transition: "all 0.3s ease" }}
      />
      <circle cx={v.x} cy={v.y} r={3.5} fill="#fff" />
      </g>
    )
  })

  const percentages = skillRadar.map((skill, i) => {
    const v = getVertex(skill.level, i)
    const angle = angleStep * i - Math.PI / 2
    const isHovered = hovered === i
    const px = v.x - 42 * Math.cos(angle)
    const py = v.y - 42 * Math.sin(angle)
    return (
      <text
        key={`pct-${i}`}
        x={px}
        y={py}
        textAnchor="middle"
        dominantBaseline="central"
        fill={skill.color}
        fontSize={isHovered ? "36" : "30"}
        fontWeight="700"
        fontFamily="var(--font-mono), monospace"
        opacity={hovered !== null && !isHovered ? 0.3 : 1}
        style={{ transition: "all 0.3s ease" }}
      >
        {skill.level}%
      </text>
    )
  })

  const labels = skillRadar.map((skill, i) => {
    const angle = angleStep * i - Math.PI / 2
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const Icon = skill.icon
    const isHovered = hovered === i

    const labelDistance = r + 38
    const lx = cx + labelDistance * cos
    const ly = cy + labelDistance * sin

    const width = 240
    const height = 65

    let x = lx
    let y = ly - height / 2
    let flexDir: "row" | "column" = "row"
    let justify: string = "flex-start"
    let align: string = "center"

    if (cos > 0.15) {
      x = lx
      flexDir = "row"
      justify = "flex-start"
    } else if (cos < -0.15) {
      x = lx - width
      flexDir = "row"
      justify = "flex-end"
    } else {
      x = lx - width / 2
      if (sin < 0) {
        y = ly - height
        flexDir = "column"
        justify = "flex-end"
        align = "center"
      } else {
        y = ly
        flexDir = "column"
        justify = "flex-start"
        align = "center"
      }
    }

    const labelColor = isHovered ? skill.color : "var(--text-primary)"
    const labelOpacity = hovered !== null && !isHovered ? 0.3 : 1

    return (
      <g
        key={skill.domain}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: "pointer", transition: "opacity 0.3s ease", opacity: labelOpacity }}
      >
        <foreignObject
          x={x}
          y={y}
          width={width}
          height={height}
          style={{ overflow: "visible" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: flexDir,
              justifyContent: justify,
              alignItems: align,
              gap: "12px",
              width: "100%",
              height: "100%",
              color: labelColor,
              transition: "color 0.3s ease",
            }}
          >
            {cos < -0.15 ? (
              <>
                 <span
                   style={{
                     fontFamily: "var(--font-heading), sans-serif",
                     fontSize: isHovered ? "40px" : "34px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    transition: "font-size 0.3s ease",
                  }}
                >
                  {skill.domain}
                </span>
                <div style={{ color: skill.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={52} />
                </div>
              </>
            ) : (
              <>
                <div style={{ color: skill.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={52} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading), sans-serif",
                    fontSize: isHovered ? "40px" : "34px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    transition: "font-size 0.3s ease",
                  }}
                >
                  {skill.domain}
                </span>
              </>
            )}
          </div>
        </foreignObject>
      </g>
    )
  })

  const corners = [
    { x: 30, y: 30 },
    { x: 720, y: 30 },
    { x: 30, y: 720 },
    { x: 720, y: 720 },
  ]

  const tooltipData = hovered !== null ? skillRadar[hovered] : null
  const tooltipVertex = hovered !== null ? getVertex(skillRadar[hovered].level, hovered) : null

  return (
    <div className="relative h-full w-full">
      <motion.svg
        viewBox="-315 -295 1380 1340"
        className="h-full w-full"
        style={{ overflow: "visible" }}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="radarBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={cx} cy={cy} r={r + 110} fill="url(#radarGlow)" />

        {corners.map((c, i) => (
          <g key={i} opacity={0.15}>
            <polygon
              points={hexPoints(c.x, c.y, 40)}
              fill="none"
              stroke="var(--tint-blue)"
              strokeWidth="1.4"
            />
          </g>
        ))}

        {axisLines}
        {gridPolygons}

        <polygon
          points={dataPointStrings.join(" ")}
          fill="url(#radarGlow)"
          stroke="url(#radarBorder)"
      strokeWidth="5"
      filter="url(#glow)"
        />
        <polygon
          points={dataPointStrings.join(" ")}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          opacity="0.9"
        />

        {dots}
        {percentages}
        {labels}
      </motion.svg>

      <AnimatePresence>
        {tooltipData && tooltipVertex && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute z-10 rounded-xl border border-border bg-surface-elevated/95 px-4 py-3 shadow-2xl backdrop-blur-xl"
            style={{
              left: `${((tooltipVertex.x + 315) / 1380) * 100}%`,
              top: `${((tooltipVertex.y + 295) / 1340) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${tooltipData.color}18` }}
              >
                <tooltipData.icon size={16} style={{ color: tooltipData.color }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">{tooltipData.domain}</p>
                <p className="text-sm font-bold" style={{ color: tooltipData.color }}>
                  {tooltipData.level}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(" ")
}

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ background: "radial-gradient(ellipse at 30% 40%, var(--warm) 0%, transparent 60%)" }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="section-heading-title">About Me</h2>
          <div className="section-heading-line" />
        </motion.div>

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
              className="max-w-2xl text-lg leading-[1.85] text-text-primary/80 sm:text-xl"
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
            <div className="w-full max-w-[460px] aspect-square flex items-center justify-center mt-6 lg:mt-0" style={{ marginTop: "-40px" }}>
              <RadarChart />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
