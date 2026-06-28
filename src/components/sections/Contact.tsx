"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Globe, Phone } from "lucide-react"
import { sectionLabel, fadeInUp, staggerContainer } from "@/lib/animations"
import { Particles } from "@/components/three/Particles"
import { useTheme } from "@/components/ui/ThemeProvider"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "moka2205@gmail.com",
    href: "mailto:moka2205@gmail.com",
    color: "var(--tint-blue)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9019531196",
    href: "tel:+919019531196",
    color: "var(--tint-green)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kharghar, Navi Mumbai, India",
    href: null,
    color: "var(--tint-amber)",
  },
  {
    icon: Globe,
    label: "LinkedIn",
    value: "Dr. Mohammed Khursheed Akhtar",
    href: "https://www.linkedin.com/in/dr-mohammed-khursheed-akhtar-bb5205254/",
    color: "var(--tint-blue)",
  },
]

export default function Contact() {
  const { theme } = useTheme()
  return (
    <section id="contact" className="relative py-24">
      <Particles
        className="absolute inset-0 h-full w-full"
        quantity={100}
        color={theme === "dark" ? "#ffffff" : "#a08030"}
        staticity={30}
        ease={80}
        size={0.6}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--accent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={sectionLabel}
        >
          {"// contact"}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl font-bold text-text-primary"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-3 max-w-lg text-base leading-relaxed text-text-muted"
          >
            Available for AI transformation advisory, enterprise consulting, research collaborations, and executive workshops.
          </motion.p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {contactMethods.map((method) => {
              const Icon = method.icon
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `color-mix(in srgb, ${method.color} 12%, transparent)` }}
                  >
                    <Icon size={18} style={{ color: method.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                      {method.label}
                    </p>
                    <p className="mt-1 truncate text-sm text-text-primary">
                      {method.value}
                    </p>
                  </div>
                </div>
              )

              if (method.href) {
                return (
                  <motion.a
                    key={method.label}
                    variants={fadeInUp}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </motion.a>
                )
              }

              return (
                <motion.div key={method.label} variants={fadeInUp}>
                  {content}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
