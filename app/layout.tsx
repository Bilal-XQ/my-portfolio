import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LightboxProvider } from "@/components/lightbox"
import ResponsiveFixes from "@/components/responsive-fixes"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description: "CS student & aspiring Full-Stack Developer",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  themeColor: "#1b2a41",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ResponsiveFixes />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LightboxProvider>{children}</LightboxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
