"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Users, Award, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Activity {
  organization: string
  role: string
  period: string
  description: string
  achievements: string[]
  logoPlaceholder: string
  website?: string
  skills: string[]
}

const activities: Activity[] = [
  {
    organization: "Cyber Atlas Club",
    role: "Active Member",
    period: "2024 - 2025",
    description: "Participating in cybersecurity initiatives, workshops, and competitions. Contributing to the development of security awareness programs and technical skill building within the academic community.",
    achievements: [
      "Participated in cybersecurity workshops and training sessions",
      "Contributed to security awareness campaigns",
      "Collaborated on cybersecurity research projects",
      "Mentored junior members in security fundamentals"
    ],
    logoPlaceholder: "Cyber Atlas Club Logo",
    website: "https://www.instagram.com/cyberatlas_ests/",
    skills: ["Cybersecurity", "Network Security", "Ethical Hacking", "Research"]
  },
  {
    organization: "Robotics & AI Club",
    role: "Team Member",
    period: "2024 - 2025", 
    description: "Engaged in robotics and AI projects focusing on programming, design, and implementation of automated systems. Participating in competitions and collaborative development of innovative robotic solutions.",
    achievements: [
      "Developed programming solutions for robotic systems",
      "Participated in regional robotics competitions",
      "Collaborated on interdisciplinary engineering projects",
      "Led workshops on robot programming fundamentals"
    ],
    logoPlaceholder: "Robotics & AI Club Logo",
    website: "https://www.instagram.com/robotics_aiclub.ests/",
    skills: ["Robotics", "AI/ML", "Automation", "Programming", "Engineering"]
  }
]

export default function ModernActivities() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Clubs & Activities
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Active involvement in organizations that foster technical growth, collaboration, and innovation
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.organization}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Organization Header */}
                  <div className="flex items-center gap-6 mb-6">
                    {/* Logo Placeholder */}
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                      {activity.organization.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {activity.organization}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                          {activity.role}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{activity.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {activity.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-3">
                      <Award className="h-4 w-4 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {activity.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: (index * 0.2) + (achievementIndex * 0.1) + 0.3 }}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Developed */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-3">
                      <Users className="h-4 w-4 text-green-500" />
                      Skills Developed
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  {activity.website && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: (index * 0.2) + 0.6 }}
                      className="pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <a
                        href={activity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group/link"
                      >
                        Learn more about {activity.organization}
                        <ExternalLink className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}        </div>
      </div>
    </section>
  )
}
