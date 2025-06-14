"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

interface Skill {
  name: string
  icon: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
  color: string
  description: string
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    color: "from-blue-500 via-cyan-500 to-teal-500",
    description: "Building responsive and interactive user interfaces",
    skills: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" }
    ]
  },
  {
    name: "Backend",
    color: "from-green-500 via-emerald-500 to-teal-500",
    description: "Server-side development and APIs",
    skills: [
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" }
    ]
  },
  {
    name: "Programming Languages",
    color: "from-purple-500 via-violet-500 to-indigo-500",
    description: "Core programming and algorithmic thinking",
    skills: [
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" }
    ]
  },
  {
    name: "Database",
    color: "from-amber-500 via-orange-500 to-red-500",
    description: "Data storage and management",
    skills: [
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    name: "Tools",
    color: "from-rose-500 via-pink-500 to-purple-500",
    description: "Development tools and productivity software",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "IntelliJ IDEA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" },
      { name: "PyCharm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg" },
      { name: "CLion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clion/clion-original.svg" },
      { name: "PhpStorm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/phpstorm/phpstorm-original.svg" }
    ]
  }
]

export default function ModernSkills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Technologies, frameworks, and tools I use to create exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div ref={ref} className="space-y-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: categoryIndex * 0.2 }}
              className="space-y-10"
            >
              {/* Category Header */}
              <div className="text-center space-y-4">
                <h3 className={`text-4xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>
                {/* Skills Grid - Centered Layout */}
              <div className="flex justify-center items-center min-h-[200px] w-full">
                <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: (categoryIndex * 0.2) + (skillIndex * 0.1),
                        type: "spring",
                        stiffness: 100,
                        damping: 10                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -10,
                        transition: { duration: 0.3, type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Icon Container with Clean Design */}
                      <div className="relative">                        <div className={`
                          w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                          rounded-2xl 
                          bg-white dark:bg-gray-800
                          border border-gray-200 dark:border-gray-700
                          shadow-lg
                          group-hover:shadow-2xl
                          group-hover:shadow-blue-500/25
                          transition-all duration-100 group-hover:duration-300
                          flex items-center justify-center
                          p-4
                          backdrop-blur-sm
                          group-hover:border-transparent
                          relative
                          overflow-hidden
                        `}>                          {/* Gradient overlay on hover */}
                          <div className={`
                            absolute inset-0 
                            bg-gradient-to-br ${category.color}
                            opacity-0 group-hover:opacity-10
                            transition-opacity duration-75 group-hover:duration-300
                            rounded-2xl
                          `} />
                            {/* Icon */}
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-full h-full object-contain relative z-10 filter group-hover:drop-shadow-lg transition-all duration-100 group-hover:duration-300"
                            loading="lazy"
                          />
                            {/* Subtle glow effect */}
                          <div className={`
                            absolute inset-0 
                            bg-gradient-to-br ${category.color}
                            opacity-0 group-hover:opacity-20
                            blur-xl
                            transition-opacity duration-75 group-hover:duration-300
                            -z-10
                          `} />
                        </div>                        {/* Skill Name Tooltip */}                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ 
                            opacity: hoveredSkill === skill.name ? 1 : 0,
                            y: hoveredSkill === skill.name ? 0 : 10,
                            scale: hoveredSkill === skill.name ? 1 : 0.9
                          }}
                          transition={{ 
                            duration: hoveredSkill === skill.name ? 0.2 : 0.05,
                            ease: "easeOut" 
                          }}
                          className={`
                            absolute -bottom-12 left-1/2 transform -translate-x-1/2
                            px-4 py-2 
                            bg-gray-900 dark:bg-gray-100 
                            text-white dark:text-gray-900
                            text-sm font-medium
                            rounded-xl
                            whitespace-nowrap
                            shadow-xl
                            pointer-events-none
                            z-20
                            backdrop-blur-sm
                            border border-gray-700 dark:border-gray-300
                            ${hoveredSkill === skill.name ? 'block' : 'hidden'}
                          `}
                        >
                          {skill.name}
                          {/* Tooltip Arrow */}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45 border-l border-t border-gray-700 dark:border-gray-300"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-24 text-center"
        >
          <motion.div
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="inline-block"
          >
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-8 py-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-all duration-300">
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Always learning and exploring new technologies
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
