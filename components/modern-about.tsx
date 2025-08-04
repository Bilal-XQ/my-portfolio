"use client"

import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Eye, ChevronDown, Code, ArrowRight, Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

// Dynamically import the 3D component for client-side rendering
const Laptop3DScene = dynamic(() => import("@/components/3d/Laptop3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
        <Code className="h-16 w-16 text-white" />
      </div>
    </div>
  )
})

const roles = ["Full-Stack Developer", "AI Explorer", "Cybersecurity Enthusiast", "Computer Science Student", "Graphic Designer"]

export default function ModernAbout() {  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [showCVOptions, setShowCVOptions] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Function to open CV in new tab
  const openCV = (language: 'en' | 'fr') => {
    const cvPath = language === 'en' ? '/BILAL_EL_AZZAM_CV_EN.pdf' : '/BILAL_EL_AZZAM_CV_FR.pdf'
    window.open(cvPath, '_blank')
    setShowCVOptions(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCVOptions(false)
      }
    }

    if (showCVOptions) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCVOptions])

  useEffect(() => {
    const currentRole = roles[roleIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1))
        setTypingSpeed(100)

        if (displayText.length === currentRole.length) {
          setTypingSpeed(2000)
          setIsDeleting(true)
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1))
        setTypingSpeed(50)

        if (displayText.length === 0) {
          setIsDeleting(false)
          setRoleIndex((roleIndex + 1) % roles.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section 
      id="about" 
      ref={ref} 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Enhanced CSS Grid Layout - 45% content, 55% 3D laptop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[700px]">
          {/* Content - Takes up 5 columns (42%) on large screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8 max-w-none relative z-10"
          >
            {/* Available Status - Fade in from top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                  Available for opportunities
                </span>
              </div>
              
              {/* Enhanced Name Typography - Scale animation, NO underline */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight"
              >
                Bilal EL AZZAM
              </motion.h1>
            </motion.div>

            {/* Enhanced Dynamic Role with slide in from left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="h-16 flex items-center"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="text-blue-600 dark:text-blue-400 ml-1"
                >
                  |
                </motion.span>
              </h2>
            </motion.div>

            {/* Enhanced Description - Slide up from bottom */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-xl"
              style={{ lineHeight: '1.6' }}
            >
              I enjoy turning ideas into functional, user-friendly websites through thoughtful design and well-structured code. Always learning and improving, I'm currently open to internship opportunities to further develop my skills and contribute to real-world projects.
            </motion.p>

            {/* Redesigned Action Buttons - Staggered slide up */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Primary Button - Preview CV */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCVOptions(!showCVOptions)}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 will-change-transform"
                  style={{ borderRadius: '8px' }}
                >
                  <ExternalLink className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                  <span>Preview CV</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </motion.button>

                {/* Enhanced CV Language Options Dropdown */}
                <AnimatePresence>
                  {showCVOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-3 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden min-w-[180px]"
                      style={{ borderRadius: '8px' }}
                    >
                      <button
                        onClick={() => openCV('en')}
                        className="w-full px-5 py-4 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left group"
                      >
                        <span className="text-lg">🇺🇸</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">English</span>
                      </button>
                      <div className="border-t border-gray-100 dark:border-gray-700" />
                      <button
                        onClick={() => openCV('fr')}
                        className="w-full px-5 py-4 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left group"
                      >
                        <span className="text-lg">🇫🇷</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Français</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Secondary Button - View Projects */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold transition-all duration-300 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 will-change-transform"
                style={{ borderRadius: '8px' }}
              >
                <Code className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                
                {/* Hover background effect */}
                <div className="absolute inset-0 rounded-lg bg-blue-50 dark:bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
              className="flex gap-4 pt-8"
            >
              <motion.a
                href="https://github.com/Bilal-XQ"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 will-change-transform"
              >
                <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/bilalelazzam"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 will-change-transform"
              >
                <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </motion.a>
              <motion.a
                href="mailto:bilalelazzam.dev@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 will-change-transform"
              >
                <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 3D Laptop Hero Space - Takes up 7 columns (58%) on large screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
            className="lg:col-span-7 relative h-96 lg:h-full min-h-[600px] flex items-center justify-center overflow-visible"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* 3D Laptop Container with proper spacing */}
            <div className="w-full h-full max-w-none overflow-visible will-change-transform">
              <Laptop3DScene inView={inView} className="w-full h-full overflow-visible" />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.0, ease: "easeOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              Scroll to explore
            </span>
            <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Ensure 3D laptop container has proper overflow */
        .overflow-visible {
          overflow: visible !important;
        }
        
        /* Hardware acceleration for animations */
        .will-change-transform {
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </section>
  )
}
