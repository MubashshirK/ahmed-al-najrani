 "use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { EXPERIENCES } from "@/lib/constants"
import { sectionLabel } from "@/lib/animations"

function TimelineNode({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCES)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex items-start gap-6 pb-12 pl-8 md:pl-0"
    >
      <div className="absolute left-0 top-1 md:static md:flex md:w-1/3 md:justify-end md:pr-8">
        <div className="relative">
          <div className="h-4 w-4 rounded-full border-2 border-accent bg-bg" style={{ boxShadow: "0 0 12px var(--accent)" }} />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {experience.role}
        </h3>
        <p className="mt-1 text-sm text-accent">{experience.organization}</p>
        <p className="mt-1 text-xs text-text-muted">{experience.period}</p>
        <p className="mt-3 text-sm leading-relaxed text-text-primary/80">
          {experience.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="relative py-24">
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={sectionLabel}
        >
          {"// Experience"}
        </motion.p>

        <div ref={ref} className="relative">
          <div className="absolute left-[7px] top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px">
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
