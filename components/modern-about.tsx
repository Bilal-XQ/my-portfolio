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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                👋 Hello, I'm
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Bilal EL AZZAM
              </h1>
            </motion.div>

            {/* Dynamic Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-16 flex items-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  |
                </motion.span>
              </h2>
            </motion.div>            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
            >              I enjoy turning ideas into functional, user-friendly websites through thoughtful design and well-structured code. Always learning and improving, I'm currently open to internship opportunities to further develop my skills and contribute to real-world projects.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative" ref={dropdownRef}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  onClick={() => setShowCVOptions(!showCVOptions)}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Preview CV
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </Button>                {/* CV Language Options Dropdown */}
                <AnimatePresence>
                  {showCVOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden min-w-[160px]"
                    >
                      <button
                        onClick={() => openCV('en')}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
                      >
                        <span className="text-lg">🇺🇸</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">English</span>
                      </button>
                      <div className="border-t border-gray-100 dark:border-gray-700" />
                      <button
                        onClick={() => openCV('fr')}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
                      >
                        <span className="text-lg">🇫🇷</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Français</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Code className="h-5 w-5 mr-2" />
                View Projects
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex gap-4 pt-6"
            >              <a
                href="https://github.com/Bilal-XQ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/bilalelazzam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="mailto:bilalelazzam.dev@gmail.com"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Laptop Hero Space */}
          <div className="relative h-96 lg:h-full min-h-[500px] flex items-center justify-center">
            {/* Dynamic import for client-side rendering */}
            <div className="w-full h-full">
              <Laptop3DScene inView={inView} className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </motion.div>        </motion.div>
      </div>
    </section>
  )
}
