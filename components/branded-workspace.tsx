"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface BrandedWorkspaceProps {
  inView?: boolean
  className?: string
}

export default function BrandedWorkspace({ inView = true, className = "" }: BrandedWorkspaceProps) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Workspace Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-4xl h-[700px]"
        style={{
          filter: 'drop-shadow(0 25px 50px rgba(59, 130, 246, 0.15)) drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))',
        }}
      >
        <div className="relative w-full h-full">
          {/* Additional glow effect behind the image */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/20 rounded-2xl blur-3xl scale-110 -z-10"
            style={{ filter: 'blur(40px)' }}
          />
          
          <Image
            src="/workspace.png"
            alt="Developer Workspace"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>
    </div>
  )
}
