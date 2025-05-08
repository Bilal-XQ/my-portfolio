"use client"

import type React from "react"

import { createContext, useState, useContext } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface LightboxContextType {
  isOpen: boolean
  imageUrl: string
  title: string
  subtitle: string
  openLightbox: (imageUrl: string, title: string, subtitle: string) => void
  closeLightbox: () => void
}

export const LightboxContext = createContext<LightboxContextType>({
  isOpen: false,
  imageUrl: "",
  title: "",
  subtitle: "",
  openLightbox: () => {},
  closeLightbox: () => {},
})

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")

  const openLightbox = (imageUrl: string, title: string, subtitle: string) => {
    setImageUrl(imageUrl)
    setTitle(title)
    setSubtitle(subtitle)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        imageUrl,
        title,
        subtitle,
        openLightbox,
        closeLightbox,
      }}
    >
      {children}
    </LightboxContext.Provider>
  )
}

export function Lightbox() {
  const { isOpen, imageUrl, title, subtitle, closeLightbox } = useContext(LightboxContext)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/10 z-10 hover:shadow-glow-sm"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="overflow-hidden rounded-lg shadow-multilayer">
              <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-auto" />
            </div>
            <div className="mt-4 text-white">
              <h3 className="text-xl font-semibold">{title}</h3>
              {subtitle && <p className="text-gray-300">{subtitle}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
