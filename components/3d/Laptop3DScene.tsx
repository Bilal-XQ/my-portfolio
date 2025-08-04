"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei"
import { Suspense, useState } from "react"
import { motion } from "framer-motion"
import ReliableLaptop3D from "./ReliableLaptop3D"

interface Laptop3DSceneProps {
  inView?: boolean
  className?: string
}

function Scene3DLoading() {
  return (
    <Html center>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
      />
    </Html>
  )
}

export default function Laptop3DScene({ inView = true, className = "" }: Laptop3DSceneProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`w-full h-full overflow-visible ${className}`} style={{ perspective: '1000px' }}>
      {/* HTML Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full h-full overflow-visible"
      >
        <Canvas 
          camera={{ position: [-5, 0, -15], fov: 55 }}
          className="w-full h-full overflow-visible"
          style={{ 
            background: "transparent",
            overflow: "visible"
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          onCreated={() => {
            // Hide loading when Canvas is ready
            setTimeout(() => setIsLoading(false), 500)
          }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <ReliableLaptop3D />
            <Environment preset="city" />
            <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
          </Suspense>
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 2.2} 
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.1}
          />
        </Canvas>
      </motion.div>
    </div>
  )
}
