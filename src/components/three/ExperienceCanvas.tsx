"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

function getThemeVars() {
  if (typeof window === "undefined") {
    return { accent: "#171717", warm: "#d4b8a0" }
  }
  const style = getComputedStyle(document.documentElement)
  return {
    accent: style.getPropertyValue("--accent").trim() || "#171717",
    warm: style.getPropertyValue("--warm").trim() || "#d4b8a0",
  }
}

function hash01(i: number, seed: number) {
  // Pure deterministic 0..1 from integers (no mutable seed)
  const x = Math.imul(i + seed, 374761393)
  const y = Math.imul(x ^ (x >>> 13), 1274126177)
  const z = (y ^ (y >>> 16)) >>> 0
  return z / 4294967296
}

function ExperienceOrbs() {
  const { accent, warm } = getThemeVars()
  const meshRef = useRef<THREE.InstancedMesh | null>(null)

  const instanced = useMemo(() => {
    const count = 420

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(warm),
      emissive: new THREE.Color(warm),
      emissiveIntensity: 0.18,
      roughness: 0.55,
      metalness: 0.0,
      transparent: true,
      opacity: 0.75,
    })

    const instancedMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.035, 16, 16),
      material,
      count
    )

    const colors = new Float32Array(count * 3)
    const dummy = new THREE.Object3D()

    for (let i = 0; i < count; i++) {
      const rx = hash01(i, 11) - 0.5
      const ry = hash01(i, 29) - 0.45
      const rz = hash01(i, 47) - 0.5

      const x = rx * 6.5
      const y = ry * 3.4
      const z = rz * 6.5

      const pickAccent = hash01(i, 73) > 0.78
      const col = new THREE.Color(pickAccent ? accent : warm)

      colors[i * 3 + 0] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b

      const rotX = hash01(i, 97) * Math.PI
      const rotY = hash01(i, 101) * Math.PI
      const rotZ = hash01(i, 103) * Math.PI

      const scale = 0.7 + hash01(i, 107) * 1.2

      dummy.position.set(x, y, z)
      dummy.rotation.set(rotX, rotY, rotZ)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()

