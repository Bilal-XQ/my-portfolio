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
    <main className="min-h-screen professional-bg relative overflow-hidden">
      {/* Professional gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/20 via-transparent to-purple-900/10 pointer-events-none" />
      
      {/* Subtle animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-600/5 to-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/3 to-purple-600/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <ModernNavigation />
      
      <div className="relative z-10 page-transition">
        {/* Hero Section with Professional Background */}
        <section id="about" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 section-primary">
          <AnimatedHero />
          <ModernAbout />
        </section>

        {/* Elegant Section Divider */}
        <div className="elegant-divider my-20" />
        
        {/* Projects Section */}
        <section id="projects" className="section-secondary py-20">
          <ModernProjectsEnhanced />
        </section>
        
        {/* Elegant Section Divider */}
        <div className="elegant-divider my-20" />
        
        {/* Skills Section */}
        <section id="skills" className="section-accent py-20">
          <ModernSkills />
        </section>
        
        {/* Elegant Section Divider */}
        <div className="elegant-divider my-20" />
        
        {/* Contact Section */}
        <section id="contact" className="section-primary py-20">
          <ModernContact />
        </section>
        {/* Professional Footer */}
        <footer className="relative py-12 mt-20 section-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="elegant-divider mb-8" />
            <div className="flex justify-center items-center">
              <p className="text-gray-400 text-center text-sm">
                © 2025 Developed by <span className="text-blue-400 font-medium">Bilal EL AZZAM</span>. Built with Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
      </div>
      
      <ScrollToTop />
    </main>
  )
}
