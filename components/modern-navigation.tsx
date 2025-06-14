"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" }
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200/20" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection("#about")}
          >
            Portfolio
          </motion.div>          {/* Desktop Navigation */}          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log(`🖱️ Clicking navigation item: ${item.name} -> ${item.href}`)
                  scrollToSection(item.href)
                }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-500 ease-out",
                  activeSection === item.href.slice(1)
                    ? "text-blue-600 dark:text-blue-400 font-semibold transform scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-105"
                )}
              >
                {item.name}{activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50/80 to-blue-50 dark:from-blue-900/30 dark:via-blue-900/20 dark:to-blue-900/30 rounded-lg border border-blue-200/50 dark:border-blue-700/50 shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={{ 
                      type: "spring", 
                      bounce: 0.15, 
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                )}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full shadow-sm"
                    transition={{ 
                      type: "spring", 
                      bounce: 0.2, 
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/20"
          >            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log(`📱 Clicking mobile navigation item: ${item.name} -> ${item.href}`)
                    scrollToSection(item.href)
                  }}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-out relative transform",
                    activeSection === item.href.slice(1)
                      ? "bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold border-l-4 border-blue-600 dark:border-blue-400 scale-105 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 hover:translate-x-1"
                  )}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
