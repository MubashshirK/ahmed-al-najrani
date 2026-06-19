"use client"

import { motion } from "framer-motion"
import { SKILL_DOMAINS } from "@/lib/constants"
import { sectionLabel, fadeInUp, staggerContainer } from "@/lib/animations"
import { BarChart3, HeartPulse, Users } from "lucide-react"
import SkillCard from "@/components/ui/SkillCard"

const icons = [BarChart3, HeartPulse, Users]

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-24">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{ background: "radial-gradient(ellipse at 70% 30%, var(--warm) 0%, transparent 60%)" }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={sectionLabel}
        >
          // expertise
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 space-y-16"
        >
          {SKILL_DOMAINS.map((domain, i) => {
            const Icon = icons[i]
            return (
              <motion.div key={domain.title} variants={fadeInUp} className="group/row">
                <div className="grid gap-8 md:grid-cols-5">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 md:block">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle transition-colors duration-500 group-hover/row:bg-accent/15 md:mb-4"
                      >
                        <Icon size={20} className="text-accent transition-colors duration-500 group-hover/row:text-accent" />
                      </motion.div>
                      <div>
                        <p className="font-mono text-[11px] font-medium tracking-widest text-text-muted/40 transition-colors duration-500 group-hover/row:text-accent/50">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-1 font-heading text-2xl font-bold text-text-primary transition-colors duration-500 group-hover/row:text-accent md:text-3xl">
                          {domain.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-6 hidden h-px w-16 bg-accent/30 transition-all delay-75 duration-500 group-hover/row:w-full md:block" />
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
