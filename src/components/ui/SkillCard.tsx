"use client"

import { useState } from "react"

export default function SkillCard({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex cursor-default items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm transition-all duration-300"
      style={{
        transform: hovered ? "translateY(-4px) scale(1.03)" : undefined,
        boxShadow: hovered
          ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
          : undefined,
      }}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full transition-all duration-300"
        style={{
          backgroundColor: hovered
            ? "var(--accent)"
            : "color-mix(in srgb, var(--accent) 50%, transparent)",
          transform: hovered ? "scale(1.8)" : undefined,
        }}
      />
      <span
        className="text-sm transition-all duration-300"
        style={{
          color: hovered
            ? "var(--text-primary)"
            : "color-mix(in srgb, var(--text-primary) 80%, transparent)",
          transform: hovered ? "translateX(2px)" : undefined,
        }}
      >
        {name}
      </span>
    </div>
  )
}
