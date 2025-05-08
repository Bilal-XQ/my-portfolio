"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui-card"
import { Mail, Github, Linkedin } from "lucide-react"

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="contact" ref={ref} className="py-16">
      <div className="section-bg">
        <div className="text-center mb-10">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Feel free to reach out to me for internship opportunities or collaborations.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <motion.div variants={item} className="flex justify-center">
            <ContactCard
              icon={<Mail className="h-8 w-8" />}
              title="Email"
              value="bilalelazzam.dev@gmail.com"
              link="mailto:bilalelazzam.dev@gmail.com"
            />
          </motion.div>
          <motion.div variants={item} className="flex justify-center">
            <ContactCard
              icon={<Github className="h-8 w-8" />}
              title="GitHub"
              value="Bilal-XQ"
              link="https://github.com/Bilal-XQ"
            />
          </motion.div>
          <motion.div variants={item} className="flex justify-center">
            <ContactCard
              icon={<Linkedin className="h-8 w-8" />}
              title="LinkedIn"
              value="bilalelazzam"
              link="https://www.linkedin.com/in/bilalelazzam"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  value: string
  link: string
}

function ContactCard({ icon, title, value, link }: ContactCardProps) {
  return (
    <Card className="h-full w-full hover:shadow-multilayer transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-blue-300 mb-4 bg-blue-500/10 p-4 rounded-full">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 break-all">{value}</p>
        <Button
          variant="outline"
          className="border-blue-300/50 text-white hover:bg-blue-900/30 hover:border-blue-300 min-h-[44px] w-full rounded-full"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            Connect
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
