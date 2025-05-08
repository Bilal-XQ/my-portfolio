"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui-card"
import { Calendar } from "lucide-react"
import { useContext } from "react"
import { LightboxContext } from "@/components/lightbox"

interface Event {
  title: string
  date: string
  description: string
  imageUrl: string
}

const events: Event[] = [
  {
    title: "Gitex Africa 2025",
    date: "May 2025",
    description:
      "Attended the largest tech exhibition in Africa, exploring the latest innovations and networking with industry professionals.",
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "GeeksBlaBla @ YouCode Safi",
    date: "March 2025",
    description: "Participated in a developer community meetup discussing web development trends and best practices.",
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
]

export default function Events() {
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
    <section id="events" ref={ref} className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Events</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Tech events and conferences I've attended to expand my knowledge and network.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        {events.map((event, index) => (
          <motion.div key={index} variants={item}>
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function EventCard({ event }: { event: Event }) {
  const { openLightbox } = useContext(LightboxContext)

  return (
    <Card className="overflow-hidden hover:shadow-multilayer transition-all duration-300 border-blue-300/30 hover:border-blue-300/60">
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => openLightbox(event.imageUrl, event.title, event.date)}
      >
        <img
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue-darker to-transparent opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-blue-300 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <p className="text-gray-300">{event.description}</p>
      </CardContent>
    </Card>
  )
}
