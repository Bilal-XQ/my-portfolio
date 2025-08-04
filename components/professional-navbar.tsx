"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, Code, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { 
    name: "About", 
    href: "#about", 
    icon: User,
    description: "Learn about me"
  },
  { 
    name: "Work", 
    href: "#projects", 
    icon: Briefcase,
    description: "View my projects"
  },
  { 
    name: "Skills", 
    href: "#skills", 
    icon: Code,
    description: "Technical expertise"
  },
  { 
    name: "Contact", 
    href: "#contact", 
    icon: Mail,
    description: "Get in touch"
  }
]

export default function ProfessionalNavbar() {
  const [activeSection, setActiveSection] = useState("about")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isManualNavigation, setIsManualNavigation] = useState(false)

  // Handle scroll detection and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
      
      // Don't update active section during manual navigation
      if (isManualNavigation) return

      // Find the current section based on scroll position
      const sections = navigationItems.map(item => ({
        id: item.href.slice(1),
        element: document.getElementById(item.href.slice(1))
      })).filter(section => section.element)

      if (sections.length === 0) {
        console.warn("No sections found with IDs:", navigationItems.map(item => item.href.slice(1)))
        return
      }

      let currentSection = sections[0]?.id || "about"

      for (const section of sections) {
        const rect = section.element!.getBoundingClientRect()
        const isVisible = rect.top <= 100 && rect.bottom >= 100
        
        if (isVisible) {
          currentSection = section.id
          break
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection, isManualNavigation])

  // Reset manual navigation flag after a delay
  useEffect(() => {
    if (isManualNavigation) {
      const timer = setTimeout(() => {
        setIsManualNavigation(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isManualNavigation])

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    setIsManualNavigation(true)
    
    const targetId = href.slice(1) // Remove the # from href
    console.log('Navigating to section:', targetId) // Debug log
    
    const targetElement = document.getElementById(targetId)
    console.log('Target element found:', targetElement) // Debug log
    
    if (targetElement) {
      setActiveSection(targetId)
      
      // Calculate proper scroll position
      const navbarHeight = 80
      const elementPosition = targetElement.offsetTop
      const offsetPosition = Math.max(0, elementPosition - navbarHeight - 20)
      
      console.log('Scrolling to position:', offsetPosition) // Debug log
      
      // Force scrolling with multiple approaches
      try {
        // Method 1: Standard window.scrollTo
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
        
        // Method 2: Fallback with requestAnimationFrame
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
        }, 50)
        
        // Method 3: Element scrollIntoView as backup
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          // Adjust for navbar after scrollIntoView
          setTimeout(() => {
            window.scrollBy(0, -(navbarHeight + 20))
          }, 300)
        }, 100)
        
      } catch (error) {
        console.error('Scrolling error:', error)
        // Ultimate fallback
        document.documentElement.scrollTop = offsetPosition
      }
      
    } else {
      console.warn(`Element with id "${targetId}" not found`)
      
      // Check if sections exist at all
      const allSections = document.querySelectorAll('section[id]')
      console.log('Available sections:', Array.from(allSections).map(s => s.id))
      
      // Fallback scrolling
      if (targetId === 'about') {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setActiveSection('about')
      }
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled 
            ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-black/20" 
            : "bg-gray-900/80 backdrop-blur-lg border-b border-gray-800/30"
        )}
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <a
                href="#about"
                onClick={(e) => handleNavClick("#about", e)}
                className="flex items-center space-x-2 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-white font-semibold text-lg tracking-tight group-hover:text-blue-400 transition-colors duration-200">
                  Bilal EL AZZAM
                </span>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.slice(1)
                  
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        console.log(`Navigating to ${item.href}`)
                        handleNavClick(item.href, e)
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group cursor-pointer",
                        isActive
                          ? "text-white bg-blue-600/20 shadow-lg shadow-blue-500/20"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4 transition-colors duration-200",
                        isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"
                      )} />
                      <span>{item.name}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/30"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                aria-expanded="false"
                aria-label="Toggle navigation menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-800/50 bg-gray-900/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.slice(1)
                  
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        console.log(`Mobile nav: Navigating to ${item.href}`)
                        handleNavClick(item.href, e)
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                        isActive
                          ? "text-white bg-blue-600/20 shadow-lg shadow-blue-500/20"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-blue-400" : "text-gray-400"
                      )} />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Body padding offset for fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}
