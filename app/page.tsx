import type { Metadata } from "next"
import ProfessionalNavbar from "@/components/professional-navbar"
import ModernAbout from "@/components/modern-about"
import ModernProjectsEnhanced from "@/components/modern-projects-enhanced"
import ModernSkills from "@/components/modern-skills"
import ModernContact from "@/components/modern-contact"
import ScrollToTop from "@/components/scroll-to-top"

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
    <main className="min-h-screen professional-bg relative">
      {/* Professional gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/20 via-transparent to-purple-900/10 pointer-events-none" />
      
      <ProfessionalNavbar />
      
      <div className="relative z-10 page-transition">
        {/* Hero Section with Professional Background */}
        <section id="about" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 section-primary">
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
