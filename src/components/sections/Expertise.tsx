"use client"

import { motion } from "framer-motion"
import { SKILL_DOMAINS } from "@/lib/constants"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Brain, BarChart3, Users } from "lucide-react"
import SkillCard from "@/components/ui/SkillCard"

const icons = [Brain, BarChart3, Users]

const domainColors = [
  "var(--tint-blue)",
  "var(--tint-green)",
  "var(--tint-amber)",
]

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="section-heading-title">Expertise</h2>
          <div className="section-heading-line" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 space-y-16"
        >
          {SKILL_DOMAINS.map((domain, i) => {
            const Icon = icons[i]
            const color = domainColors[i]
            return (
              <motion.div
                key={domain.title}
                variants={fadeInUp}
                className="domain-row group/row"
                style={{ "--dc": color } as React.CSSProperties}
              >
                <div className="grid gap-8 md:grid-cols-5">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 md:block">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="domain-icon-bg flex h-12 w-12 items-center justify-center rounded-xl md:mb-4"
                      >
                        <Icon size={20} className="domain-icon" />
                      </motion.div>
                      <div>
                        <p className="domain-num font-mono text-[11px] font-medium tracking-widest text-text-muted/70">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="domain-title mt-1 font-heading text-2xl font-bold text-text-primary md:text-3xl">
                          {domain.title}
                        </h3>
                      </div>
                    </div>
                    <div className="domain-underline mt-6 hidden h-px w-16 transition-all delay-75 duration-500 group-hover/row:w-full md:block" />
                  </div>

                  <div className="md:col-span-3">
                    <div className="grid grid-cols-2 gap-3">
                      {domain.skills.map((skill) => (
                        <SkillCard key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                </div>

                {i < SKILL_DOMAINS.length - 1 && (
                  <div className="mx-auto mt-16 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent" />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

