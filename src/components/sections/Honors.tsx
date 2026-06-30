"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Award, MapPin, Calendar, Building2, Star, X, ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { HONORS } from "@/lib/constants"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const iconColors = ["var(--tint-amber)", "var(--tint-blue)"]

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: string[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-20"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`Image ${current + 1}`}
          width={1600}
          height={1200}
          loading="eager"
          className="h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-xl object-contain"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          {current + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Honors() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

  return (
    <section id="honors" className="relative py-24">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, var(--warm) 0%, transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="section-heading-title">Honors & Awards</h2>
          <div className="section-heading-line" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {HONORS.map((honor, i) => (
            <motion.div key={honor.title} variants={fadeInUp} className="w-full">
              <div className="group w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="h-1 bg-gradient-to-r from-[#c8a040]/20 via-[#c8a040]/50 to-[#c8a040]/20" />

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex w-full shrink-0 gap-3 lg:w-[42%]">
                      {honor.images.map((src, imgIdx) => (
                        <button
                          key={src}
                          onClick={() => setLightbox({ images: honor.images, index: imgIdx })}
                          className="group/img relative flex-1 overflow-hidden rounded-xl bg-surface-elevated shadow-sm focus:outline-none"
                          style={{ minHeight: 260 }}
                        >
                          <Image
                            src={src}
                            alt={`${honor.title} - Image ${imgIdx + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 21vw"
                            className="object-cover transition-all duration-500 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/img:bg-black/30">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                              <Expand size={16} />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-3">
                        <div
                          className="hidden lg:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm"
                          style={{ backgroundColor: `${iconColors[i]}18` }}
                        >
                          <Award size={20} style={{ color: iconColors[i] }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-heading text-xl font-bold leading-8 text-text-primary sm:text-2xl">
                            <span
                              className="inline-flex lg:hidden mr-1.5 h-7 w-7 shrink-0 items-center justify-center rounded-lg align-middle"
                              style={{ backgroundColor: `${iconColors[i]}18` }}
                            >
                              <Award size={14} style={{ color: iconColors[i] }} />
                            </span>
                            {honor.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-accent">
                            {honor.role}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center gap-1.5 text-sm text-text-muted">
                          <Calendar size={14} className="shrink-0" />
                          {honor.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-text-muted">
                          <MapPin size={14} className="shrink-0" />
                          {honor.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-text-muted">
                          <Building2 size={14} className="shrink-0" />
                          {honor.organizers}
                        </div>
                      </div>

                      <div className="mt-4 border-t border-border/50 pt-4">
                        <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                          Event Highlights
                        </p>
                        <ul className="space-y-2">
                          {honor.highlights.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm text-text-primary/80 sm:text-base">
                              <Star
                                size={14}
                                className="mt-0.5 shrink-0"
                                style={{ color: iconColors[i] }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {honor.tags.map((tag) => (
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
