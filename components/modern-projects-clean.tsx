"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  Eye,
  Users,
  Zap,
  Star,
  Calendar,
  Code2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"
import { projectsData } from "@/lib/projects-data"

interface Project {
  title: string
  description: string
  longDescription: string
  repoUrl?: string
  demoUrl?: string
  techStack: string[]
  image: string
  images?: string[]
}

// Tech stack icons mapping
const techIcons: { [key: string]: string } = {
  "PHP": "🐘",
  "TypeScript": "📘",
  "JavaScript": "⚡",
  "React": "⚛️",
  "Next.js": "▲",
  "Node.js": "🟢",
  "MySQL": "🐬",
  "MongoDB": "🍃",
  "Python": "🐍",
  "HTML5": "🌐",
  "CSS3": "🎨",
  "Tailwind CSS": "💨",
  "Bootstrap": "🎯",
  "Framer Motion": "🎬",
  "AI/ML": "🤖",
  "TensorFlow": "🧠",
  "Network Security": "🔒",
  "Flask": "🌶️"
}

const projects = projectsData

export default function ModernProjects() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my development work, from full-stack applications to innovative tools and platforms
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={project.featured ? "lg:col-span-2" : ""}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <div className={`${project.featured ? "md:flex" : ""}`}>                  <div className={`relative overflow-hidden ${project.featured ? "md:w-1/2" : ""}`}>
                    <div className="aspect-video relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Floating action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {project.repoUrl && (
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20"
                          asChild
                        >
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/20"
                          asChild
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardContent className={`p-6 flex flex-col flex-grow ${project.featured ? "md:w-1/2" : ""}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          <span className="mr-1">{techIcons[tech] || "🔧"}</span>
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStack.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      {project.repoUrl && (
                        <Button
                          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group/btn"
                        >
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                            <Github className="h-4 w-4 mr-2" />
                            Source Code
                            <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700 group/btn"
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full text-white">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                            <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to see more of my work?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="group"          >
            <a href="https://github.com/Bilal-XQ" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Github className="h-5 w-5 mr-2" />
              View All Projects on GitHub
              <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a></Button>
        </motion.div>
      </div>
    </section>
  )
}
