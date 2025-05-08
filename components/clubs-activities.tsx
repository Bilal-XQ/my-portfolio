"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-card"
import { Palette, BotIcon as Robot, ClubIcon as Football, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ClubActivity {
  title: string
  role?: string
  description: string
  icon: React.ReactNode
  activities?: string[]
}

const clubsActivities: ClubActivity[] = [
  {
    title: "CyberAtlas Club",
    role: "Graphic Designer & Social Media Manager",
    description: "Content creation, event visuals, and workshop planning.",
    icon: <Palette className="h-10 w-10" />,
    activities: [
      "Designed promotional materials for cybersecurity events",
      "Created social media content to increase club visibility",
      "Assisted in organizing workshops on networking, DDoS simulation, and malware analysis on Raspberry Pi",
    ],
  },
  {
    title: "Robotics & AI Club",
    description: "Participating in Arduino-based projects and AI basics workshops.",
    icon: <Robot className="h-10 w-10" />,
    activities: [
      "Worked on Arduino-based robotics projects",
      "Attended workshops on AI fundamentals",
      "Collaborated with team members on small automation projects",
    ],
  },
  {
    title: "Sports",
    description: "Active participation in football and basketball.",
    icon: <Football className="h-10 w-10" />,
    activities: [
      "Regular football practice and friendly matches",
      "Basketball team member for recreational games",
      "Participated in university sports events",
    ],
  },
]

export default function ClubsActivities() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [expandedActivity, setExpandedActivity] = useState<number | null>(0)

  const toggleActivity = (index: number) => {
    setExpandedActivity(expandedActivity === index ? null : index)
  }

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
    <section id="clubs-activities" ref={ref} className="py-16">
      <div className="section-bg">
        <div className="text-center mb-10">
          <h2 className="section-title">Clubs & Activities</h2>
          <p className="section-subtitle">
            Extracurricular activities where I apply my skills and pursue my interests.
          </p>
        </div>

        {/* Mobile Accordion View */}
        <div className="md:hidden space-y-4">
          {clubsActivities.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-multilayer transition-all duration-300 border-blue-300/30 hover:border-blue-300/50 overflow-hidden"
            >
              <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleActivity(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-3 rounded-full text-blue-300 min-w-[52px] min-h-[52px] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    {item.role && <p className="text-blue-200 text-sm">{item.role}</p>}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-300 hover:text-white hover:bg-blue-900/30 rounded-full"
                >
                  {expandedActivity === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </Button>
              </div>

              {expandedActivity === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-blue-300/20 p-4 bg-blue-900/10"
                >
                  <p className="text-gray-300 mb-3">{item.description}</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {item.activities?.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-300 mr-2">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </Card>
          ))}
        </div>

        {/* Desktop Grid View */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {clubsActivities.map((item, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full hover:shadow-multilayer transition-all duration-300 border-blue-300/30 hover:border-blue-300/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-blue-500/20 p-3 rounded-full text-blue-300 min-w-[52px] min-h-[52px] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-white">{item.title}</CardTitle>
                      {item.role && <p className="text-blue-200 text-sm">{item.role}</p>}
                    </div>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {item.activities?.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-300 mr-2">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
