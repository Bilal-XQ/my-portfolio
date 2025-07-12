"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface ParticleSystemProps {
  particleCount?: number
  containerWidth?: number
  containerHeight?: number
  className?: string
}

export default function ParticleSystem({
  particleCount = 50,
  containerWidth = 800,
  containerHeight = 600,
  className = ""
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? '#1A4B7F' : '#2B6BA5'
      })
    }
    
    setParticles(newParticles)
  }, [particleCount, containerWidth, containerHeight])

  // Update particle positions
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx
          let newY = particle.y + particle.vy
          let newVx = particle.vx
          let newVy = particle.vy

          // Bounce off edges
          if (newX <= 0 || newX >= containerWidth) {
            newVx = -newVx
            newX = Math.max(0, Math.min(containerWidth, newX))
          }
          if (newY <= 0 || newY >= containerHeight) {
            newVy = -newVy
            newY = Math.max(0, Math.min(containerHeight, newY))
          }

          // Mouse interaction - particles are attracted to mouse
          const dx = mousePosition.x - newX
          const dy = mousePosition.y - newY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100 * 0.01
            newVx += (dx / distance) * force
            newVy += (dy / distance) * force
          }

          // Apply friction
          newVx *= 0.99
          newVy *= 0.99

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          }
        })
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [mousePosition, containerWidth, containerHeight])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('particle-container')?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      id="particle-container"
      className={`relative overflow-hidden ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      <svg
        width={containerWidth}
        height={containerHeight}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Render connections between nearby particles */}
        {particles.map((particle, i) => 
          particles.slice(i + 1).map((otherParticle, j) => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 80) {
              const opacity = (80 - distance) / 80 * 0.3
              return (
                <line
                  key={`${particle.id}-${otherParticle.id}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke="#1A4B7F"
                  strokeWidth="0.5"
                  opacity={opacity}
                />
              )
            }
            return null
          })
        )}
        
        {/* Render particles */}
        {particles.map(particle => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity * 0.8, particle.opacity]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  )
}