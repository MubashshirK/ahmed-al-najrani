"use client"

import { useRef, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

type Bounds = { x: [number, number]; y: [number, number]; z: [number, number] }

interface ShapeConfig {
  geometry: ReactNode
  position: [number, number, number]
  scale: number
  velocity: [number, number, number]
  bounds: Bounds
  color: string
  emissive: string
}

function Shape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<Mesh>(null)
  const vel = useRef(config.velocity)
  const pos = useRef([...config.position])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const dt = Math.min(delta * 0.5, 0.03)

    pos.current[0] += vel.current[0] * dt
    pos.current[1] += vel.current[1] * dt
    pos.current[2] += vel.current[2] * dt

    if (pos.current[0] > config.bounds.x[1]) { pos.current[0] = config.bounds.x[1]; vel.current[0] *= -1 }
    if (pos.current[0] < config.bounds.x[0]) { pos.current[0] = config.bounds.x[0]; vel.current[0] *= -1 }
    if (pos.current[1] > config.bounds.y[1]) { pos.current[1] = config.bounds.y[1]; vel.current[1] *= -1 }
    if (pos.current[1] < config.bounds.y[0]) { pos.current[1] = config.bounds.y[0]; vel.current[1] *= -1 }
    if (pos.current[2] > config.bounds.z[1]) { pos.current[2] = config.bounds.z[1]; vel.current[2] *= -1 }
    if (pos.current[2] < config.bounds.z[0]) { pos.current[2] = config.bounds.z[0]; vel.current[2] *= -1 }

    meshRef.current.position.set(pos.current[0], pos.current[1], pos.current[2])

    const t = performance.now() * 0.001
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.rotation.z = t * 0.08
  })

  return (
    <mesh ref={meshRef} position={config.position} scale={config.scale}>
      {config.geometry}
      <meshStandardMaterial
        color={config.color}
        emissive={config.emissive}
        emissiveIntensity={0.25}
        wireframe
        transparent
        opacity={0.85}
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  )
}

export default function FloatingMesh() {
  const shapes: ShapeConfig[] = [
    {
      geometry: <icosahedronGeometry args={[1, 0]} />,
      position: [2.5, 1, -2],
      scale: 0.9,
      velocity: [0.3, 0.2, -0.15],
      bounds: { x: [-3.5, 3.5], y: [-2.4, 1.6], z: [-3.5, 2] },
      color: "#8899bb",
      emissive: "#aabbdd",
    },
    {
      geometry: <octahedronGeometry args={[1, 0]} />,
      position: [-2.8, -0.8, 0.5],
      scale: 0.8,
      velocity: [-0.25, 0.35, 0.2],
      bounds: { x: [-3.5, 3.5], y: [-2.4, 1.6], z: [-3.5, 2] },
      color: "#88aa99",
      emissive: "#aaddbb",
    },
    {
      geometry: <dodecahedronGeometry args={[1, 0]} />,
      position: [0, 1.2, -3],
      scale: 1,
      velocity: [0.15, -0.2, 0.25],
      bounds: { x: [-3.5, 3.5], y: [-2.4, 1.6], z: [-3.5, 2] },
      color: "#bbaa88",
      emissive: "#ddccaa",
    },
    {
      geometry: <icosahedronGeometry args={[1, 0]} />,
      position: [-2, -1.5, 2],
      scale: 0.5,
      velocity: [-0.35, 0.25, -0.2],
      bounds: { x: [-3.5, 3.5], y: [-2.4, 1.6], z: [-3.5, 2] },
      color: "#aa8899",
      emissive: "#ddaabb",
    },
    {
      geometry: <octahedronGeometry args={[1, 0]} />,
      position: [3.2, -1.2, 0],
      scale: 0.6,
      velocity: [-0.2, -0.3, 0.1],
      bounds: { x: [-3.5, 3.5], y: [-2.4, 1.6], z: [-3.5, 2] },
      color: "#8899bb",
      emissive: "#aabbdd",
    },
  ]

  return (
    <group>
      {shapes.map((config, i) => (
        <Shape key={i} config={config} />
      ))}
    </group>
  )
}

