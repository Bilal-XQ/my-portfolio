"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  ImageIcon, 
  Eye,
  Users,
  Zap,
  Star,
  Calendar,
  Code2,
  Play
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImageGallery from "@/components/image-gallery"
import { useState } from "react"
import Image from "next/image"

interface Project {
  title: string
  description: string
  longDescription: string
  repoUrl?: string
  demoUrl?: string
  techStack: string[]
  image: string
  images?: string[]
  featured?: boolean
  status: "Live" | "In Development" | "Completed"
  metrics?: {
    users?: string
    performance?: string
    commits?: string
  }
  year: string
}

// Tech stack icons mapping
const techIcons: { [key: string]: string } = {
  "PHP": "🐘",
  "TypeScript": "📘", 
  "JavaScript": "💛",
  "React": "⚛️",
  "Next.js": "▲",
  "MySQL": "🗄️",
  "MongoDB": "🍃",
  "Python": "🐍",
  "HTML5": "🏗️",
  "CSS3": "🎨",
  "Bootstrap": "🅱️",
  "Node.js": "💚",
  "TensorFlow": "🧠",
  "AI/ML": "🤖",
  "Tailwind CSS": "🌊",
  "Framer Motion": "🎭",
  "Network Security": "🔒",
  "Flask": "🌶️"
}

const projects: Project[] = [
  {
    title: "Vehicle Management Website",
    description: "Comprehensive full-stack vehicle fleet management system with real-time tracking",
    longDescription: "A comprehensive full-stack vehicle fleet management system built with PHP backend and TypeScript frontend. Features include real-time vehicle tracking, automated maintenance scheduling, driver management, and detailed reporting dashboards. Designed for fleet managers and automotive businesses to streamline operations and reduce costs.",
    repoUrl: "https://github.com/Bilal-XQ/Vehicle-management-website",
    demoUrl: "",
    techStack: ["PHP", "TypeScript", "MySQL", "Bootstrap", "JavaScript"],
    image: "/placeholder.svg?height=400&width=600&text=Vehicle+Management",
    featured: true,
    status: "Completed",
    metrics: {
      performance: "40% faster",
      commits: "120+"
    },
    year: "2024"
  },
  {
    title: "Note-Taking Platform",
    description: "Digital productivity platform for efficient note-taking and organization",
    longDescription: "A digital productivity platform for efficient note-taking and organization. Built with PHP backend and vanilla JavaScript, featuring rich text editing, smart categorization, powerful search functionality, and secure user authentication. Perfect for students, professionals, and researchers managing knowledge.",
    repoUrl: "https://github.com/Bilal-XQ/Note-taking-platform",
    demoUrl: "",
    techStack: ["PHP", "JavaScript", "MySQL", "HTML5", "CSS3"],
    image: "/note-website-screenshots/Screenshot%202024-12-15%20115119.png",
    images: [
      "/note-website-screenshots/Screenshot%202024-12-15%20115119.png",
      "/note-website-screenshots/Screenshot%202024-12-15%20115140.png",
      "/note-website-screenshots/Screenshot%202024-12-15%20115155.png",
      "/note-website-screenshots/Screenshot%202024-12-15%20115211.png",
      "/note-website-screenshots/Screenshot%202024-12-15%20115225.png",
      "/note-website-screenshots/Screenshot%202024-12-15%20115238.png",
      "/note-website-screenshots/Screenshot%202024-12-15%20115257.png",
      "/note-website-screenshots/Screenshot%202024-12-15%20115309.png"
    ],
    status: "Completed",
    metrics: {
      users: "100+",
      performance: "60% faster search"
    },
    year: "2024"
  },
  {
    title: "KhadmaAI - ENSET Hackathon 2025",
    description: "Innovative AI-powered service platform developed for ENSET Hackathon 2025",
    longDescription: "An innovative AI-powered service platform developed for the ENSET Hackathon 2025. Built entirely in TypeScript, it provides intelligent service recommendations and automated workflows using cutting-edge AI/ML technologies. Demonstrates expertise in modern AI integration and rapid prototyping.",
    repoUrl: "https://github.com/Bilal-XQ/khadmaAI-enset-hackathon2025",
    demoUrl: "",
    techStack: ["TypeScript", "AI/ML", "Node.js", "React", "TensorFlow"],
    image: "/placeholder.svg?height=400&width=600&text=KhadmaAI",
    status: "In Development",
    metrics: {
      commits: "80+"
    },
    year: "2025"
  },
  {
    title: "Personal Portfolio",
    description: "Modern, responsive portfolio website showcasing professional skills and projects",
    longDescription: "A modern, responsive portfolio website showcasing professional skills and projects. Built with TypeScript for optimal performance, featuring an interactive project gallery, comprehensive skill showcase, and professional contact integration. Designed to impress potential employers and collaborators.",
    repoUrl: "https://github.com/Bilal-XQ/my-portfolio",
    demoUrl: "",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/placeholder.svg?height=400&width=600&text=Portfolio",
    status: "Live",
    metrics: {
      performance: "95+ Lighthouse"
    },
    year: "2025"
  },
  {
    title: "Python DDoS Educational Tool",
    description: "Educational cybersecurity tool for learning network security principles",
    longDescription: "An educational cybersecurity tool for learning network security principles and ethical penetration testing. Features a Python simulation engine with HTML/CSS web dashboard, configurable parameters, and built-in safety controls. Strictly designed for educational purposes and authorized security research.",
    repoUrl: "https://github.com/Bilal-XQ/python-ddos-tool",
    demoUrl: "",
    techStack: ["Python", "HTML5", "CSS3", "Network Security", "Flask"],
    image: "/placeholder.svg?height=400&width=600&text=Security+Tool",
    status: "Completed",
    metrics: {
      commits: "45+"
    },
    year: "2024"
  }
]

