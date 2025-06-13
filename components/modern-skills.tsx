"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Server, 
  GitBranch,
  Figma,
  Monitor
} from "lucide-react"

interface Skill {
  name: string
  category: string
  icon?: React.ReactNode
}

const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", icon: <Code className="h-5 w-5" /> },
  { name: "JavaScript", category: "Frontend", icon: <Code className="h-5 w-5" /> },
  { name: "HTML/CSS", category: "Frontend", icon: <Monitor className="h-5 w-5" /> },
  { name: "Tailwind CSS", category: "Frontend", icon: <Monitor className="h-5 w-5" /> },

  // Backend
  { name: "PHP", category: "Backend", icon: <Server className="h-5 w-5" /> },
  { name: "Python", category: "Backend", icon: <Server className="h-5 w-5" /> },

  // Database
  { name: "MySQL", category: "Database", icon: <Database className="h-5 w-5" /> },

  // Tools
  { name: "Git", category: "Tools", icon: <GitBranch className="h-5 w-5" /> },
  { name: "Figma", category: "Tools", icon: <Figma className="h-5 w-5" /> },
  { name: "VS Code", category: "Tools", icon: <Monitor className="h-5 w-5" /> },
  { name: "JetBrains IDE", category: "Tools", icon: <Monitor className="h-5 w-5" /> }
]

const categories = [
  { name: "Frontend", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Backend", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50 dark:bg-green-900/20" },
  { name: "Database", color: "from-purple-500 to-violet-500", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
  { name: "Tools", color: "from-orange-500 to-red-500", bgColor: "bg-orange-50 dark:bg-orange-900/20" }
]

export default function ModernSkills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels across various technologies and tools
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(skill => skill.category === category.name)
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className={`p-8 rounded-2xl ${category.bgColor} border border-white/20 backdrop-blur-sm`}
              >
                <h3 className={`text-2xl font-bold mb-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </h3>
                
                <div className="space-y-6">
                  {categorySkills.map((skill, skillIndex) => (                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      className="group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                          {skill.icon}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Technology Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Technology Stack Highlights
          </h3>
            <div className="flex flex-wrap justify-center gap-4">
            {["React", "JavaScript", "PHP", "Python", "Tailwind CSS", "MySQL"].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <span className="font-semibold text-gray-900 dark:text-white">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
