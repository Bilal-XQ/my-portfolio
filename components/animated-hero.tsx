"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedHero() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Generate consistent random values that won't change between renders
  const particles = useState(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 20 + (i * 123 % 60), // Deterministic "random" values
      y: 20 + (i * 456 % 60),
      animX: (i * 789 % 100) - 50,
      animY: (i * 234 % 100) - 50,
      duration: 3 + (i * 0.5),
      delay: i * 0.5
    }))
  )[0]

  // Hide animation on mobile devices or before mount
  if (!isMounted || isMobile) return null

  // Simplified animation for users who prefer reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 h-80 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-sm" />
      </div>
    )
  }

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none">
      {/* Primary floating orb - Enhanced for dark theme */}
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
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full opacity-40 blur-sm"
      />

      {/* Secondary orbiting element - Enhanced glow */}
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-8 right-8 bottom-8 left-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full opacity-35"
      />

      {/* Floating particles - Enhanced visibility */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
            x: [0, particle.animX],
            y: [0, particle.animY]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 bg-blue-300 rounded-full shadow-lg shadow-blue-500/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
        />
      ))}

      {/* Pulsing core - Enhanced for dark theme */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-2xl shadow-blue-500/30"
      />

      {/* Geometric shapes - Enhanced visibility */}
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
        className="absolute top-16 left-16 w-8 h-8 border-2 border-blue-400 rotate-45 opacity-70 shadow-lg shadow-blue-400/30"
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
        className="absolute bottom-16 right-16 w-6 h-6 bg-blue-500 rounded-full opacity-60 shadow-lg shadow-blue-500/40"
      />
    </div>
  )
}
