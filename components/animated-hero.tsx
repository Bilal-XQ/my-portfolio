"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedHero() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  // Code snippets for the typing animation
  const codeSnippets = [
    "const portfolio = {\n  name: 'Bilal EL AZZAM',\n  role: 'Full-Stack Developer',\n  passion: 'Building amazing UIs'\n};",
    "function createMagic() {\n  return (\n    <div className=\"innovative-solutions\">\n      Transform ideas into reality\n    </div>\n  );\n}",
    "// Always learning, always growing\nconst skills = [\n  'React', 'TypeScript', 'Node.js',\n  'PHP', 'MySQL', 'Python'\n];"
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (prefersReducedMotion) return

    const currentCode = codeSnippets[currentCodeIndex]
    
    if (isTyping && currentCharIndex < currentCode.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1)
      }, 50 + Math.random() * 50) // Variable typing speed
      
      return () => clearTimeout(timeout)
    } else if (isTyping && currentCharIndex >= currentCode.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false)
        setTimeout(() => {
          setCurrentCharIndex(0)
          setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length)
          setIsTyping(true)
        }, 2000)
      }, 1000)
      
      return () => clearTimeout(timeout)
    }
  }, [currentCharIndex, currentCodeIndex, isTyping, prefersReducedMotion])

  // Hide animation on mobile devices
  if (isMobile) return null

  // Simplified static version for users who prefer reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-96 h-80 opacity-60">
        <div className="relative w-full h-full bg-black-tertiary/80 backdrop-blur-sm rounded-xl border border-blue-primary/20 shadow-2xl">
          <div className="flex items-center gap-2 p-4 border-b border-blue-primary/20">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-text-secondary text-sm ml-2">portfolio.js</span>
          </div>
          <div className="p-4 font-mono text-sm text-blue-primary">
            {codeSnippets[0]}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-96 h-80 pointer-events-none">
      {/* Interactive Code Terminal */}
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full h-full bg-black-tertiary/90 backdrop-blur-sm rounded-xl border border-blue-primary/30 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,75,127,0.1) 100%)'
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-primary/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-text-secondary text-sm ml-2">portfolio.js</span>
          </div>
          <div className="text-text-secondary text-xs">●</div>
        </div>

        {/* Code Content */}
        <div className="p-4 font-mono text-sm h-full overflow-hidden">
          <div className="text-blue-primary">
            {codeSnippets[currentCodeIndex].slice(0, currentCharIndex)}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-text-primary"
              >
                |
              </motion.span>
            )}
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-primary/20 to-blue-secondary/20 rounded-xl blur-xl" />
      </motion.div>

      {/* Floating Particles representing code execution */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
          className="absolute w-1 h-1 bg-blue-primary rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        />
      ))}

      {/* Geometric shapes representing data flow */}
      <motion.div
        animate={{ 
          rotate: 360,
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        className="absolute -top-4 -right-4 w-8 h-8 border-2 border-blue-primary/60 rotate-45 rounded-sm"
      />

      <motion.div
        animate={{ 
          rotate: -360,
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-secondary/60 rounded-full"
      />

      {/* Subtle pulse effect for the entire container */}
      <motion.div
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-primary/5 to-blue-secondary/5 rounded-xl blur-2xl"
      />
    </div>
  )
}
