"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileDown, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import FullStackIllustration from "./fullstack-illustration"

const roles = ["Future Full-Stack Developer", "Creative Designer", "Cybersecurity Enthusiast", "AI Explorer"]

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const currentRole = roles[roleIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1))
        setTypingSpeed(150)

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
    <section id="about" ref={ref} className="min-h-screen flex flex-col justify-center pt-20 pb-16 relative">
      <div className="section-bg">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Bilal
              </span>
            </motion.h1>

            <div className="h-12 mb-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl text-blue-300 flex items-center justify-center lg:justify-start">
                <span className="mr-2">I'm a</span>
                <span className="relative min-w-[200px] text-left">
                  {displayText}
                  <span className="absolute right-[-4px] top-0 h-full w-[2px] bg-blue-300 animate-blink"></span>
                </span>
              </h2>
            </div>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A passionate first-year Computer Science student with a strong background in graphic design. I'm eager to
              apply my creative and technical skills in a full-stack developer internship where I can grow and
              contribute to meaningful projects.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:shadow-glow transition-all duration-300 transform hover:scale-105 min-h-[50px] rounded-full px-8"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-white hover:bg-blue-500/10 hover:shadow-glow transition-all duration-300 transform hover:scale-105 min-h-[50px] rounded-full px-8"
                asChild
              >
                <a href="/resume.pdf" download>
                  <FileDown className="mr-2 h-5 w-5" /> Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <FullStackIllustration />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="animate-bounce text-white/70 hover:text-white hover:bg-transparent"
            onClick={() => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to education section"
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
