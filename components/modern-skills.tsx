"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"

interface Skill {
  name: string
  icon: string
  category: string
  x: number
  y: number
  size: number
  color: string
}

// Flatten all skills into a single array with positions for constellation view
const allSkills: Skill[] = [
  // Frontend
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", category: "Frontend", x: 15, y: 25, size: 80, color: "#1A4B7F" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", category: "Frontend", x: 35, y: 15, size: 75, color: "#1A4B7F" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "Frontend", x: 25, y: 45, size: 85, color: "#1A4B7F" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend", x: 45, y: 35, size: 70, color: "#1A4B7F" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "Frontend", x: 55, y: 20, size: 90, color: "#1A4B7F" },
  
  // Backend & Languages
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", category: "Backend", x: 75, y: 30, size: 80, color: "#2B6BA5" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", category: "Language", x: 85, y: 15, size: 75, color: "#2B6BA5" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "Language", x: 65, y: 45, size: 85, color: "#2B6BA5" },
  
  // Database
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "Database", x: 15, y: 70, size: 80, color: "#1A4B7F" },
  
  // Tools
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "Tools", x: 35, y: 65, size: 70, color: "#2B6BA5" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", category: "Tools", x: 55, y: 75, size: 75, color: "#2B6BA5" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", category: "Tools", x: 25, y: 85, size: 65, color: "#1A4B7F" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", category: "Tools", x: 75, y: 70, size: 80, color: "#2B6BA5" },
  { name: "IntelliJ IDEA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg", category: "Tools", x: 85, y: 55, size: 70, color: "#1A4B7F" },
  { name: "PyCharm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg", category: "Tools", x: 45, y: 85, size: 65, color: "#2B6BA5" },
  { name: "CLion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clion/clion-original.svg", category: "Tools", x: 65, y: 85, size: 60, color: "#1A4B7F" },
  { name: "PhpStorm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/phpstorm/phpstorm-original.svg", category: "Tools", x: 85, y: 85, size: 60, color: "#2B6BA5" }
]

export default function ModernSkills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('skills-constellation')?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }

    const constellation = document.getElementById('skills-constellation')
    if (constellation) {
      constellation.addEventListener('mousemove', handleMouseMove)
      return () => constellation.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/10 via-transparent to-blue-secondary/10" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-primary via-blue-secondary to-text-primary bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            Technical Skills
          </motion.h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Technologies, frameworks, and tools I use to create exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Constellation */}
        <div ref={ref} className="relative">
          <motion.div
            id="skills-constellation"
            className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] rounded-3xl bg-gradient-to-br from-black-tertiary/30 via-transparent to-black-secondary/30 backdrop-blur-sm border border-blue-primary/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Animated Grid Lines */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(26,75,127,0.1)_25px,rgba(26,75,127,0.1)_26px,transparent_27px),linear-gradient(rgba(26,75,127,0.1)_24px,transparent_25px,transparent_26px,rgba(26,75,127,0.1)_27px)] bg-[size:50px_50px]" />
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {allSkills.map((skill, i) => 
                allSkills.slice(i + 1).map((otherSkill, j) => {
                  const distance = Math.sqrt(
                    Math.pow(skill.x - otherSkill.x, 2) + 
                    Math.pow(skill.y - otherSkill.y, 2)
                  )
                  
                  if (distance < 25) {
                    return (
                      <motion.line
                        key={`${skill.name}-${otherSkill.name}`}
                        x1={`${skill.x}%`}
                        y1={`${skill.y}%`}
                        x2={`${otherSkill.x}%`}
                        y2={`${otherSkill.y}%`}
                        stroke={skill.color}
                        strokeWidth="1"
                        opacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={inView ? { pathLength: 1 } : {}}
                        transition={{ 
                          duration: 2, 
                          delay: (i + j) * 0.1,
                          ease: "easeInOut" 
                        }}
                      />
                    )
                  }
                  return null
                })
              )}
            </svg>

            {/* Skills Nodes */}
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="absolute cursor-pointer group"
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  scale: 1.2,
                  zIndex: 10
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill Node */}
                <motion.div
                  className="relative"
                  style={{ width: skill.size, height: skill.size }}
                >
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      backgroundColor: skill.color,
                      transform: 'scale(1.5)'
                    }}
                  />
                  
                  {/* Node Container */}
                  <div className="relative w-full h-full bg-black-tertiary/80 backdrop-blur-sm rounded-full border-2 border-blue-primary/30 group-hover:border-blue-primary/60 transition-all duration-300 flex items-center justify-center p-3">
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Skill Name Tooltip */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      y: hoveredSkill === skill.name ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black-primary/90 backdrop-blur-sm text-text-primary px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-blue-primary/30">
                      {skill.name}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black-primary/90 rotate-45 border-l border-t border-blue-primary/30"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            {/* Interactive Cursor Effect */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-32 h-32 bg-gradient-to-r from-blue-primary/20 to-blue-secondary/20 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block cursor-pointer"
          >
            <div className="relative bg-gradient-to-r from-blue-primary/20 to-blue-secondary/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-blue-primary/30 hover:border-blue-primary/50 transition-all duration-300">
              <span className="text-lg font-semibold text-text-primary">
                Always learning and exploring new technologies
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-primary/5 to-blue-secondary/5 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
