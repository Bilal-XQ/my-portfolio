import { cn } from "@/lib/utils"

interface MonogramLogoProps {
  className?: string
}

export default function MonogramLogo({ className }: MonogramLogoProps) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold text-xl shadow-md",
        className,
      )}
    >
      B
    </div>
  )
}
