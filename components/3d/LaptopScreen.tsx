"use client"

import { motion } from "framer-motion"
import { Code, Sparkles, ArrowRight } from "lucide-react"

export default function LaptopScreen() {
  return (
    <div className="w-[1024px] h-[640px] bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg overflow-hidden border border-gray-700/50 shadow-2xl">
      {/* Screen Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-12 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-8 left-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-16 right-12 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-12 left-16 w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-8 right-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-1000" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
               }} />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center"
        >
          {/* Welcome Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Welcome to My Portfolio
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
              Full-Stack Developer & AI Explorer
            </p>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md mx-auto">
              Crafting digital experiences with modern technologies
            </p>
          </motion.div>

          {/* Animated CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex items-center justify-center gap-3 text-lg text-blue-400"
          >
            <Sparkles className="w-6 h-6" />
            <span>Explore My Work</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* Terminal-like indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-4 left-4 flex items-center gap-2"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-red-500 rounded-full" />
          </motion.div>

          {/* Status Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-4 right-4 text-lg text-green-400 font-mono"
          >
            ● Online
          </motion.div>
        </motion.div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-blue-400/5 pointer-events-none" />
      </div>
    </div>
  )
}
