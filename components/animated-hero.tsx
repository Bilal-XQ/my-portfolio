"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedHero() {
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Hide animation on mobile devices
  if (isMobile) return null

  // Simplified animation for users who prefer reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 h-80 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full" />
      </div>
    )
  }

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none">
      {/* Primary floating orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotate: 360,
          y: [0, -20, 0]
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeOut" },
          scale: { duration: 1.2, ease: "easeOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-30 blur-sm"
      />

      {/* Secondary orbiting element */}
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-8 right-8 bottom-8 left-8 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full opacity-25"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        />
      ))}

      {/* Pulsing core */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
      />

      {/* Geometric shapes */}
      <motion.div
        animate={{ 
          rotate: 180,
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        className="absolute top-16 left-16 w-8 h-8 border-2 border-blue-300 rotate-45 opacity-60"
      />

      <motion.div
        animate={{ 
          rotate: -180,
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
        className="absolute bottom-16 right-16 w-6 h-6 bg-purple-400 rounded-full opacity-50"
      />
    </div>
  )
}
