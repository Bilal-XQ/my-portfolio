import type { Metadata } from "next"
import Header from "@/components/header"
import About from "@/components/about"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import ClubsActivities from "@/components/clubs-activities"
import DesignGallery from "@/components/design-gallery"
import Contact from "@/components/contact"
import ScrollToTop from "@/components/scroll-to-top"
import { Lightbox } from "@/components/lightbox"
import CodingBackground from "@/components/coding-background"
import NotificationBanner from "@/components/notification-banner"

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description: "CS student & aspiring Full-Stack Developer",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-deep-blue to-deep-blue-darker overflow-hidden relative scroll-smooth">
      <CodingBackground />
      <div className="radial-gradient-overlay"></div>
      <NotificationBanner />
      <Header />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <About />
        <div className="section-divider"></div>
        <Education />
        <div className="section-divider"></div>
        <Projects />
        <div className="section-divider"></div>
        <Skills />
        <div className="section-divider"></div>
        <ClubsActivities />
        <div className="section-divider"></div>
        <DesignGallery />
        <div className="section-divider"></div>
        <Contact />
      </div>
      <ScrollToTop />
      <Lightbox />
    </main>
  )
}
