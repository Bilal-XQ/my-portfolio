"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-card"
import { Code, Terminal, Wrench, Palette, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SkillGroup {
  name: string
  icon: React.ReactNode
  skills: {
    name: string
    icon: string
  }[]
}

const skillGroups: SkillGroup[] = [
  {
    name: "Web Development",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "HTML", icon: "🌐" },
      { name: "CSS", icon: "🎨" },
      { name: "JavaScript", icon: "📜" },
      { name: "PHP", icon: "🐘" },
      { name: "SQL", icon: "🗃️" },
    ],
  },
  {
    name: "Programming",
    icon: <Terminal className="h-5 w-5" />,
    skills: [
      { name: "C", icon: "⚙️" },
      { name: "Python", icon: "🐍" },
    ],
  },
  {
    name: "Tools & IDEs",
    icon: <Wrench className="h-5 w-5" />,
    skills: [
      { name: "IntelliJ IDEA", icon: "💻" },
      { name: "CLion", icon: "🔧" },
      { name: "PyCharm", icon: "🐍" },
      { name: "VS Code", icon: "📝" },
      { name: "MySQL Workbench", icon: "🗄️" },
    ],
  },
  {
    name: "Design",
    icon: <Palette className="h-5 w-5" />,
    skills: [
      { name: "Canva", icon: "🎨" },
      { name: "Figma", icon: "✏️" },
    ],
  },
]

export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [expandedGroup, setExpandedGroup] = useState<number | null>(0)

  const toggleGroup = (index: number) => {
    setExpandedGroup(expandedGroup === index ? null : index)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" ref={ref} className="py-16">
      <div className="section-bg">
        <div className="text-center mb-10">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            My technical abilities and competencies that I'm developing as a beginner in the field.
          </p>
        </div>

        {/* Mobile Accordion View */}
        <div className="md:hidden space-y-4">
          {skillGroups.map((group, groupIndex) => (
            <Card key={groupIndex} className="hover:shadow-multilayer transition-all duration-300">
              <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleGroup(groupIndex)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-md">{group.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-300 hover:text-white hover:bg-blue-900/30 rounded-full"
                >
                  {expandedGroup === groupIndex ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {expandedGroup === groupIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-blue-300/20 p-4"
                >
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="py-2 px-3 text-white border-blue-300/50 bg-deep-blue-lighter/50 hover:bg-blue-300/10 transition-all duration-300 hover:shadow-glow-sm cursor-pointer min-h-[44px]"
                      >
                        <span className="mr-2">{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </Card>
          ))}
        </div>

        {/* Desktop Grid View */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="hidden md:grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {skillGroups.map((group, groupIndex) => (
            <motion.div key={groupIndex} variants={item}>
              <Card className="h-full hover:shadow-multilayer transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                    <div className="bg-blue-500/20 p-2 rounded-md">{group.icon}</div>
                    {group.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="py-2 px-3 text-white border-blue-300/50 bg-deep-blue-lighter/50 hover:bg-blue-300/10 transition-all duration-300 hover:shadow-glow-sm"
                      >
                        <span className="mr-2">{skill.icon}</span>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8 text-gray-400 text-sm max-w-2xl mx-auto">
          <p>
            Note: I'm still a beginner in most of these technologies and actively learning to improve my skills through
            projects and coursework.
          </p>
        </div>
      </div>
    </section>
  )
}
