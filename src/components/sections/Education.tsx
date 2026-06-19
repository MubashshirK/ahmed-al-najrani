"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CLIENT, CERTIFICATIONS } from "@/lib/constants"
import { sectionLabel, fadeInUp, staggerContainer } from "@/lib/animations"
import { Award, GraduationCap, ChevronRight } from "lucide-react"

const issuerLogos: Record<string, string> = {
  "KAUST": "/assets/kaust-profile-avatar.webp",
  "Coursera": "/assets/Coursera-Logo_600x600.svg.png",
  "IBM": "/assets/IBM-logo.png",
  "Rice University": "/assets/Rice-University.png",
  "Ministry of Health — Saudi Arabia": "/assets/Saudi_Ministry_of_Health_Logo.svg",
  "Saudi Heart Association": "/assets/Saudi-Heart-Association.png",
  "UNICEF": "/assets/UNICEF.png",
}

export default function Education() {
  return (
    <section id="education" className="relative py-24">
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{ background: "radial-gradient(ellipse at 20% 30%, var(--warm) 0%, transparent 60%)" }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={sectionLabel}
        >
          // education & certifications
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="h-1 bg-gradient-to-r from-accent/10 via-accent/30 to-accent/10" />

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/5 shadow-sm sm:h-16 sm:w-16">
                  <Image
                    src="/assets/King_Faisal_University.png"
                    alt="King Faisal University"
                    fill
                    className="object-contain p-1.5"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-text-primary sm:text-2xl">
                        {CLIENT.university}
                      </h3>
                      <p className="mt-1 text-sm text-text-primary/70 sm:text-base">
                        {CLIENT.degree}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] font-medium text-accent">
                      <GraduationCap size={12} />
                      Class of {CLIENT.graduationYear}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted/50">
                        Duration
                      </p>
                      <p className="mt-0.5 text-sm text-text-primary">Aug 2021 — Jan 2026</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted/50">
                        Status
                      </p>
                      <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Complete
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted/50">
                        Semesters
                      </p>
                      <p className="mt-0.5 text-sm text-text-primary">8 Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border/50 pt-6">
                <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted/50">
                  Focus Areas
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Public Health", "Biostatistics", "Research Methods", "Epidemiology"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-border bg-bg px-2.5 py-1 text-[11px] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-3"
        >
          <h2 className="font-heading text-xl font-bold text-text-primary">Certifications</h2>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
            {CERTIFICATIONS.length}
          </span>
          <div className="ml-auto hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {CERTIFICATIONS.map((cert, i) => {
            const logo = issuerLogos[cert.issuer]

            return (
              <motion.div
                key={cert.name}
                variants={fadeInUp}
                className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {logo ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/5 shadow-sm">
                    <Image
                      src={logo}
                      alt={cert.issuer}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
                    <Award size={16} className="text-accent" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-heading text-base font-semibold text-text-primary leading-snug">
                      {cert.name}
                    </h4>
                    <ChevronRight size={14} className="mt-0.5 shrink-0 text-text-muted/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <p className="mt-0.5 text-sm text-text-muted">{cert.issuer}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm text-text-muted">{cert.date}</span>
                    {cert.id && (
                      <span className="font-mono text-[11px] text-text-muted/70">
                        ID: {cert.id}
                      </span>
                    )}
                    {cert.expires && (
                      <span className="rounded-full border border-border px-1.5 py-0.5 text-[11px] text-text-muted/70">
                        Expires {cert.expires}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
