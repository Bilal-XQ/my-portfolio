import type { Metadata } from "next"
import ModernNavigation from "@/components/modern-navigation"
import ModernAbout from "@/components/modern-about"
import ModernProjectsEnhanced from "@/components/modern-projects-enhanced"
import ModernSkills from "@/components/modern-skills"
import ModernContact from "@/components/modern-contact"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedHero from "@/components/animated-hero"
import ParticleSystem from "@/components/ui/particle-system"

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description: "Modern portfolio showcasing full-stack development skills, projects, and experience",
  keywords: "portfolio, full-stack developer, React, Next.js, TypeScript, web development",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio | Full-Stack Developer",
    description: "Modern portfolio showcasing full-stack development skills, projects, and experience",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Full-Stack Developer",
    description: "Modern portfolio showcasing full-stack development skills, projects, and experience",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black-primary relative">
      {/* Premium black background with gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black-primary via-black-secondary to-black-tertiary" />
      
      {/* Interactive Particle System Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <ParticleSystem 
          particleCount={60}
          containerWidth={typeof window !== 'undefined' ? window.innerWidth : 1920}
          containerHeight={typeof window !== 'undefined' ? window.innerHeight : 1080}
          className="w-full h-full"
        />
      </div>
      
      {/* Subtle animated gradient mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-primary/10 to-blue-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-secondary/10 to-blue-primary/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-primary/5 to-blue-secondary/5 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      <ModernNavigation />
      
      <div className="relative z-10">
        {/* Hero Section with Enhanced Black Theme */}
        <section id="about" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
          <AnimatedHero />
          <ModernAbout />
        </section>

        {/* Modern Section Dividers with Blue Gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-primary/30 to-transparent my-20" />
        
        <ModernProjectsEnhanced />
        
        <div className="h-px bg-gradient-to-r from-transparent via-blue-primary/30 to-transparent my-20" />
        
        <ModernSkills />
        
        <div className="h-px bg-gradient-to-r from-transparent via-blue-primary/30 to-transparent my-20" />
        
        <ModernContact />
        
        {/* Footer with Black Theme */}
        <footer className="relative py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-primary/30 to-transparent mb-8" />
            <div className="flex justify-center items-center">
              <p className="text-text-secondary text-center">
                © 2025 Developed by Bilal EL AZZAM. Built with Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
      </div>
      
      <ScrollToTop />
    </main>
  )
}
