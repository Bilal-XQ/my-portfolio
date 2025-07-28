"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { motion } from "framer-motion"
import Laptop3D from "./Laptop3D"
import SimpleLaptop3D from "./SimpleLaptop3D"
import Laptop3DWithDebug from "./Laptop3DWithDebug"
import ReliableLaptop3D from "./ReliableLaptop3D"

interface Laptop3DSceneProps {
  inView?: boolean
  className?: string
}

function SceneLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  )
}

export default function Laptop3DScene({ inView = true, className = "" }: Laptop3DSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full h-full"
      >
        <Canvas 
          camera={{ position: [-5, 0, -15], fov: 55 }}
          className="w-full h-full"
          style={{ background: "transparent" }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Suspense fallback={<SceneLoading />}>
            <ReliableLaptop3D />
          </Suspense>
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 2.2} 
            maxPolarAngle={Math.PI / 2.2} 
          />
        </Canvas>
      </motion.div>
    </div>
  )
}
