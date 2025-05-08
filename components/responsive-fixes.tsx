"use client"

import { useEffect } from "react"

// This component applies global fixes for responsive design issues
export default function ResponsiveFixes() {
  useEffect(() => {
    // Fix viewport issues on mobile devices
    const metaViewport = document.querySelector('meta[name="viewport"]')
    if (!metaViewport) {
      const meta = document.createElement("meta")
      meta.name = "viewport"
      meta.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
      document.getElementsByTagName("head")[0].appendChild(meta)
    } else {
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes",
      )
    }

    // Fix touch events for better mobile interaction
    document.addEventListener("touchstart", () => {}, { passive: true })

    // Fix 100vh issue on mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVh()
    window.addEventListener("resize", setVh)

    // Fix for iOS Safari overscroll behavior
    document.body.style.overscrollBehavior = "none"

    // Fix for focus outlines on mobile
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("user-is-tabbing")
        window.removeEventListener("keydown", handleFirstTab)
      }
    }
    window.addEventListener("keydown", handleFirstTab)

    return () => {
      window.removeEventListener("resize", setVh)
      document.body.style.overscrollBehavior = ""
    }
  }, [])

  return null
}
