"use client"

import { useEffect, useRef } from "react"

export default function CodingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller to cover the entire page
      initLines()
    }

    // Binary and code patterns
    const patterns = [
      "01010111",
      "10101000",
      "function()",
      "const data",
      "<div>",
      "</div>",
      "import",
      "export",
      "return",
      "class",
      "{ }",
      "=>",
      "async",
      "await",
      "for(i=0)",
      "while()",
      "if(true)",
    ]

    interface CodeElement {
      x: number
      y: number
      text: string
      opacity: number
      size: number
      speed: number
    }

    const codeElements: CodeElement[] = []

    const initLines = () => {
      codeElements.length = 0
      const elementCount = Math.min(Math.floor(window.innerWidth / 100), 50)

      for (let i = 0; i < elementCount; i++) {
        codeElements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          text: patterns[Math.floor(Math.random() * patterns.length)],
          opacity: Math.random() * 0.07 + 0.01,
          size: Math.random() * 14 + 10,
          speed: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const drawElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      codeElements.forEach((element) => {
        ctx.font = `${element.size}px monospace`
        ctx.fillStyle = `rgba(100, 181, 246, ${element.opacity})`
        ctx.fillText(element.text, element.x, element.y)

        // Move element down
        element.y += element.speed

        // Reset position if it goes off screen
        if (element.y > canvas.height) {
          element.y = -20
          element.x = Math.random() * canvas.width
        }
      })

      animationFrameId.current = requestAnimationFrame(drawElements)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawElements()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{ opacity: 0.8 }}
    />
  )
}
