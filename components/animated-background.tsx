"use client"

import { useEffect, useRef } from "react"

interface Shape {
  x: number
  y: number
  size: number
  opacity: number
  blur: number
  type: "circle" | "polygon" | "blob"
  rotation: number
  speed: {
    x: number
    y: number
    rotation: number
  }
  color: string
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapes = useRef<Shape[]>([])
  const animationFrameId = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller to cover the entire page
      initShapes()
    }

    const initShapes = () => {
      shapes.current = []
      const shapeCount = Math.min(Math.floor(window.innerWidth / 150), 12)

      const colors = [
        "rgba(100, 181, 246, 0.2)", // Light blue
        "rgba(123, 97, 255, 0.15)", // Purple
        "rgba(66, 165, 245, 0.18)", // Blue
        "rgba(41, 121, 255, 0.12)", // Darker blue
        "rgba(130, 177, 255, 0.14)", // Sky blue
      ]

      for (let i = 0; i < shapeCount; i++) {
        shapes.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 200 + 100,
          opacity: Math.random() * 0.08 + 0.02,
          blur: Math.random() * 40 + 20,
          type: ["circle", "polygon", "blob"][Math.floor(Math.random() * 3)] as "circle" | "polygon" | "blob",
          rotation: Math.random() * 360,
          speed: {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
            rotation: (Math.random() - 0.5) * 0.1,
          },
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.current.forEach((shape) => {
        ctx.save()
        ctx.globalAlpha = shape.opacity
        ctx.filter = `blur(${shape.blur}px)`
        ctx.translate(shape.x, shape.y)
        ctx.rotate((shape.rotation * Math.PI) / 180)

        ctx.fillStyle = shape.color

        if (shape.type === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (shape.type === "polygon") {
          const sides = 6
          ctx.beginPath()
          ctx.moveTo(shape.size / 2, 0)
          for (let i = 1; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides
            ctx.lineTo((shape.size / 2) * Math.cos(angle), (shape.size / 2) * Math.sin(angle))
          }
          ctx.closePath()
          ctx.fill()
        } else if (shape.type === "blob") {
          // Simple blob-like shape
          ctx.beginPath()
          ctx.ellipse(0, 0, shape.size / 2, shape.size / 3, 0, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        // Update position
        shape.x += shape.speed.x
        shape.y += shape.speed.y
        shape.rotation += shape.speed.rotation

        // Bounce off edges with some padding
        const padding = shape.size
        if (shape.x < -padding) shape.x = canvas.width + padding
        if (shape.x > canvas.width + padding) shape.x = -padding
        if (shape.y < -padding) shape.y = canvas.height + padding
        if (shape.y > canvas.height + padding) shape.y = -padding
      })

      animationFrameId.current = requestAnimationFrame(drawShapes)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    drawShapes()

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
