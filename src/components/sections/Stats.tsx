"use client"

import { STATS } from "@/lib/constants"
import AnimatedCounter from "@/components/ui/AnimatedCounter"

export default function Stats() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--warm)_0%,transparent_70%)] opacity-[0.04]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
