"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Home, User, Briefcase, Code, Calendar, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "About", href: "#about", icon: <User className="h-5 w-5" /> },
  { name: "Education", href: "#education", icon: <Calendar className="h-5 w-5" /> },
  { name: "Projects", href: "#projects", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Skills", href: "#skills", icon: <Code className="h-5 w-5" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="h-5 w-5" /> },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isManualNavigation, setIsManualNavigation] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    // Intersection Observer for accurate section detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    }

    const sectionsMap = new Map()
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualNavigation) {
        return
      }

      entries.forEach((entry: IntersectionObserverEntry) => {
        sectionsMap.set(entry.target.id, {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          boundingClientRect: entry.boundingClientRect
        })
      })

      let bestSection = null
      let bestScore = -1

      sectionsMap.forEach((data, sectionId) => {
        if (data.isIntersecting) {
          const rect = data.boundingClientRect
          const viewportHeight = window.innerHeight
          
          const visibleTop = Math.max(0, -rect.top)
          const visibleBottom = Math.min(rect.height, viewportHeight - rect.top)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const visibilityRatio = visibleHeight / rect.height
          
          const topProximity = rect.top <= 100 ? 1 : Math.max(0, 1 - (rect.top - 100) / viewportHeight)
          const score = (visibilityRatio * 0.6) + (data.intersectionRatio * 0.2) + (topProximity * 0.2)
          
          if (score > bestScore) {
            bestScore = score
            bestSection = sectionId
          }
        }
      })

      if (bestSection) {
        setActiveSection(bestSection)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = navItems.map((item) => item.href.substring(1))
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
        sectionsMap.set(sectionId, { isIntersecting: false, intersectionRatio: 0 })
      }
    })

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Don't update active section immediately after manual navigation
      if (isManualNavigation) {
        return
      }

      // Determine active section based on scroll position
      const scrollY = window.scrollY
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = scrollY + rect.top
          
          if (scrollY >= elementTop - 200) {
            const currentActive = sections[i]
            if (currentActive !== activeSection) {
              setActiveSection(currentActive)
            }
            break
          }
        }
      }
    }    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    
    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [isManualNavigation, activeSection])

  // Reset manual navigation flag after a delay
  useEffect(() => {
    if (isManualNavigation) {
      const timer = setTimeout(() => {
        setIsManualNavigation(false)
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [isManualNavigation])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileMenuOpen])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }, [isMobile, mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Enhanced scroll to section with better error handling and positioning
  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    
    // Immediately set the active section when clicked
    const sectionId = href.substring(1)
    setActiveSection(sectionId)
    setIsManualNavigation(true)
    
    // Wait a small amount to ensure state is updated
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        // Calculate the exact position accounting for the fixed header
        const headerOffset = 100 // Account for fixed header height + padding
        const elementRect = element.getBoundingClientRect()
        const elementPosition = elementRect.top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        // Ensure we don't scroll past the top of the page
        const finalPosition = Math.max(0, offsetPosition)

        // Use a more reliable scrolling method
        window.scrollTo({
          top: finalPosition,
          behavior: "smooth"
        })
        
        // Also update the URL hash without triggering a jump
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href)
        }
      } else {
        console.warn(`Element with selector "${href}" not found`)
      }
    }, 50) // Small delay to ensure state updates are processed
  }

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-deep-blue-darker/95 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4",
        mobileMenuOpen && "bg-deep-blue-darker/95 backdrop-blur-md",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-900/30 rounded-full min-h-[44px] min-w-[44px]"
          onClick={() => scrollToSection("#about")}
        >
          <Home className="h-5 w-5" />
        </Button>        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-deep-blue-lighter/30 backdrop-blur-sm rounded-full px-2 py-1 border border-blue-300/10">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "text-gray-200 hover:text-white hover:bg-blue-900/30 rounded-full px-4 relative transition-all duration-300 ease-out transform hover:scale-105",
                activeSection === item.href.substring(1) && "text-white bg-gradient-to-r from-blue-900/50 to-blue-800/40 scale-105 shadow-lg",
              )}
              onClick={() => scrollToSection(item.href)}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full shadow-sm"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "50%", opacity: 1 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                />
              )}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-blue-900/30 rounded-full min-h-[44px] min-w-[44px]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-deep-blue-darker/95 backdrop-blur-md z-40 flex flex-col p-4 overflow-y-auto"
          >
            <div className="flex flex-col space-y-2 py-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "mobile-nav-item flex items-center gap-3",
                    activeSection === item.href.substring(1) && "mobile-nav-active",
                  )}
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.icon}
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
