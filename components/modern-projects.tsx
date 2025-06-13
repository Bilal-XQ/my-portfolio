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
  Code2
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
      "/note-website-screenshots/Screenshot%202024-12-15%20115309.png"
    ]
  },
  {
    title: "KhadmaAI - ENSET Hackathon 2025",
    description: "Innovative AI-powered service platform developed for ENSET Hackathon 2025",
    longDescription: "An innovative AI-powered service platform developed for the ENSET Hackathon 2025. Built entirely in TypeScript, it provides intelligent service recommendations and automated workflows using cutting-edge AI/ML technologies. Demonstrates expertise in modern AI integration and rapid prototyping.",
    repoUrl: "https://github.com/Bilal-XQ/khadmaAI-enset-hackathon2025",
    demoUrl: "",
    techStack: ["TypeScript", "AI/ML", "Node.js", "React", "TensorFlow"],
    image: "/placeholder.svg?height=400&width=600&text=KhadmaAI"
  },
  {
    title: "Personal Portfolio",
    description: "Modern, responsive portfolio website showcasing professional skills and projects",
    longDescription: "A modern, responsive portfolio website showcasing professional skills and projects. Built with TypeScript for optimal performance, featuring an interactive project gallery, comprehensive skill showcase, and professional contact integration. Designed to impress potential employers and collaborators.",
    repoUrl: "https://github.com/Bilal-XQ/my-portfolio",
    demoUrl: "",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/placeholder.svg?height=400&width=600&text=Portfolio"
  },
  {
    title: "Python DDoS Educational Tool",
    description: "Educational cybersecurity tool for learning network security principles",
    longDescription: "An educational cybersecurity tool for learning network security principles and ethical penetration testing. Features a Python simulation engine with HTML/CSS web dashboard, configurable parameters, and built-in safety controls. Strictly designed for educational purposes and authorized security research.",
    repoUrl: "https://github.com/Bilal-XQ/python-ddos-tool",
    demoUrl: "",
    techStack: ["Python", "HTML5", "CSS3", "Network Security", "Flask"],
    image: "/placeholder.svg?height=400&width=600&text=Security+Tool"
  }
]

export default function ModernProjects() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number]
      }
    }
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of projects that showcase my technical skills and passion for creating exceptional digital experiences
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={project.featured ? "lg:col-span-2" : ""}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <div className={`${project.featured ? "md:flex" : ""}`}>                  <div className={`relative overflow-hidden ${project.featured ? "md:w-1/2" : ""}`}>
                    <div className="aspect-video relative cursor-pointer" onClick={() => project.images ? openGallery(project) : undefined}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Gallery indicator for projects with multiple images */}
                      {project.images && project.images.length > 1 && (
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          {project.images.length}
                        </div>
                      )}
                    </div>
                    
                    {/* Floating action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {project.repoUrl && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white shadow-lg"
                          asChild
                        >
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                          asChild
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardContent className={`p-8 ${project.featured ? "md:w-1/2 flex flex-col justify-center" : ""}`}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {project.featured ? project.longDescription : project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>                    <div className="flex gap-3 mt-auto">                      {project.repoUrl && (
                        <Button
                          variant="outline"
                          className="flex-1 group/btn"
                        >
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                            <Github className="h-4 w-4 mr-2" />
                            Code
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

                    {/* Gallery button for projects with multiple images */}
                    {project.images && project.images.length > 1 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => openGallery(project)}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          View Gallery ({project.images.length} images)
                        </Button>
                      </div>
                    )}
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

      {/* Image Gallery Modal */}
      {currentProject && (
        <ImageGallery
          images={currentProject.images || [currentProject.image]}
          isOpen={galleryOpen}
          currentIndex={currentImageIndex}
          onClose={closeGallery}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </section>
  )
}
