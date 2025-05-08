"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface SectionDividerProps {
  variant?: "wave" | "angle" | "curve" | "layered-waves"
  flip?: boolean
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

export default function SectionDivider({
  variant = "wave",
  flip = false,
  className = "",
  primaryColor = "currentColor",
  secondaryColor,
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", flip ? "-10%" : "10%"])

  const renderPath = () => {
    switch (variant) {
      case "wave":
        return (
          <path
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill={primaryColor}
            fillOpacity="1"
          ></path>
        )
      case "angle":
        return <path d="M0,0L1440,96L1440,320L0,320Z" fill={primaryColor} fillOpacity="1"></path>
      case "curve":
        return (
          <path
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill={primaryColor}
            fillOpacity="1"
          ></path>
        )
      case "layered-waves":
        return (
          <>
            <path
              d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill={primaryColor}
              fillOpacity="1"
            ></path>
            {secondaryColor && (
              <path
                d="M0,224L48,229.3C96,235,192,245,288,240C384,235,480,213,576,213.3C672,213,768,235,864,245.3C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                fill={secondaryColor}
                fillOpacity="0.5"
              ></path>
            )}
          </>
        )
      default:
        return (
          <path
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill={primaryColor}
            fillOpacity="1"
          ></path>
        )
    }
  }

  return (
    <div ref={ref} className={`w-full overflow-hidden ${className}`}>
      <motion.div style={{ y: translateY }} className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className={`w-full h-auto ${flip ? "rotate-180" : ""}`}
        >
          {renderPath()}
        </svg>
      </motion.div>
    </div>
  )
}
