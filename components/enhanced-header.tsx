"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Home, User, Briefcase, Code, Users, Calendar, ImageIcon, Mail, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "About", href: "#about", icon: <User className="h-4 w-4" /> },
  { name: "Education", href: "#education", icon: <Calendar className="h-4 w-4" /> },
  { name: "Projects", href: "#projects", icon: <Briefcase className="h-4 w-4" /> },
  { name: "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
  { name: "Activities", href: "#clubs-activities", icon: <Users className="h-4 w-4" /> },
  { name: "Gallery", href: "#design-gallery", icon: <ImageIcon className="h-4 w-4" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
]

export default function EnhancedHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setIsScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)

      // Determine active section
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

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

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

  // Close mobile menu when screen size changes
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
      animate={{
        opacity: 1,
        y: isVisible ? 0 : -100,
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen
          ? "bg-deep-blue-darker/95 backdrop-blur-md py-2 shadow-lg border-b border-blue-300/10"
          : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Home button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-900/30 rounded-full min-h-[44px] min-w-[44px] relative group"
            onClick={() => scrollToSection("#about")}
          >
            <Home className="h-5 w-5" />
            <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-deep-blue-lighter/30 backdrop-blur-sm rounded-full px-3 py-2 border border-blue-300/10">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className={cn(
                  "text-gray-200 hover:text-white hover:bg-blue-900/30 rounded-full px-4 py-2 relative transition-all duration-200",
                  activeSection === item.href.substring(1) && "text-white bg-blue-900/40",
                )}
                onClick={() => scrollToSection(item.href)}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "50%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-blue-900/30 rounded-full min-h-[44px] min-w-[44px] relative group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-deep-blue-darker/98 backdrop-blur-md z-40 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      className={cn(
                        "w-full flex items-center gap-4 py-4 px-6 text-lg font-medium text-gray-200 hover:text-white hover:bg-blue-900/30 rounded-xl transition-all duration-200 group",
                        activeSection === item.href.substring(1) &&
                          "bg-blue-900/40 text-white border-l-4 border-blue-400",
                      )}
                      onClick={() => scrollToSection(item.href)}
                    >
                      <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-200">
                        {item.icon}
                      </div>
                      <span className="flex-1 text-left">{item.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Mobile menu footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-8 pt-8 border-t border-blue-300/20 text-center"
              >
                <p className="text-gray-400 text-sm">© 2024 Bilal EL AZZAM</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
