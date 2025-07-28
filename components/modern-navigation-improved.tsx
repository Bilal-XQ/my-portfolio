"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MouseEvent } from "react"

const navItems = [
  { name: "About", href: "#about", label: "About", icon: "👋" },
  { name: "Work", href: "#projects", label: "Work", icon: "💼" },
  { name: "Skills", href: "#skills", label: "Skills", icon: "⚡" },
  { name: "Contact", href: "#contact", label: "Contact", icon: "📧" }
]

export default function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [scrolled, setScrolled] = useState(false)
  const [isManualNavigation, setIsManualNavigation] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualNavigation) return

      let mostVisible = entries[0]
      for (const entry of entries) {
        if (entry.intersectionRatio > mostVisible.intersectionRatio) {
          mostVisible = entry
        }
      }

      if (mostVisible && mostVisible.intersectionRatio > 0.1) {
        const sectionId = mostVisible.target.id
        if (sectionId && sectionId !== activeSection) {
          setActiveSection(sectionId)
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = navItems.map(item => item.href.slice(1))
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isManualNavigation, activeSection])

  useEffect(() => {
    if (isManualNavigation) {
      const timer = setTimeout(() => {
        setIsManualNavigation(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isManualNavigation])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const sectionId = href.slice(1)
    const element = document.getElementById(sectionId)
    
    if (element) {
      setIsManualNavigation(true)
      setActiveSection(sectionId)
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Floating Navbar Container */}
      <motion.div
        className={cn(
          "relative px-8 py-5 mx-4 rounded-3xl transition-all duration-700 ease-out",
          "bg-gradient-to-r from-black/20 via-gray-900/30 to-black/20 backdrop-blur-3xl border border-white/20",
          "shadow-2xl shadow-black/50",
          scrolled 
            ? "bg-gradient-to-r from-black/40 via-gray-900/50 to-black/40 border-white/30 shadow-black/60" 
            : "bg-gradient-to-r from-black/15 via-gray-900/25 to-black/15 border-white/15"
        )}
        style={{
          boxShadow: scrolled 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 pointer-events-none" />
        
        <div className="relative flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ y: 0, scale: 0.95 }}
                onClick={(e: MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  scrollToSection(item.href)
                }}
                className={cn(
                  "relative px-6 py-3 text-sm font-medium rounded-2xl transition-all duration-500 group flex items-center gap-2",
                  activeSection === item.href.slice(1)
                    ? "text-white font-semibold bg-gradient-to-r from-blue-600/30 to-purple-600/30 shadow-lg shadow-blue-500/25"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                )}
              >
                <span className="text-xs opacity-80">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
                
                {/* Active indicator */}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-6 rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/20 shadow-2xl"
          >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  onClick={(e: MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToSection(item.href)
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3",
                    activeSection === item.href.slice(1)
                      ? "text-white bg-gradient-to-r from-blue-600/30 to-purple-600/30 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
