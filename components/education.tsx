"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Calendar, MapPin, Award, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui-card"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface EducationItem {
  degree: string
  institution: string
  period: string
  location: string
  distinction?: string
}

const educationItems: EducationItem[] = [
  {
    degree: "Computer Engineering (Génie Informatique)",
    institution: "EST Safi",
    period: "2024 - Present",
    location: "Safi, Morocco",
  },
  {
    degree: "Baccalaureate in Physical Sciences",
    institution: "Groupe Scolaire El Azhari",
    period: "2024",
    location: "Safi, Morocco",
    distinction: "Bien",
  },
]

export default function Education() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [expanded, setExpanded] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index)
  }

  return (
    <section id="education" ref={ref} className="py-16">
      <div className="section-bg">
        <div className="text-center mb-10">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic journey and qualifications in computer science and related fields.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="border-blue-300/30 hover:border-blue-300/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                      <p className="text-blue-200">{item.institution}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-300 hover:text-white hover:bg-blue-900/30 rounded-full"
                    >
                      {expanded === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                  </div>

                  {expanded === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-blue-300/20 p-4 bg-blue-900/10"
                    >
                      <div className="flex flex-col gap-3 text-sm text-gray-300">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-blue-300" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                          <span>{item.location}</span>
                        </div>
                        {item.distinction && (
                          <div className="flex items-center mt-2 bg-yellow-900/20 p-2 rounded-md border border-yellow-500/30">
                            <Award className="h-5 w-5 mr-2 text-yellow-400" />
                            <span className="text-yellow-300 font-medium">Distinction: {item.distinction}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
