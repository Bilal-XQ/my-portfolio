import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LightboxProvider } from "@/components/lightbox"
import ResponsiveFixes from "@/components/responsive-fixes"

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description: "CS student & aspiring Full-Stack Developer",
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
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="font-sans">
        <ResponsiveFixes />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LightboxProvider>{children}</LightboxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
