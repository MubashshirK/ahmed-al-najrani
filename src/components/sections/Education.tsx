"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CERTIFICATIONS } from "@/lib/constants"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Award, GraduationCap } from "lucide-react"

const degrees = [
  {
    university: "Singhania University, India",
    degree: "PhD — Enterprise Resource Planning (ERP)",
    period: "2008 — 2012",
    status: "Completed",
    focus: ["Enterprise Resource Planning", "Technology Integration", "Organizational Transformation"],
    logo: "/assets/Singhania-University-logo.png",
  },
  {
    university: "Atlantic International University, USA",
    degree: "Second PhD — Geographic Information Systems (GIS)",
    period: "2014 — 2018",
    status: "Completed",
    focus: ["Geographic Information Systems", "Spatial Intelligence", "Decision Support Systems"],
    logo: "/assets/Atlantic-International-University-logo.avif",
  },
  {
    university: "University of Mumbai",
    degree: "MBA",
    period: "1995 — 1997",
    status: "Completed",
    focus: ["Business Administration", "Strategic Planning", "Management"],
    logo: "/assets/university-of-mumbai.jpg",
  },
  {
    university: "University of Mumbai",
    degree: "MSc Applied Mathematics — University Rank Holder",
    period: "1990 — 1993",
    status: "Completed",
    focus: ["Applied Mathematics", "Statistical Modelling", "Quantitative Analysis"],
    logo: "/assets/university-of-mumbai.jpg",
  },
  {
    university: "University of Mumbai",
    degree: "Diploma in Computer Software & Techniques",
    period: "1988 — 1990",
    status: "Completed",
    focus: ["Computer Science", "Software Development", "Programming"],
    logo: "/assets/university-of-mumbai.jpg",
  },
  {
    university: "Islamic Development Bank, Saudi Arabia",
    degree: "Postdoctoral Research — Innovation & Infrastructure Development",
    period: "2012 — 2014",
    status: "Completed",
    focus: ["Innovation", "Infrastructure Development", "Research"],
    logo: "/assets/islamic-development-bank.png",
  },
]

const issuerLogos: Record<string, string> = {
  "be10x": "/assets/be10x-certificate.jpg",
  "ECGS Education": "/assets/ECGS-Education-logo.png",
  "Exponential World AI": "/assets/Exponential-World-AI-logo.jpg",
  "SBUB Group": "/assets/sbub-group-logo.webp",
  "King Abdulaziz University": "/assets/King-AbdulAziz-University-logo.jpg",
}

export default function Education() {
  return (
    <section id="education" className="relative py-24">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 30%, var(--warm) 0%, transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="section-heading-title">Education & Certifications</h2>
          <div className="section-heading-line" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 space-y-4"
        >
          {degrees.map((edu) => (
            <motion.div key={edu.degree} variants={fadeInUp} className="w-full">
              <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="h-1 bg-gradient-to-r from-[#c8a040]/20 via-[#c8a040]/40 to-[#c8a040]/20" />

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
                    {edu.logo ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm sm:h-16 sm:w-16">
                        <Image
                          src={edu.logo}
                          alt={edu.university}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 shadow-sm sm:h-16 sm:w-16">
                        <GraduationCap size={24} className="text-accent" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-text-primary sm:text-2xl">
                            {edu.university}
                          </h3>
                          <p className="mt-1 text-sm text-text-muted sm:text-base">
                            {edu.degree}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] font-medium text-accent">
                          <GraduationCap size={12} />
                          {edu.period}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                            Duration
                          </p>
                          <p className="mt-0.5 text-sm text-text-primary">{edu.period}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                            Status
                          </p>
                          <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {edu.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border/50 pt-6">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      Focus Areas
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {edu.focus.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-border bg-surface-elevated px-2.5 py-1 text-[11px] text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3">
            <h2 className="section-heading-title">Certifications</h2>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
              {CERTIFICATIONS.length}
            </span>
          </div>
          <div className="section-heading-line" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {CERTIFICATIONS.map((cert) => {
            const logo = issuerLogos[cert.issuer]

            return (
              <motion.div key={cert.name} variants={fadeInUp} className="flex w-full">
                <div className="group flex w-full flex-1 items-start gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  {logo ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                      <Image
                        src={logo}
                        alt={cert.issuer}
                        fill
                        className="object-contain p-1.5"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Award size={18} className="text-accent" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-heading text-base font-semibold text-text-primary leading-snug">
                        {cert.name}
                      </h4>
                    </div>
                    <p className="mt-0.5 text-sm text-text-muted">{cert.issuer}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-sm text-text-muted">{cert.date}</span>
                      {cert.id && (
                        <span className="font-mono text-[11px] text-text-muted/70">
                          ID: {cert.id}
                        </span>
                      )}
                    </div>
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
