"use client"

import { motion } from "framer-motion"
import { CLIENT } from "@/lib/constants"
import { sectionLabel, fadeInUp, staggerContainer } from "@/lib/animations"

const skillRadar = [
  { domain: "Statistics", level: 90 },
  { domain: "Research", level: 85 },
  { domain: "Leadership", level: 80 },
  { domain: "Programming", level: 70 },
  { domain: "Public Health", level: 90 },
  { domain: "Communication", level: 75 },
]

function RadarChart() {
  const cx = 100
  const cy = 100
  const r = 60
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
    const lx = cx + (r + 22) * Math.cos(angle)
    const ly = cy + (r + 22) * Math.sin(angle)
    return (
      <text
        key={skill.domain}
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-text-muted text-[9px] font-medium"
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
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {axisLines}
      {gridLines}
      <polygon points={dataPoints.join(" ")} fill="var(--accent-subtle)" stroke="var(--accent)" strokeWidth="1.5" />
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
          // about_me
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
              With over two years of experience in the Student Health Council, I have undertaken various leadership roles, most recently serving as the{" "}
              <span className="text-accent font-medium">Head of the Initiatives Committee</span>.
              I am proficient in key statistical programs such as OpenEpi, PSPP, JASP, and JAMOVI,
              enabling me to analyze data and effectively develop public health interventions. I have
              also become a lecturer at the research school for{" "}
              <span className="text-accent font-medium">four research groups</span>, assisting them
              in publishing their studies.
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
            <div className="h-64 w-64">
              <RadarChart />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
