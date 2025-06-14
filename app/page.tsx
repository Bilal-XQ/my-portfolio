import type { Metadata } from "next"
import ModernNavigation from "@/components/modern-navigation"
import ModernAbout from "@/components/modern-about"
import ModernProjectsEnhanced from "@/components/modern-projects-enhanced"
import ModernSkills from "@/components/modern-skills"

import ModernContact from "@/components/modern-contact"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedHero from "@/components/animated-hero"

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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative">
      {/* Enhanced background with modern gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-purple-50/10 to-transparent dark:from-blue-900/10 dark:via-purple-900/5 dark:to-transparent" />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <ModernNavigation />
      
      <div className="relative z-10">        {/* Hero Section with Animated Background */}
        <section id="about" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
          <AnimatedHero />
          <ModernAbout />
        </section>

        {/* Modern Section Dividers */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-20" />
        
        <ModernProjectsEnhanced />
        
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-20" />
        
        <ModernSkills />
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-20" />
        
        <ModernContact />
          {/* Footer */}
        <footer className="relative py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-8" />
            <div className="flex justify-center items-center">
              <p className="text-gray-600 dark:text-gray-400 text-center">
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
