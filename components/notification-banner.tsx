"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isInitialRender, setIsInitialRender] = useState(true)

  // Delay the initial animation to prevent it from competing with page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialRender(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: isInitialRender ? 0 : 1, y: isInitialRender ? -50 : 0 }}
      transition={{ duration: 0.5, delay: isInitialRender ? 0 : 0.5 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-blue-600/90 backdrop-blur-md text-white py-3 px-4 shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="font-medium">
            <span className="inline-block animate-pulse mr-2 bg-yellow-400 h-2 w-2 rounded-full"></span>
            This website is currently undergoing updates. Some features may be incomplete.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="text-white hover:bg-blue-700/50 rounded-full"
          aria-label="Close notification"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
}
