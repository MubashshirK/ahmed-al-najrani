"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"
import { ChevronDown, GraduationCap, FileText } from "lucide-react"
import { CLIENT } from "@/lib/constants"

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false })

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
} satisfies Record<string, { opacity: number; y: number }>

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,184,160,0.12) 0%, rgba(212,184,160,0.04) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 pt-24 lg:flex-row lg:text-left">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center gap-6 lg:items-start"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-muted"
          >
            <GraduationCap size={14} />
            <span>King Faisal University · Class of 2026</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl font-bold leading-tight tracking-tight text-center lg:text-left sm:text-6xl lg:text-7xl"
          >
            {CLIENT.name.split(" ")[0]}
            <br />
            {CLIENT.name.split(" ").slice(1).join(" ")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl font-medium text-text-muted text-center lg:text-left sm:text-2xl"
          >
            {CLIENT.title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base text-text-muted/80 text-center lg:text-left"
          >
            {CLIENT.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {["2+ Years Leadership", "KAP Studies Expert", "8+ Certifications"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 pt-2 lg:justify-start"
          >
            <a
              href="/assets/CV-Ahmed-AlNajrani.pdf"
              download
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-medium text-text-inverse transition-all duration-300"
            >
              <FileText size={16} />
              Download CV
              <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-s-al-najrani-9bb72b296/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:bg-surface"
            >
              LinkedIn Profile
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0"
        >
          <div className="h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-warm/20 to-warm/5 blur-3xl" />
            <div className="absolute -inset-3 rounded-[1.25rem] border border-border/60" />
            <div className="absolute -inset-1.5 rounded-[1.15rem] border border-border/30" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
              <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <Image
                src="/images/ahmed.jpg"
                alt={CLIENT.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-text-muted"
        >
          <span className="text-xs">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
