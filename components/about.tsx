"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileDown, ChevronDown, Code } from "lucide-react"
import { useState, useEffect } from "react"

const roles = ["Future Full-Stack Developer", "Graphic Designer", "Cybersecurity Enthusiast", "AI Explorer"]

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
          // Wait before starting to delete
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
    <section id="about" ref={ref} className="mobile-safe-height flex flex-col justify-center pt-24 pb-16 relative">
      <div className="section-bg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:text-left text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">Bilal</span>
            </h1>

            <div className="h-10 mb-8">
              <h2 className="text-xl sm:text-2xl text-blue-300 inline-flex items-center">
                <span className="mr-2">I'm a</span>
                <span className="relative">
                  {displayText}
                  <span className="absolute right-[-4px] top-0 h-full w-[2px] bg-blue-300 animate-blink"></span>
                </span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl md:mx-0 mx-auto">
              A passionate first-year Computer Science student with a strong background in graphic design. I'm eager to
              apply my creative and technical skills in a full-stack developer internship where I can grow and
              contribute to meaningful projects.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row md:justify-start justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 hover:shadow-glow transition-all duration-300 transform hover:scale-105 min-h-[50px] rounded-full"
                asChild
              >
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-white hover:bg-blue-500/10 hover:shadow-glow transition-all duration-300 transform hover:scale-105 min-h-[50px] rounded-full"
                asChild
              >
                <a href="BILAL_EL_AZZAM.pdf" download>
                  <FileDown className="mr-2 h-5 w-5" /> Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex justify-end"
          >
            <div className="relative w-[300px] h-[300px]">
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg transform rotate-3 translate-x-2 translate-y-2"></div>
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg transform -rotate-3 -translate-x-2 -translate-y-2"></div>
              <div className="relative w-full h-full overflow-hidden rounded-lg border border-blue-300/30 shadow-multilayer bg-deep-blue-darker/80 flex items-center justify-center">
                <div className="text-center p-6">
                  <Code className="h-16 w-16 text-blue-400 mb-4 mx-auto" />
                  <p className="text-blue-200 text-lg font-mono">
                    <span className="text-green-400">const</span> <span className="text-yellow-300">developer</span> ={" "}
                    {"{"}
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-300">creative:</span>{" "}
                    <span className="text-green-300">true</span>,
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-300">passionate:</span>{" "}
                    <span className="text-green-300">true</span>,
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-300">learning:</span>{" "}
                    <span className="text-green-300">true</span>
                    <br />
                    {"}"};
                  </p>
                </div>
              </div>
            </div>
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