export default function ModernProjectsEnhanced() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openGallery = (project: Project, startIndex: number = 0) => {
    setCurrentProject(project)
    setCurrentImageIndex(startIndex)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
    setCurrentProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (currentProject?.images) {
      setCurrentImageIndex((prev) => 
        prev === currentProject.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const previousImage = () => {
    if (currentProject?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentProject.images!.length - 1 : prev - 1
      )
    }
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Development':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,120,120,0.3),rgba(255,255,255,0))]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            Featured Projects
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A curated collection of projects showcasing technical expertise, creative problem-solving, and passion for innovation
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Featured Project - Full Width */}
          <motion.div variants={itemVariants}>
            <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:-translate-y-1">
              <div className="md:flex">
                <div className="relative md:w-3/5 overflow-hidden">
                  <div className="aspect-[16/10] relative cursor-pointer" onClick={() => projects[0].images ? openGallery(projects[0]) : undefined}>
                    <img
                      src={projects[0].image}
                      alt={projects[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(projects[0].status)}>
                        {projects[0].status === 'Live' && <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />}
                        {projects[0].status}
                      </Badge>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {projects[0].year}
                    </div>
                  </div>
                </div>

                <CardContent className="md:w-2/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 border-0">
                      Featured Project
                    </Badge>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {projects[0].title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {projects[0].longDescription}
                  </p>

                  {/* Metrics */}
                  {projects[0].metrics && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {projects[0].metrics.performance && (
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <Zap className="h-4 w-4 text-green-600 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                            {projects[0].metrics.performance}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-500">Performance</div>
                        </div>
                      )}
                      {projects[0].metrics.commits && (
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Code2 className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                            {projects[0].metrics.commits}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">Commits</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {projects[0].techStack.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span className="text-base">{techIcons[tech] || '🔧'}</span>
                          <span>{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {projects[0].repoUrl && (
                      <Button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn" asChild>
                        <a href={projects[0].repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          View Repository
                          <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </Button>
                    )}
                    {projects[0].demoUrl && (
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group/btn" asChild>
                        <a href={projects[0].demoUrl} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-2" />
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

          {/* Other Projects - Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.slice(1).map((project, index) => (
              <motion.div key={project.title} variants={itemVariants}>
                <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <div className="aspect-video relative cursor-pointer" onClick={() => project.images ? openGallery(project) : undefined}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Status and Year Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status === 'Live' && <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />}
                          {project.status}
                        </Badge>
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {project.year}
                      </div>

                      {/* Gallery indicator */}
                      {project.images && project.images.length > 1 && (
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          {project.images.length} images
                        </div>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex justify-between mb-4 text-sm">
                        {project.metrics.users && (
                          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            <Users className="h-4 w-4" />
                            {project.metrics.users}
                          </div>
                        )}
                        {project.metrics.performance && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <Zap className="h-4 w-4" />
                            {project.metrics.performance}
                          </div>
                        )}
                        {project.metrics.commits && (
                          <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                            <Code2 className="h-4 w-4" />
                            {project.metrics.commits}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium"
                          >
                            <span>{techIcons[tech] || '🔧'}</span>
                            <span>{tech}</span>
                          </motion.div>
                        ))}
                        {project.techStack.length > 4 && (
                          <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-500">
                            +{project.techStack.length - 4} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      {project.repoUrl && (
                        <Button size="sm" variant="outline" className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group/btn" asChild>
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                            <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors group/btn" asChild>
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            Demo
                            <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
            asChild
          >
            <a href="https://github.com/Bilal-XQ" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              View All Projects on GitHub
              <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      {galleryOpen && currentProject && (
        <ImageGallery
          images={currentProject.images || [currentProject.image]}
          currentIndex={currentImageIndex}
          onClose={closeGallery}
          onNext={nextImage}
          onPrevious={previousImage}
          title={currentProject.title}
        />
      )}
    </section>
  )
}
