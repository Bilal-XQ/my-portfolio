"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ContactMethod {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  color: string
}

const contactMethods: ContactMethod[] = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "bilalelazzam.dev@gmail.com",
    href: "mailto:bilalelazzam.dev@gmail.com",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/bilalelazzam",
    href: "https://linkedin.com/in/bilalelazzam",
    color: "from-blue-600 to-blue-700"
  },
  {
    icon: <Github className="h-5 w-5" />,
    label: "GitHub",
    value: "github.com/Bilal-XQ",
    href: "https://github.com/Bilal-XQ",
    color: "from-gray-700 to-gray-900"
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "Safi, Morocco",
    href: "#",
    color: "from-green-500 to-emerald-500"
  }
]

export default function ModernContact() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ready to collaborate on your next project? I'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
                Whether you have a project in mind, want to discuss opportunities, or just want to say hello, 
                I'm always open to connecting with fellow developers, designers, and innovators.
              </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                >
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block"
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {method.label}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {method.value}
                            </p>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center mt-12"
            >
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    Available for new opportunities
                  </span>
                </div>
                <p className="text-green-600 dark:text-green-300 text-sm mt-2">
                  Currently open to full-time positions and freelance projects
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
