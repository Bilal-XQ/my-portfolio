"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Download, Eye, Globe, Languages, FileText, Sparkles, ArrowLeft, ExternalLink } from "lucide-react"

interface CVPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  defaultLanguage?: 'en' | 'fr' | null
  isFullScreen?: boolean
}

export default function CVPreviewModal({ isOpen, onClose, defaultLanguage = null, isFullScreen = false }: CVPreviewModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fr' | null>(defaultLanguage)
  const [isLoading, setIsLoading] = useState(false)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const cvFiles = {
    en: {
      path: '/BILAL_EL_AZZAM_CV_EN.pdf',
      label: 'English Version',
      subtitle: 'Professional CV in English',
      flag: '🇺🇸',
      color: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
      darkBgGradient: 'from-blue-900/20 via-indigo-900/20 to-purple-900/20'
    },
    fr: {
      path: '/BILAL_EL_AZZAM_CV_FR.pdf',
      label: 'Version Française',
      subtitle: 'CV professionnel en français',
      flag: '🇫🇷',
      color: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
      darkBgGradient: 'from-purple-900/20 via-pink-900/20 to-rose-900/20'
    }
  }

  // Handle loading state for PDF
  const handleLanguageSelect = (lang: 'en' | 'fr') => {
    setIsLoading(true)
    setSelectedLanguage(lang)
    // Simulate loading delay for better UX
    setTimeout(() => setIsLoading(false), 800)
  }

  // Add event listener for escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      if (isFullScreen) {
        document.body.style.overflow = 'hidden' // Prevent background scroll in full-screen
      }
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, onClose, isFullScreen])

  // Reset language selection when modal closes or when defaultLanguage changes
  useEffect(() => {
    if (!isOpen) {
      setSelectedLanguage(defaultLanguage)
      setIsLoading(false)
    } else if (defaultLanguage) {
      // If opening with a specific language, set it immediately
      setSelectedLanguage(defaultLanguage)
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 800)
    }
  }, [isOpen, defaultLanguage])

  if (!isOpen) return null

  if (isFullScreen) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900">
          {/* PDF Container with padding to avoid navigation overlap */}
          <div className="pt-20 h-full w-full">
            {!selectedLanguage ? (
              /* Language Selection in Full-Screen */
              <div className="flex flex-col items-center justify-center h-full p-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-center space-y-8 mb-12"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse" />
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200/30 dark:border-blue-700/30">
                      <Languages className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Choose CV Language
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed text-lg">
                      Select your preferred language to view the CV in full screen
                    </p>
                  </div>
                </motion.div>

                {/* Language selection cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
                  {Object.entries(cvFiles).map(([key, cv], index) => (
                    <motion.button
                      key={key}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1, 
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -8,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative p-10 bg-gradient-to-br ${cv.bgGradient} dark:${cv.darkBgGradient} border-2 border-transparent hover:border-white/50 dark:hover:border-gray-600/50 rounded-3xl transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] overflow-hidden`}
                      onClick={() => handleLanguageSelect(key as 'en' | 'fr')}
                    >
                      {/* Card background pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,120,120,0.3),rgba(255,255,255,0))]" />
                      </div>
                      
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${cv.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="relative text-center space-y-6">
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                          {cv.flag}
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className={`text-2xl font-bold text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:${cv.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                            {cv.label}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                            {cv.subtitle}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-center gap-3 pt-4">
                          <Eye className="h-5 w-5 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                          <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                            Click to preview
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              /* Full-Screen PDF Viewer */
              <div className="h-full flex flex-col">
                {/* Loading state */}
                {isLoading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6"
                    >
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400 mx-auto" />
                        <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-blue-600 dark:text-blue-400 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                          Loading CV Preview
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Preparing your {cvFiles[selectedLanguage].label.toLowerCase()}...
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <>
                    {/* Full-Screen PDF Container */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="flex-1 relative bg-gray-100 dark:bg-gray-800"
                    >
                      <iframe
                        src={`${cvFiles[selectedLanguage].path}#toolbar=1&navpanes=0&scrollbar=1&view=FitH&zoom=50&page=1`}
                        className="w-full h-full border-0 bg-white"
                        title={`CV Preview - ${cvFiles[selectedLanguage].label}`}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          minHeight: '100%'
                        }}
                        allow="fullscreen"
                        loading="eager"
                        onError={() => console.warn('PDF failed to load')}
                      />
                    </motion.div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Full-Screen Controls */}
          {selectedLanguage && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="flex items-center gap-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                {/* Back button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLanguage(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                {/* CV info */}
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-lg">{cvFiles[selectedLanguage].flag}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {cvFiles[selectedLanguage].label}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Zoom: 50% • Use browser controls to zoom
                    </p>
                  </div>
                </div>

                {/* Download button */}
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${cvFiles[selectedLanguage].color} text-white flex items-center gap-2`}
                  asChild
                >
                  <a href={cvFiles[selectedLanguage].path} download>
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>

                {/* Open in new tab */}
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href={cvFiles[selectedLanguage].path} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Close button - Top right, below navigation */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={onClose}
            className="fixed top-24 right-6 z-50 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50 dark:border-gray-700/50"
          >
            <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>
      </AnimatePresence>
    )
  }

  // Regular modal mode for inline buttons (existing functionality)
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/80 backdrop-blur-md"
          onClick={handleBackdropClick}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 60, rotateX: 15 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            damping: 25,
            stiffness: 120
          }}
          className="relative w-full max-w-[98vw] h-[98vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col border border-white/20 dark:border-gray-700/30"
        >
          {/* Header for regular modal */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-indigo-500/20" />
            
            <div className="relative flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                    Professional CV
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Choose your preferred language
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 h-8 w-8"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content for regular modal */}
          <div className="flex-1 overflow-hidden p-8">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                This modal is for inline CV button functionality. Use the full-screen mode for the main CV preview.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
