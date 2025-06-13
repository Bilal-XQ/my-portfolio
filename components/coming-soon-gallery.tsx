"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Palette, Sparkles, Bell, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ComingSoonGallery() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Design Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A curated collection of design work and creative projects
          </p>
        </motion.div>

        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Desktop/Tablet View */}
          <div className="hidden sm:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12 border border-white/20 backdrop-blur-sm overflow-hidden"
            >
              {/* Floating design elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    rotate: -360,
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                  className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-blue-400/20 rounded-full blur-lg"
                />
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-xl"
                >
                  <Palette className="h-12 w-12 text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Coming Soon
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  I'm currently curating a collection of my best design work, UI/UX projects, and creative explorations. 
                  This gallery will showcase the visual side of my development journey.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-6 mb-8"
                >
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    <span>UI/UX Designs</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Sparkles className="h-5 w-5 text-pink-500" />
                    <span>Creative Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span>Design Systems</span>
                  </div>
                </motion.div>

                {/* Newsletter Signup */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="max-w-md mx-auto"
                >
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get notified when the gallery launches
                  </p>
                  
                  {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                        required
                      />
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 group">
                        <Bell className="h-4 w-4 mr-2" />
                        Notify Me
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                      <p className="text-green-700 dark:text-green-400 font-medium">
                        ✓ You'll be notified when the gallery is ready!
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Mobile View - Single Placeholder */}
          <div className="sm:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-white/20 backdrop-blur-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 shadow-lg">
                <Palette className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Design Gallery
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Coming soon - a showcase of creative work and design projects
              </p>

              <Button className="bg-blue-600 hover:bg-blue-700">
                <Bell className="h-4 w-4 mr-2" />
                Get Notified
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
