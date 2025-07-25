"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileDown, ChevronDown, Code, ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { useState, useEffect } from "react"

const roles = ["Full-Stack Developer", "React Specialist", "TypeScript Enthusiast", "Problem Solver"]

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
                Your Name
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
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
            >
              Passionate about creating exceptional digital experiences through clean code, 
              innovative design, and cutting-edge technologies. Currently focused on React, 
              Next.js, and modern web development practices.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Learning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Dedication</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <a href="/BILAL_EL_AZZAM.pdf" download>
                  <FileDown className="h-5 w-5 mr-2" />
                  Download CV
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              
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
            >
              <a
                href="https://github.com/Bilal-XQ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
              >
                <Mail className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
            </motion.div>
          </motion.div>

          {/* Animated Hero Space - Content will be overlaid */}
          <div className="relative h-96 lg:h-full min-h-[500px] flex items-center justify-center">
            {/* Placeholder for animated hero component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mb-6">
                  <Code className="h-16 w-16 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Bringing ideas to life through code
                </p>
              </motion.div>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
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
