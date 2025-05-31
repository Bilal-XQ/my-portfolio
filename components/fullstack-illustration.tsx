"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface CodeLine {
  text: string
  color: string
  delay: number
}

export default function FullStackIllustration() {
  const [currentLayer, setCurrentLayer] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const layers = [
    {
      title: "Frontend",
      icon: "🎨",
      color: "from-blue-400 to-cyan-400",
      code: [
        { text: "import React from 'react'", color: "text-purple-300", delay: 0 },
        { text: "const App = () => {", color: "text-blue-300", delay: 0.5 },
        { text: "  return (", color: "text-white", delay: 1 },
        { text: "    <div className='app'>", color: "text-green-300", delay: 1.5 },
        { text: "      <Header />", color: "text-yellow-300", delay: 2 },
        { text: "      <Main />", color: "text-yellow-300", delay: 2.5 },
        { text: "    </div>", color: "text-green-300", delay: 3 },
        { text: "  )", color: "text-white", delay: 3.5 },
        { text: "}", color: "text-blue-300", delay: 4 },
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      color: "from-green-400 to-emerald-400",
      code: [
        { text: "const express = require('express')", color: "text-purple-300", delay: 0 },
        { text: "const app = express()", color: "text-blue-300", delay: 0.5 },
        { text: "", color: "text-white", delay: 1 },
        { text: "app.get('/api/users', (req, res) => {", color: "text-green-300", delay: 1.5 },
        { text: "  const users = getUsersFromDB()", color: "text-yellow-300", delay: 2 },
        { text: "  res.json(users)", color: "text-cyan-300", delay: 2.5 },
        { text: "})", color: "text-green-300", delay: 3 },
        { text: "", color: "text-white", delay: 3.5 },
        { text: "app.listen(3000)", color: "text-blue-300", delay: 4 },
      ],
    },
    {
      title: "Database",
      icon: "🗄️",
      color: "from-orange-400 to-red-400",
      code: [
        { text: "SELECT users.name,", color: "text-purple-300", delay: 0 },
        { text: "       users.email,", color: "text-purple-300", delay: 0.5 },
        { text: "       profiles.bio", color: "text-purple-300", delay: 1 },
        { text: "FROM users", color: "text-blue-300", delay: 1.5 },
        { text: "JOIN profiles", color: "text-green-300", delay: 2 },
        { text: "  ON users.id = profiles.user_id", color: "text-green-300", delay: 2.5 },
        { text: "WHERE users.active = true", color: "text-yellow-300", delay: 3 },
        { text: "ORDER BY users.created_at DESC", color: "text-cyan-300", delay: 3.5 },
        { text: "LIMIT 10;", color: "text-orange-300", delay: 4 },
      ],
    },
  ]

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentLayer((prev) => (prev + 1) % layers.length)
    }, 6000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const currentLayerData = layers[currentLayer]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-[350px] h-[350px] mx-auto"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl transform rotate-3 translate-x-2 translate-y-2"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl transform -rotate-3 -translate-x-2 -translate-y-2"></div>

      {/* Main container */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl border border-blue-300/30 shadow-multilayer bg-deep-blue-darker/90 backdrop-blur-sm">
        {/* Header with layer indicator */}
        <div className="h-8 bg-deep-blue-lighter flex items-center justify-between px-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <motion.div
            key={currentLayer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs font-medium bg-gradient-to-r ${currentLayerData.color} bg-clip-text text-transparent flex items-center gap-1`}
          >
            <span>{currentLayerData.icon}</span>
            {currentLayerData.title}
          </motion.div>
        </div>

        {/* Code area */}
        <div className="p-4 h-[calc(100%-2rem)] flex flex-col justify-center">
          <motion.div
            key={currentLayer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {currentLayerData.code.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.3 }}
                className={`font-mono text-sm ${line.color} leading-relaxed`}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}
          </motion.div>

          {/* Animated cursor */}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="w-2 h-5 bg-blue-400 mt-2"
          />
        </div>

        {/* Layer indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {layers.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentLayer ? "bg-blue-400 scale-125" : "bg-blue-400/30"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-sm"
      >
        💻
      </motion.div>
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-sm"
      >
        🚀
      </motion.div>
    </motion.div>
  )
}
