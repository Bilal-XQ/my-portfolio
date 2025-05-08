"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, AlertCircle } from "lucide-react"
import { useContext } from "react"
import { LightboxContext } from "@/components/lightbox"
import { Card } from "@/components/ui-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DesignWork {
  title: string
  imageUrl: string
  isComingSoon?: boolean
}

const designWorks: DesignWork[] = [
  {
    title: "CyberAtlas Club Poster",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Tech Event Flyer",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Coming+Soon",
    isComingSoon: true,
  },
  {
    title: "Web UI Design",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Coming+Soon",
    isComingSoon: true,
  },
  {
    title: "Social Media Campaign",
    imageUrl: "/placeholder.svg?height=400&width=600&text=Coming+Soon",
    isComingSoon: true,
  },
]

export default function DesignGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = designWorks.length - 1
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const { openLightbox } = useContext(LightboxContext)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1))
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
    }
  }, [currentIndex])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier

    if (Math.abs(walk) > 50) {
      if (walk > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (walk < 0 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1)
      }
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleItemClick = (work: DesignWork) => {
    if (!work.isComingSoon) {
      openLightbox(work.imageUrl, work.title, "")
    }
  }

  return (
    <section id="design-gallery" ref={ref} className="py-16">
      <div className="section-bg">
        <div className="text-center mb-10">
          <h2 className="section-title">Design Gallery</h2>
          <p className="section-subtitle">
            A showcase of my graphic design work for the CyberAtlas club and other projects.
          </p>
        </div>

        <Alert className="mb-6 bg-blue-900/20 border-blue-300/30">
          <AlertCircle className="h-4 w-4 text-blue-300" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>More design work will be added to this gallery as projects are completed.</AlertDescription>
        </Alert>

        {/* Mobile Gallery */}
        <div className="md:hidden space-y-6">
          {designWorks.map((work, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-multilayer transition-all duration-300 border-blue-300/30 ${
                !work.isComingSoon ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={() => handleItemClick(work)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={work.imageUrl || "/placeholder.svg"}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue-darker to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                  {work.isComingSoon && <p className="text-blue-300 text-sm mt-1">Coming Soon</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto hidden md:block"
        >
          <Card className="overflow-hidden rounded-lg cursor-grab shadow-multilayer p-0">
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => {}} // Add empty handlers for touch events
              onTouchMove={() => {}}
              onTouchEnd={() => {}}
            >
              <div
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ width: `${designWorks.length * 100}%` }}
              >
                {designWorks.map((work, index) => (
                  <div
                    key={index}
                    className="relative w-full"
                    style={{ width: `${100 / designWorks.length}%` }}
                    onClick={() => handleItemClick(work)}
                  >
                    <img
                      src={work.imageUrl || "/placeholder.svg"}
                      alt={work.title}
                      className="w-full h-[400px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <h3 className="text-xl font-semibold text-white p-4 text-center">{work.title}</h3>
                      {work.isComingSoon && (
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                          <p className="text-blue-300 font-medium">Coming Soon</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 min-h-[44px] min-w-[44px] hover:shadow-glow-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 min-h-[44px] min-w-[44px] hover:shadow-glow-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {designWorks.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-400" : "bg-blue-400/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10 min-h-[44px] hover:shadow-glow transition-all duration-300 transform hover:scale-105 rounded-full"
            asChild
          >
            <a href="https://www.behance.net/bilalelazzam" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Behance
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10 min-h-[44px] hover:shadow-glow transition-all duration-300 transform hover:scale-105 rounded-full"
            asChild
          >
            <a href="https://www.instagram.com/cyberatlas_ests/?__d=1%252F" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
