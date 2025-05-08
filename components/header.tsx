"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Home, User, Briefcase, Code, Users, Calendar, ImageIcon, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "About", href: "#about", icon: <User className="h-5 w-5" /> },
  { name: "Education", href: "#education", icon: <Calendar className="h-5 w-5" /> },
  { name: "Projects", href: "#projects", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Skills", href: "#skills", icon: <Code className="h-5 w-5" /> },
  { name: "Activities", href: "#clubs-activities", icon: <Users className="h-5 w-5" /> },
  { name: "Gallery", href: "#design-gallery", icon: <ImageIcon className="h-5 w-5" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="h-5 w-5" /> },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      // Add a small delay to ensure smooth scrolling after menu closes
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
        setActiveSection(href.substring(1))
      }, 100)
    }
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
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-deep-blue-lighter/30 backdrop-blur-sm rounded-full px-2 py-1 border border-blue-300/10">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "text-gray-200 hover:text-white hover:bg-blue-900/30 rounded-full px-4 relative",
                activeSection === item.href.substring(1) && "text-white bg-blue-900/40",
              )}
              onClick={() => scrollToSection(item.href)}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 0.3 }}
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
