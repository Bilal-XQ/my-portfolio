"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

interface Skill {
  name: string
  icon: string
  color: string
}

const skills: Skill[] = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "#000000" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
  { name: "C", icon: "https://img.icons8.com/color/48/c-programming.png", color: "#A8B9CC" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", color: "#777BB4" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", color: "#4479A1" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "#F05032" },
  { name: "GitHub", icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IiBzdHlsZT0iZmlsbDojMUExQTFBOyI+PGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgdHJhbnNmb3JtPSJzY2FsZSg1LjMzMzMzLDUuMzMzMzMpIj48cGF0aCBkPSJNNDQsMjRjMCw4Ljk2IC01Ljg4LDE2LjU0IC0xNCwxOS4wOHYtNS4wOGMwLC0xLjcxIC0wLjcyLC0zLjI0IC0xLjg2LC00LjM0YzUuMjQsLTAuOTUgNy44NiwtNCA3Ljg2LC05LjY2YzAsLTIuNDUgLTAuNSwtNC4zOSAtMS40OCwtNS45YzAuNDQsLTEuNzEgMC43LC00LjE0IC0wLjUyLC02LjFjLTIuMzYsMCAtNC4wMSwxLjM5IC00Ljk4LDIuNTNjLTEuNDUsLTAuMzUgLTMuMTIsLTAuNTMgLTUuMDIsLTAuNTNjLTEuOCwwIC0zLjQ2LDAuMiAtNC45NCwwLjYxYy0wLjk2LC0xLjE1IC0yLjY0LC0yLjYxIC01LjA2LC0yLjYxYy0xLjQyLDIuMjggLTAuODQsNC43NCAtMC4zLDYuMTJjLTEuMDgsMS41MSAtMS43LDMuNDUgLTEuNyw1Ljg4YzAsNS42NiAyLjYyLDguNzEgNy44Niw5LjY2Yy0wLjY3LDAuNjUgLTEuMTksMS40NCAtMS41MSwyLjM0aC0yLjM1Yy0xLjQ0LDAgLTIsLTAuNjQgLTIuNzcsLTEuNjhjLTAuNzcsLTEuMDQgLTEuNiwtMS43NCAtMi41OSwtMi4wM2MtMC41MywtMC4wNiAtMC44OSwwLjM3IC0wLjQyLDAuNzVjMS41NywxLjEzIDEuNjgsMi45OCAyLjMxLDQuMTljMC41NywxLjA5IDEuNzUsMS43NyAzLjA4LDEuNzdoMi4zOXY0LjA4Yy04LjEyLC0yLjU0IC0xNCwtMTAuMTIgLTE0LC0xOS4wOGMwLC0xMS4wNSA4Ljk1LC0yMCAyMCwtMjBjMTEuMDUsMCAyMCw4Ljk1IDIwLDIweiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+", color: "#181717" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", color: "#F24E1E" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", color: "#007ACC" },
  { name: "JetBrains IDEs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jetbrains/jetbrains-original.svg", color: "#000000" }
]

export default function ModernSkills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Tech Stack ⚡
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Technologies, frameworks, and tools I use to create exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 sm:gap-6 lg:gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative group"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Icon Container */}
              <motion.div
                whileHover={{ 
                  scale: 1.15, 
                  y: -8,
                  rotateY: 15 
                }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square w-full max-w-[80px] mx-auto p-4 rounded-2xl glass-card group-hover:glass-card-hover transition-all duration-300 cursor-pointer"
                style={{
                  background: hoveredSkill === skill.name 
                    ? `radial-gradient(circle at center, ${skill.color}15, transparent 70%)` 
                    : 'rgba(31, 31, 31, 0.6)'
                }}
              >
                {/* Icon */}
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain transition-all duration-300 group-hover:drop-shadow-lg"
                  style={{
                    filter: hoveredSkill === skill.name 
                      ? `drop-shadow(0 0 8px ${skill.color}60)` 
                      : 'none'
                  }}
                />

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`,
                    filter: 'blur(8px)'
                  }}
                />

                {/* Magnetic Effect Background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}10, transparent 50%, ${skill.color}05)`,
                  }}
                />
              </motion.div>

              {/* Floating Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ 
                  opacity: hoveredSkill === skill.name ? 1 : 0,
                  y: hoveredSkill === skill.name ? -15 : 10,
                  scale: hoveredSkill === skill.name ? 1 : 0.8
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
              >
                <div 
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-white shadow-lg backdrop-blur-md border border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}90, ${skill.color}70)`,
                  }}
                >
                  {skill.name}
                  {/* Tooltip Arrow */}
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{ background: skill.color }}
                  />
                </div>
              </motion.div>

              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                animate={hoveredSkill === skill.name ? {
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0]
                } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  background: `radial-gradient(circle, ${skill.color}30, transparent 70%)`,
                  filter: 'blur(4px)'
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  )
}
