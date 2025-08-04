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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            My Projects
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A collection of projects showcasing technical expertise, creative problem-solving, and passion for innovation
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >          {projects.map((project, index) => (            <motion.div 
              key={project.title} 
              variants={itemVariants}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="project-card group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <div className="aspect-video relative">                    <motion.img
                      key={getDisplayImage(project)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={getDisplayImage(project)}
                      alt={project.title}
                      className="project-image w-full h-full object-cover transition-all duration-700 hover:brightness-110"
                      loading="eager"
                      onError={(e) => {
                        // Fallback to placeholder
                        e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=" + encodeURIComponent(project.title)
                      }}
                    />{/* Hover overlay with gallery indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 flex items-center gap-2 text-sm font-medium shadow-lg"
                      >
                        <Eye className="h-4 w-4" />
                        <span>
                          {project.images && project.images.length > 1 
                            ? `View Gallery (${project.images.length})` 
                            : 'View Image'
                          }
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Click target overlay for reliable clicking */}
                    <div 
                      className="absolute inset-0 cursor-pointer z-10 hover:bg-black/5 transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        
                        // Debug logging
                        console.log('Gallery click triggered for:', project.title)
                        
                        try {
                          const imagesToShow = project.images && project.images.length > 0 
                            ? project.images 
                            : [project.image]
                          
                          if (!imagesToShow || imagesToShow.every(img => !img)) {
                            console.warn('No valid images found for project:', project.title)
                            return
                          }
                          
                          const currentIndex = project.images && project.images.length > 1 
                            ? (slideIndexes[project.title] || 0)
                            : 0
                          
                          openGallery({ ...project, images: imagesToShow }, currentIndex)
                        } catch (error) {
                          console.error('Error opening gallery:', error)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${project.images && project.images.length > 1 ? 'gallery' : 'image'} for ${project.title}`}
                    />
                    
                    {/* Image counter for multiple images */}
                    {project.images && project.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {(slideIndexes[project.title] || 0) + 1}/{project.images.length}
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

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium"
                        >
                          <span className="flex items-center">{techIcons[tech] || '🔧'}</span>
                          <span>{tech}</span>
                        </motion.div>
                      ))}
                      {project.techStack.length > 4 && (
                        <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-500">
                          +{project.techStack.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    {project.repoUrl && (                      <Button size="sm" variant="outline" className="flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group/btn" asChild>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <span className="flex items-center">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                            <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </span>
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors group/btn" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            Demo
                            <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </span>
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"        >
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
            asChild
          >
            <a href="https://github.com/Bilal-XQ" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <span className="flex items-center">
                <Github className="h-5 w-5 mr-2" />
                View All Projects on GitHub
                <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Button></motion.div>
      </div>
      
      {/* Image Gallery Modal */}
      <ImageGallery
        images={galleryState.images}
        isOpen={galleryState.isOpen}
        currentIndex={galleryState.currentIndex}
        onClose={closeGallery}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSetIndex={setGalleryIndex}
      />
    </section>
  )
}
