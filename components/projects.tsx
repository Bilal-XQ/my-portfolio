"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui-card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Info, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  title: string
  description: string
  repoUrl?: string
  demoUrl?: string
  category: "original" | "freeCodeCamp"
  status: "completed" | "in-progress"
  techStack: string[]
  images: string[]
}

const projects: Project[] = [
  {
    title: "Portfolio Site",
    description: "Personal portfolio website showcasing my skills and projects.",
    repoUrl: "https://github.com/Bilal-XQ/portfolio",
    demoUrl: "#",
    category: "original",
    status: "completed",
    techStack: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"],
    images: [
      "/placeholder.svg?height=300&width=500&text=Portfolio+Screenshot+1",
      "/placeholder.svg?height=300&width=500&text=Portfolio+Screenshot+2",
      "/placeholder.svg?height=300&width=500&text=Portfolio+Screenshot+3",
    ],
  },
  {
    title: "Gestion des véhicules",
    description: "A vehicle management application for tracking and maintenance.",
    repoUrl: "https://github.com/Bilal-XQ/Vehicle-management-website.git",
    demoUrl: "https://bilal-xq.github.io/Vehicle-management-website/",
    category: "original",
    status: "completed",
    techStack: ["HTML", "CSS", "PHP", "MySQL"],
    images: [
      "/placeholder.svg?height=300&width=500&text=Vehicle+Management+App+1",
      "/placeholder.svg?height=300&width=500&text=Vehicle+Management+App+2",
    ],
  },
  {
    title: "Python DDoS Tool",
    description: "A Python-based DDoS simulation tool for educational and testing purposes.",
    repoUrl: "https://github.com/Bilal-XQ/python-ddos-tool.git",
    category: "original",
    status: "completed",
    techStack: ["Python", "Networking", "Security"],
    images: ["/placeholder.svg?height=300&width=500&text=Python+DDoS+Tool"],
  },
  {
    title: "Note-taking Web App",
    description: "A simple web application for creating and organizing notes.",
    repoUrl: "https://github.com/Bilal-XQ/note-app",
    category: "original",
    status: "in-progress",
    techStack: ["HTML", "CSS", "JavaScript"],
    images: ["/placeholder.svg?height=300&width=500&text=Coming+Soon"],
  },
  {
    title: "Responsive Web Design",
    description: "FreeCodeCamp certification project for responsive web design.",
    category: "freeCodeCamp",
    status: "in-progress",
    techStack: ["HTML", "CSS"],
    images: ["/placeholder.svg?height=300&width=500&text=Coming+Soon"],
  },
  {
    title: "JavaScript Algorithms",
    description: "FreeCodeCamp certification project for JavaScript algorithms and data structures.",
    category: "freeCodeCamp",
    status: "in-progress",
    techStack: ["JavaScript"],
    images: ["/placeholder.svg?height=300&width=500&text=Coming+Soon"],
  },
]

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [filter, setFilter] = useState<string>("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects)
    } else if (filter === "original") {
      setFilteredProjects(projects.filter((p) => p.category === "original"))
    } else if (filter === "fcc") {
      setFilteredProjects(projects.filter((p) => p.category === "freeCodeCamp"))
    } else if (filter === "completed") {
      setFilteredProjects(projects.filter((p) => p.status === "completed"))
    } else if (filter === "in-progress") {
      setFilteredProjects(projects.filter((p) => p.status === "in-progress"))
    }
    setCurrentIndex(0)
  }, [filter])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="projects" ref={ref} className="py-16">
      <div className="section-bg">
        <div className="text-center mb-10">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A collection of my work, showcasing my skills and experience in web development.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setFilter}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all" className="rounded-full">
                All
              </TabsTrigger>
              <TabsTrigger value="original" className="rounded-full">
                Original
              </TabsTrigger>
              <TabsTrigger value="fcc" className="rounded-full">
                FreeCodeCamp
              </TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="completed" className="rounded-full">
                Completed
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="rounded-full">
                In Progress
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile Project Carousel */}
        <div className="md:hidden">
          {filteredProjects.length > 0 ? (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={filteredProjects[currentIndex]} />
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center mt-6 gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-blue-900/20 hover:bg-blue-900/40 border-blue-300/30"
                  onClick={prevProject}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="flex items-center text-gray-300">
                  {currentIndex + 1} / {filteredProjects.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-blue-900/20 hover:bg-blue-900/40 border-blue-300/30"
                  onClick={nextProject}
                  aria-label="Next project"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-300">No projects match the selected filter.</p>
          )}
        </div>

        {/* Desktop Project Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div key={index} variants={item}>
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-300">No projects match the selected filter.</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipped(!isFlipped)
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if (isFlipped && e.currentTarget === e.target) {
      setIsFlipped(false)
    }
  }

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length)
  }

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.images.length - 1 : prevIndex - 1))
  }

  // Set up automatic image cycling
  useEffect(() => {
    if (!isPaused && project.images.length > 1) {
      intervalRef.current = setInterval(() => {
        nextImage()
      }, 5000) // Slower rotation for better readability
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, currentImageIndex, project.images.length])

  return (
    <div className="relative h-[420px] w-full perspective-1000" onClick={handleClickOutside}>
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front of card */}
        <Card
          className="absolute w-full h-full backface-hidden hover:shadow-multilayer transition-all duration-300 flex flex-col hover:border-blue-300/50 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="default" className="bg-green-500">
              Completed
            </Badge>
          </div>

          {/* Image Carousel */}
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <div
              className="flex transition-transform duration-500 h-full"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
                width: `${project.images.length * 100}%`,
              }}
            >
              {project.images.map((image, index) => (
                <div key={index} className="relative" style={{ width: `${100 / project.images.length}%` }}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            {project.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 min-h-[44px] min-w-[44px]"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 min-h-[44px] min-w-[44px]"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Image indicators */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {project.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "bg-white scale-110" : "bg-white/50"
                      }`}
                      aria-label={`Image ${index + 1} of ${project.images.length}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <CardHeader>
            <CardTitle className="text-white">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-300">{project.description}</p>

            <div className="flex flex-wrap gap-1 mt-3">
              {project.techStack.slice(0, 3).map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs text-blue-200 border-blue-300/30 bg-blue-900/20"
                >
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="outline" className="text-xs text-blue-200 border-blue-300/30 bg-blue-900/20">
                  +{project.techStack.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              {project.repoUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all duration-300 hover:scale-105 hover:shadow-glow-sm border-blue-300/50 hover:border-blue-300 min-h-[44px]"
                  asChild
                >
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Repo
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all duration-300 hover:scale-105 hover:shadow-glow-sm border-blue-300/50 hover:border-blue-300 min-h-[44px]"
                  asChild
                >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </a>
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-glow-sm min-h-[44px] min-w-[44px] rounded-full"
              onClick={handleFlip}
              aria-label="Show project details"
            >
              <Info className="h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>

        {/* Back of card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center p-6 hover:shadow-multilayer border-blue-300/50">
          <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {project.techStack.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-white border-blue-300 px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-auto justify-center">
            {project.repoUrl && (
              <Button
                variant="outline"
                className="transition-all duration-300 hover:scale-105 hover:shadow-glow-sm border-blue-300/50 hover:border-blue-300 min-h-[44px]"
                asChild
              >
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub Repo
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button
                variant="outline"
                className="transition-all duration-300 hover:scale-105 hover:shadow-glow-sm border-blue-300/50 hover:border-blue-300 min-h-[44px]"
                asChild
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
          </div>

          {/* Flip back button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-glow-sm min-h-[44px] min-w-[44px] rounded-full"
            onClick={handleFlip}
            aria-label="Flip back to project front"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </Card>
      </div>
    </div>
  )
}
