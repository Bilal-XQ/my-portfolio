"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: string[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onSetIndex: (index: number) => void
}

export default function ImageGallery({
  images,
  isOpen,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onSetIndex
}: ImageGalleryProps) {
  
  // Safety check to ensure currentIndex is valid
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, images.length - 1))
    // Keyboard support
  useEffect(() => {
    if (!isOpen) return

    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent conflicts with other keyboard handlers
      if (e.defaultPrevented) return
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          e.stopPropagation()
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          e.stopPropagation()
          onPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          e.stopPropagation()
          onNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    
    // Prevent body scrolling when gallery is open and store scroll position
    const originalScrollPosition = window.pageYOffset
    const originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    }
    
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${originalScrollPosition}px`
    document.body.style.width = '100%'    // Hide navigation elements by targeting the correct selectors
    const modernNav = document.querySelector('nav[class*="fixed"][class*="top-0"]')
    const headerElements = document.querySelectorAll('header')
    const logoElements = document.querySelectorAll('[class*="logo"], [aria-label*="logo"], [class*="brand"]')
    
    const hiddenElements: HTMLElement[] = []
    
    // Hide modern navigation
    if (modernNav instanceof HTMLElement) {
      modernNav.style.display = 'none'
      hiddenElements.push(modernNav)
    }
    
    // Hide header elements
    headerElements.forEach(el => {
      if (el instanceof HTMLElement && el !== modernNav) {
        el.style.display = 'none'
        hiddenElements.push(el)
      }
    })
    
    // Hide logo/brand elements
    logoElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none'
        hiddenElements.push(el)
      }
    })

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      
      // Restore body styles
      document.body.style.overflow = originalBodyStyle.overflow
      document.body.style.position = originalBodyStyle.position
      document.body.style.top = originalBodyStyle.top
      document.body.style.width = originalBodyStyle.width
      
      // Restore scroll position
      window.scrollTo(0, originalScrollPosition)
      
      // Restore navigation elements
      hiddenElements.forEach(el => {
        el.style.display = ''
      })
    }
  }, [isOpen, onClose, onPrevious, onNext])

  if (!isOpen) return null
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
          onClick={(e) => {
            // Only close if clicking the backdrop itself, not child elements
            if (e.target === e.currentTarget) {
              e.preventDefault()
              onClose()
            }
          }}
        >
          <div 
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => {
              // Close gallery when clicking the container area (not on interactive elements)
              if (e.target === e.currentTarget) {
                onClose()
              }
            }}
          >
            {/* Close Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-[10010] text-white hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onClose()
              }}
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[10005] text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50 border border-white/20 backdrop-blur-sm hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPrevious()
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[10005] text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50 border border-white/20 backdrop-blur-sm hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNext()
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}            {/* Main Image */}
            <motion.div
              key={safeCurrentIndex}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[safeCurrentIndex] || "/placeholder.svg?height=400&width=600&text=Image+Not+Found"}
                alt={`Screenshot ${safeCurrentIndex + 1} of ${images.length}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                draggable={false}
                onError={(e) => {
                  console.error('Failed to load image:', images[safeCurrentIndex])
                  e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Image+Not+Found"
                }}
              />
            </motion.div>

            {/* Image Counter */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm z-[10005]"
              >
                {safeCurrentIndex + 1} of {images.length}
              </motion.div>
            )}

            {/* Thumbnail Strip - Centered with proper flex layout */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-[10005]"
              >
                <div className="flex justify-center items-center gap-2 px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm overflow-x-auto">
                  <div className="flex gap-2 justify-center">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          onSetIndex(index)
                        }}
                        className={`relative w-20 h-14 rounded overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                          index === currentIndex
                            ? "border-white scale-110 shadow-lg"
                            : "border-transparent opacity-60 hover:opacity-90 hover:scale-105"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                        {index === currentIndex && (
                          <div className="absolute inset-0 bg-white/20 rounded" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 left-4 text-white/80 text-sm z-[10005] bg-black/50 rounded-lg p-3 backdrop-blur-sm"
            >
              <div className="space-y-1">
                {images.length > 1 && <p>← → Navigate images</p>}
                <p>ESC Close gallery</p>
                <p>Click outside to close</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
