"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

export default function SimpleLaptop3D() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.1
      meshRef.current.position.y = Math.sin(t) * 0.1
    }
  })

  return (
    <group>
      {/* Simple laptop representation */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial color="#c4c4c4" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 1, 0.1]} rotation={[-Math.PI / 6, 0, 0]}>
        <boxGeometry args={[2.8, 1.8, 0.1]} />
        <meshStandardMaterial color="#000000" />
        <Html
          transform
          occlude
          position={[0, 0, 0.06]}
          rotation={[0, 0, 0]}
          className="w-64 h-40"
        >
          <div className="w-full h-full bg-blue-900 rounded border border-gray-600 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <h3 className="text-lg font-bold mb-2">Welcome to My Portfolio</h3>
              <p className="text-sm">Full-Stack Developer & AI Explorer</p>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  )
}
