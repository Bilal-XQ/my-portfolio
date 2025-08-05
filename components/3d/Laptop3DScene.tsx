"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Suspense, useState } from "react"
import { motion } from "framer-motion"
import Terminal3D from "./Terminal3D"

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
          camera={{ position: [6, 4, 8], fov: 45 }}
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
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          <Suspense fallback={null}>
            <Terminal3D scale={0.8} position={[0, 0, 0]} />
            <Environment preset="studio" />
            <ContactShadows 
              position={[0, -2, 0]} 
              scale={15} 
              blur={2} 
              far={3} 
              opacity={0.3}
            />
          </Suspense>
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
          />
        </Canvas>
      </motion.div>
    </div>
  )
}
