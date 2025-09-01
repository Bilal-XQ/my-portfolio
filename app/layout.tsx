import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LightboxProvider } from "@/components/lightbox"
import ResponsiveFixes from "@/components/responsive-fixes"
import StructuredData from "@/components/structured-data"
import GoogleAnalytics from "@/components/google-analytics"

export const metadata: Metadata = {
  title: "Bilal EL AZZAM - Full-Stack Developer | Développeur Web | مطور ويب",
  description: "Bilal EL AZZAM - Computer Science Student & Full-Stack Developer from Safi, Morocco. Specializing in React, Next.js, TypeScript. Available for web development projects in Morocco. | Étudiant en informatique et développeur full-stack de Safi, Maroc.",
  keywords: [
    // English
    "Bilal EL AZZAM", "Full-Stack Developer", "Web Developer Morocco", "React Developer", 
    "Next.js Developer", "TypeScript Developer", "Computer Science Student", 
    "Frontend Developer Morocco", "Backend Developer", "Safi Developer",
    "Morocco Web Developer", "Freelance Developer Morocco",
    
    // French
    "Développeur Web Maroc", "Développeur Full-Stack", "Programmeur Safi", 
    "Développeur React Maroc", "Étudiant Informatique", "Développeur Frontend",
    "Développeur JavaScript Maroc", "Créateur de sites web Safi",
    
    // Arabic
    "مطور ويب المغرب", "مطور مواقع آسفي", "مبرمج المغرب", "طالب علوم الحاسوب"
  ],
  authors: [{ name: "Bilal EL AZZAM" }],
  creator: "Bilal EL AZZAM",
  publisher: "Bilal EL AZZAM",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_MA"],
    title: "Bilal EL AZZAM - Full-Stack Developer from Safi, Morocco",
    description: "Computer Science Student & Full-Stack Developer specializing in React, Next.js, TypeScript. Based in Safi, Morocco. Available for web development projects.",
    siteName: "Bilal EL AZZAM Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal EL AZZAM - Full-Stack Developer",
    description: "Computer Science Student & Developer from Safi, Morocco",
  },
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: "#1b2a41",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="font-sans">
        <GoogleAnalytics />
        <ResponsiveFixes />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LightboxProvider>{children}</LightboxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
