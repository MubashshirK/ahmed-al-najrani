"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import FloatingMesh from "./FloatingMesh"

export default function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="white" />
        <pointLight position={[-5, -5, 2]} intensity={0.8} color="white" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <FloatingMesh />
        </Suspense>
      </Canvas>
    </div>
  )
}
