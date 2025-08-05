"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, RoundedBox, Environment, Sphere } from "@react-three/drei"
import * as THREE from "three"

interface Terminal3DProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

function TerminalModel(props: Terminal3DProps) {
  const terminalRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [commandIndex, setCommandIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const commands = useMemo(() => [
    { command: "pnpm dev", output: "✓ Local: http://localhost:3002", success: true },
    { command: "git status", output: "✓ On branch main - Working tree clean", success: true },
    { command: "pnpm build", output: "✓ Build completed in 2.3s", success: true },
    { command: "npm run test", output: "✓ All 24 tests passing", success: true },
    { command: "echo 'Welcome to my portfolio'", output: "Welcome to my portfolio ✨", success: true }
  ], [])

  // Enhanced typing animation with more realistic timing
  useEffect(() => {
    if (!isTyping) return

    const currentCommand = commands[commandIndex]
    const fullText = currentCommand.command

    let index = 0
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setCommandIndex((prev) => (prev + 1) % commands.length)
          setCurrentText("")
        }, 3000) // Increased pause time for better readability
      }
    }, 80) // Slightly faster typing

    return () => clearInterval(typingInterval)
  }, [commandIndex, isTyping, commands])

  // Enhanced floating animation with smooth motion
  useFrame((state) => {
    if (terminalRef.current) {
      const t = state.clock.getElapsedTime()
      
      // Smooth floating with reduced intensity for professionalism
      terminalRef.current.position.y = Math.sin(t * 0.5) * 0.1
      terminalRef.current.rotation.x = Math.sin(t * 0.3) * 0.03 + 0.08
      terminalRef.current.rotation.y = Math.cos(t * 0.25) * 0.05
      terminalRef.current.rotation.z = Math.sin(t * 0.4) * 0.015
    }

    // Enhanced screen glow with subtle pulsing
    if (screenRef.current) {
      const glowIntensity = 0.3 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1
      screenRef.current.material.emissive.setHex(0x001a33)
      screenRef.current.material.emissiveIntensity = glowIntensity * 0.4
    }

    // Ambient glow effect
    if (glowRef.current) {
      const glowPulse = 0.2 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
      glowRef.current.material.opacity = glowPulse * 0.3
    }
  })

  return (
    <group ref={terminalRef} {...props}>
      {/* Ambient Glow Sphere */}
      <Sphere ref={glowRef} args={[6]} position={[0, 0, -2]}>
        <meshBasicMaterial 
          color="#1e40af" 
          transparent 
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Terminal Shadow/Base */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.5, 32]} />
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.15} 
          roughness={1}
        />
      </mesh>

      {/* Main Terminal Body with enhanced materials */}
      <RoundedBox args={[5.2, 3.2, 0.2]} radius={0.12} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1e293b"
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={0.6}
        />
      </RoundedBox>

      {/* Terminal Screen Bezel */}
      <RoundedBox args={[4.8, 2.8, 0.06]} radius={0.06} smoothness={4} position={[0, 0, 0.1]}>
        <meshStandardMaterial 
          color="#0f172a"
          roughness={0.7}
          metalness={0.2}
        />
      </RoundedBox>

      {/* Terminal Screen with enhanced glow */}
      <mesh ref={screenRef} position={[0, 0, 0.14]}>
        <boxGeometry args={[4.6, 2.6, 0.02]} />
        <meshStandardMaterial 
          color="#020617"
          roughness={0.05}
          metalness={0.1}
          emissive="#001a33"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Enhanced Title Bar */}
      <RoundedBox args={[4.6, 0.45, 0.025]} radius={0.025} smoothness={4} position={[0, 1.08, 0.15]}>
        <meshStandardMaterial 
          color="#374151"
          roughness={0.3}
          metalness={0.4}
        />
      </RoundedBox>

      {/* Window Controls */}
      <group position={[-1.9, 1, 0.13]}>
        {/* Close button */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#ef4444" 
            roughness={0.2}
            metalness={0.1}
            emissive="#ff0000"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Minimize button */}
        <mesh position={[0.25, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#f59e0b"
            roughness={0.2}
            metalness={0.1}
            emissive="#ff8800"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Maximize button */}
        <mesh position={[0.5, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#10b981"
            roughness={0.2}
            metalness={0.1}
            emissive="#00ff44"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      {/* Brand Text on Terminal */}
      <Html
        transform
        position={[1.5, 1, 0.13]}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-gray-400 text-xs font-mono">
          Terminal v2.1
        </div>
      </Html>

      {/* Terminal Content */}
      <Html
        transform
        occlude
        position={[0, -0.1, 0.13]}
        style={{
          width: '420px',
          height: '220px',
          background: 'transparent',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 font-mono text-sm relative border border-slate-700/50 rounded">
          {/* Terminal Prompt Header */}
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-700/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-400 text-xs">bilal@portfolio</span>
            <span className="text-slate-600">~</span>
          </div>

          {/* Command History */}
          <div className="space-y-3">
            {/* Previous commands */}
            {commands.slice(Math.max(0, commandIndex - 2), commandIndex).map((cmd, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">$</span>
                  <span className="text-slate-200">{cmd.command}</span>
                </div>
                <div className={`text-xs ml-4 ${cmd.success ? 'text-green-400' : 'text-red-400'}`}>
                  {cmd.output}
                </div>
              </div>
            ))}

            {/* Current typing command */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">$</span>
                <span className="text-slate-200">{currentText}</span>
                <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
              </div>
              {currentText === commands[commandIndex]?.command && (
                <div className="text-green-400 text-xs ml-4 animate-fadeIn">
                  {commands[commandIndex]?.output}
                </div>
              )}
            </div>

            {/* System stats */}
            <div className="absolute bottom-2 right-3 text-xs text-slate-500 space-y-1">
              <div>CPU: 2.1%</div>
              <div>MEM: 1.2GB</div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </Html>

      {/* Subtle lighting effects */}
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[2, 1, 1]} intensity={0.3} color="#ffffff" />
    </group>
  )
}

export default function Terminal3D(props: Terminal3DProps) {
  return (
    <>
      <Environment preset="city" />
      <TerminalModel 
        scale={0.6} 
        position={[0, 0, 0]} 
        rotation={[0.15, -0.1, 0]}
        {...props} 
      />
    </>
  )
}
