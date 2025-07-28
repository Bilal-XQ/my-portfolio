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
  const [activeSection, setActiveSection] = useState("about") // Default to "about"
  const [scrolled, setScrolled] = useState(false)
  const [isManualNavigation, setIsManualNavigation] = useState(false)

  // Debug: Log sections on mount
  useEffect(() => {
    const checkSections = () => {
      console.log('🔍 Checking sections on mount:')
      navItems.forEach(item => {
        const sectionId = item.href.slice(1)
        const element = document.getElementById(sectionId)
        console.log(`- ${sectionId}:`, element ? '✅ Found' : '❌ Not found', element)
      })
    }
    
    // Check immediately and after a delay to ensure components are mounted
    checkSections()
    setTimeout(checkSections, 1000)
  }, [])
  useEffect(() => {
    // Handle scroll effects (navbar background)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Set up intersection observer for section detection
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px', // Adjust margins for better detection
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Skip if manual navigation is in progress
      if (isManualNavigation) {
        return
      }

      // Find the entry that's most visible
      let mostVisible = entries[0]
      for (const entry of entries) {
        if (entry.intersectionRatio > mostVisible.intersectionRatio) {
          mostVisible = entry
        }
      }

      // Update active section if we have a visible entry
      if (mostVisible && mostVisible.intersectionRatio > 0.1) {
        const sectionId = mostVisible.target.id
        if (sectionId && sectionId !== activeSection) {
          console.log(`Active section changed from "${activeSection}" to "${sectionId}" via intersection observer`)
          setActiveSection(sectionId)
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = navItems.map(item => item.href.slice(1))
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    // Add scroll listener for navbar background
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Initial setup
    handleScroll()
    
    // Cleanup function
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isManualNavigation, activeSection])
  // Reset manual navigation flag after a delay
  useEffect(() => {
    if (isManualNavigation) {
      const timer = setTimeout(() => {
        console.log('Resetting manual navigation flag')
        setIsManualNavigation(false)
      }, 1500) // Increased to 1.5s for better stability
      
      return () => clearTimeout(timer)
    }
  }, [isManualNavigation])  // Simple test scroll function
  const scrollToSection = (href: string) => {
    console.log(`🔄 TEST: scrollToSection called with: ${href}`)
    setIsOpen(false) // Close mobile menu
    
    const sectionId = href.slice(1)
    console.log(`🎯 TEST: Looking for section with ID: "${sectionId}"`)
    
    // Basic element finding
    const element = document.getElementById(sectionId)
    console.log(`📍 TEST: Found element:`, element)
    
    if (element) {
      console.log(`✅ TEST: Element found, attempting to scroll`)
      
      // Set manual navigation flag
      setIsManualNavigation(true)
      setActiveSection(sectionId)
      
      // Very simple scroll - just use element.scrollIntoView
      try {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
        console.log(`✅ TEST: scrollIntoView called successfully`)
      } catch (error) {
        console.error(`❌ TEST: scrollIntoView failed:`, error)
        
        // Fallback to window.scrollTo
        try {
          const rect = element.getBoundingClientRect()
          const scrollTop = window.pageYOffset + rect.top - 80
          window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          })
          console.log(`✅ TEST: window.scrollTo fallback used`)
        } catch (fallbackError) {
          console.error(`❌ TEST: window.scrollTo fallback failed:`, fallbackError)
        }
      }
    } else {
      console.error(`❌ TEST: No element found with ID "${sectionId}"`)
      
      // List all elements with IDs for debugging
      const allElementsWithIds = document.querySelectorAll('[id]')
      console.log(`� TEST: All elements with IDs:`, Array.from(allElementsWithIds).map(el => el.id))
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
                <span>{item.label}</span>
                
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
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Active Background */}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"
                    transition={{ 
                      type: "spring", 
                      bounce: 0.15, 
                      duration: 0.6 
                    }}
                  />
                )}
                
                {/* Hover Background */}
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Subtle underline indicator for active */}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
                    transition={{ 
                      type: "spring", 
                      bounce: 0.2, 
                      duration: 0.6 
                    }}
                  />
                )}
                
                {/* Magnetic Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08), transparent 70%)'
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 hover:bg-white/20"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 mx-4"
          >
            <div className="bg-black/20 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-2xl shadow-black/40">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault()
                      e.stopPropagation()
                      scrollToSection(item.href)
                    }}
                    className={cn(
                      "group relative w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                      activeSection === item.href.slice(1)
                        ? "text-white font-semibold bg-white/10 backdrop-blur-xl border border-white/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Active indicator */}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover gradient */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.08))'
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
