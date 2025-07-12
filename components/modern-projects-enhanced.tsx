"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  Eye,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImageGallery from "@/components/image-gallery"

import { useState, useEffect } from "react"
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
const techIcons: { [key: string]: React.ReactNode } = {
  "PHP": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" alt="PHP" className="w-4 h-4" />,
  "TypeScript": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-4 h-4" />,
  "JavaScript": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-4 h-4" />,
  "React": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-4 h-4" />,
  "Next.js": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-4 h-4" />,
  "MySQL": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" className="w-4 h-4" />,
  "MongoDB": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-4 h-4" />,
  "Python": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-4 h-4" />,
  "HTML5": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg" alt="HTML5" className="w-4 h-4" />,
  "CSS3": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg" alt="CSS3" className="w-4 h-4" />,
  "Bootstrap": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" className="w-4 h-4" />,
  "Node.js": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-4 h-4" />,
  "TensorFlow": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="w-4 h-4" />,
  "AI/ML": "🤖",
  "Tailwind CSS": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-4 h-4" />,
  "Framer Motion": "🎭",
  "Network Security": "🔒",
  "Flask": <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" alt="Flask" className="w-4 h-4" />
}

// Use the imported projects data
const projects: Project[] = projectsData

export default function ModernProjectsEnhanced() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [slideIndexes, setSlideIndexes] = useState<{ [key: string]: number }>({})
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    images: [] as string[],
    currentIndex: 0,
    projectTitle: ""
  })
  // Auto-slide functionality for hovered projects
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    // Only auto-slide if hovering, gallery is closed, and not on mobile
    if (hoveredProject && !galleryState.isOpen && window.innerWidth > 768) {
      interval = setInterval(() => {
        const project = projects.find(p => p.title === hoveredProject)
        if (project && project.images && project.images.length > 1) {
          setSlideIndexes(prev => ({
            ...prev,
            [hoveredProject]: ((prev[hoveredProject] || 0) + 1) % project.images!.length
          }))
        }
      }, 4000) // Change image every 4 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [hoveredProject, galleryState.isOpen, projects])// Gallery functions
  const openGallery = (project: Project, startIndex: number = 0) => {
    try {
      // Ensure we have images to show
      const imagesToShow = project.images && project.images.length > 0 
        ? project.images.filter(img => img && img.trim() !== '') // Filter out empty strings
        : project.image && project.image.trim() !== '' 
          ? [project.image] 
          : []
      
      if (!imagesToShow || imagesToShow.length === 0) {
        console.warn('No valid images found for project:', project.title)
        // Show a placeholder image as fallback
        const fallbackImage = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(project.title)}`
        setGalleryState({
          isOpen: true,
          images: [fallbackImage],
          currentIndex: 0,
          projectTitle: project.title
        })
        return
      }
      
      const safeStartIndex = Math.max(0, Math.min(startIndex, imagesToShow.length - 1))
      
      console.log('Opening gallery:', { 
        project: project.title, 
        images: imagesToShow, 
        startIndex: safeStartIndex 
      })
      
      setGalleryState({
        isOpen: true,
        images: imagesToShow,
        currentIndex: safeStartIndex,
        projectTitle: project.title
      })
    } catch (error) {
      console.error('Error in openGallery:', error)
    }
  }
  const closeGallery = () => {
    console.log('Closing gallery')
    setGalleryState(prev => ({ 
      ...prev, 
      isOpen: false 
    }))
    
    // Small delay to allow animation to complete before clearing state
    setTimeout(() => {
      setGalleryState({
        isOpen: false,
        images: [],
        currentIndex: 0,
        projectTitle: ""
      })
    }, 300)
  }

  const goToPrevious = () => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
    }))
  }

  const goToNext = () => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1
    }))
  }

  const setGalleryIndex = (index: number) => {
    setGalleryState(prev => ({ ...prev, currentIndex: index }))
  }
  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      projects.forEach((project) => {
        if (project.image) {
          const img = document.createElement('img')
          img.src = project.image
        }
        if (project.images) {
          project.images.slice(0, 3).forEach((imageSrc) => {
            const img = document.createElement('img')
            img.src = imageSrc
          })
        }
      })
    }
    
    // Preload after component mounts
    const timer = setTimeout(preloadImages, 100)
    return () => clearTimeout(timer)
  }, [])
  const getDisplayImage = (project: Project) => {
    if (!project.images || project.images.length <= 1) {
      return project.image
    }
    
    const slideIndex = slideIndexes[project.title] || 0
    return project.images[slideIndex]
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
        duration: 0.6
      }
    }
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/10 via-transparent to-blue-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(26,75,127,0.15),transparent_50%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
            My Projects
          </motion.h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            A collection of projects showcasing technical expertise, creative problem-solving, and passion for innovation
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
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* 3D Card Container */}
              <div className="relative perspective-1000">
                <motion.div 
                  className="relative bg-black-tertiary/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-primary/20 shadow-2xl transform-style-3d"
                  whileHover={{ 
                    rotateX: 5, 
                    rotateY: 5, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(26, 75, 127, 0.25)"
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut" 
                  }}
                >
                  {/* Enhanced Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={getDisplayImage(project)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                      onError={(e) => {
                        console.error('Image failed to load:', project.title)
                        e.currentTarget.src = `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(project.title)}`
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black-primary/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Gallery Button with Enhanced Styling */}
                    {project.images && project.images.length > 1 && (
                      <motion.div
                        className="absolute top-4 right-4"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openGallery(project, slideIndexes[project.title] || 0)
                          }}
                          className="bg-black-primary/80 backdrop-blur-sm text-text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-primary/80 transition-all duration-300 flex items-center gap-2 border border-blue-primary/30"
                        >
                          <Eye className="w-4 h-4" />
                          View Gallery ({project.images.length})
                        </button>
                      </motion.div>
                    )}
                    
                    {/* Image Counter */}
                    {project.images && project.images.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-black-primary/80 backdrop-blur-sm text-text-primary px-3 py-1 rounded-full text-sm border border-blue-primary/30">
                        {((slideIndexes[project.title] || 0) + 1)}/{project.images.length}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6 relative">
                    <motion.h3 
                      className="text-2xl font-bold text-text-primary mb-3 group-hover:text-blue-primary transition-colors duration-300"
                      layoutId={`title-${project.title}`}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-text-secondary mb-4 line-clamp-3 leading-relaxed"
                      layoutId={`description-${project.title}`}
                    >
                      {project.description}
                    </motion.p>

                    {/* Enhanced Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          className="flex items-center gap-2 bg-blue-primary/20 backdrop-blur-sm text-text-primary px-3 py-1 rounded-full text-sm font-medium border border-blue-primary/30"
                          whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: "rgba(26, 75, 127, 0.4)" 
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {techIcons[tech] || <span className="w-4 h-4">⚡</span>}
                          <span>{tech}</span>
                        </motion.div>
                      ))}
                      {project.techStack.length > 4 && (
                        <div className="flex items-center justify-center bg-blue-secondary/20 backdrop-blur-sm text-text-secondary px-3 py-1 rounded-full text-sm border border-blue-secondary/30">
                          +{project.techStack.length - 4} more
                        </div>
                      )}
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-4">
                      {project.repoUrl && (
                        <motion.a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-primary to-blue-secondary hover:from-blue-primary/90 hover:to-blue-secondary/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                          Code
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-black-secondary hover:bg-black-primary text-text-primary px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-blue-primary/30 hover:border-blue-primary/50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-primary/20 to-blue-secondary/20 blur-xl" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/Bilal-XQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-primary to-blue-secondary hover:from-blue-primary/90 hover:to-blue-secondary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-primary/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
            View All Projects on GitHub
            <ArrowUpRight className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>

      {/* Enhanced Image Gallery */}
      <ImageGallery
        isOpen={galleryState.isOpen}
        images={galleryState.images}
        currentIndex={galleryState.currentIndex}
        onClose={closeGallery}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onIndexChange={setGalleryIndex}
        title={galleryState.projectTitle}
      />
    </section>
  )
}
