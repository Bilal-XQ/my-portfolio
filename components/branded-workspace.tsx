"use client"

import { motion } from "framer-motion"

interface BrandedWorkspaceProps {
  inView?: boolean
  className?: string
}

export default function BrandedWorkspace({ inView = true, className = "" }: BrandedWorkspaceProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Empty right side */}
    </div>
  )
}
