"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { 
  Code, 
  Palette, 
  Zap, 
  Globe, 
  Smartphone, 
  ArrowRight,
  Check,
  Star
} from "lucide-react"

interface Service {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  pricing: {
    basic: number
    premium: number
  }
  popular?: boolean
}

const services: Service[] = [
  {
    title: "Landing Page Development",
    description: "High-converting, responsive landing pages that captivate your audience and drive results",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading Speed",
      "Mobile-First Approach",
      "Cross-Browser Compatible"
    ],
    icon: <Globe className="w-8 h-8" />,
    pricing: {
      basic: 499,
      premium: 899
    }
  },
  {
    title: "Multi-page Website Creation",
    description: "Complete website solutions with multiple pages, CMS integration, and dynamic functionality",
    features: [
      "Custom Design",
      "Content Management",
      "Database Integration",
      "User Authentication",
      "Admin Dashboard"
    ],
    icon: <Code className="w-8 h-8" />,
    pricing: {
      basic: 1299,
      premium: 2499
    },
    popular: true
  },
  {
    title: "Website Redesign & Optimization",
    description: "Transform your existing website with modern design and performance improvements",
    features: [
      "UI/UX Redesign",
      "Performance Optimization",
      "Mobile Optimization",
      "SEO Enhancement",
      "Accessibility Improvements"
    ],
    icon: <Palette className="w-8 h-8" />,
    pricing: {
      basic: 799,
      premium: 1499
    }
  },
  {
    title: "Custom Web Applications",
    description: "Powerful web applications tailored to your specific business needs and requirements",
    features: [
      "Custom Functionality",
      "API Integration",
      "Real-time Features",
      "Scalable Architecture",
      "Advanced Security"
    ],
    icon: <Smartphone className="w-8 h-8" />,
    pricing: {
      basic: 2499,
      premium: 4999
    }
  },
  {
    title: "Performance Optimization",
    description: "Boost your website's speed and performance for better user experience and SEO",
    features: [
      "Speed Optimization",
      "Code Minification",
      "Image Optimization",
      "Caching Implementation",
      "Performance Monitoring"
    ],
    icon: <Zap className="w-8 h-8" />,
    pricing: {
      basic: 399,
      premium: 699
    }
  }
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/10 via-transparent to-blue-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(26,75,127,0.15),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-primary via-blue-secondary to-text-primary bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            Services
          </motion.h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Comprehensive web development solutions to bring your digital vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredService(service.title)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-blue-primary to-blue-secondary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Service Card */}
              <motion.div
                className="relative h-full bg-black-tertiary/50 backdrop-blur-sm rounded-2xl border border-blue-primary/20 p-8 transition-all duration-500"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(26, 75, 127, 0.4)",
                  boxShadow: "0 25px 50px -12px rgba(26, 75, 127, 0.25)"
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-primary/20 to-blue-secondary/20 rounded-2xl flex items-center justify-center mb-6 text-blue-primary group-hover:text-blue-secondary transition-colors duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-blue-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-text-secondary"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    >
                      <div className="w-5 h-5 bg-blue-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-blue-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Basic</span>
                    <span className="text-2xl font-bold text-text-primary">
                      ${service.pricing.basic.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Premium</span>
                    <span className="text-2xl font-bold text-blue-primary">
                      ${service.pricing.premium.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-primary to-blue-secondary hover:from-blue-primary/90 hover:to-blue-secondary/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-primary/10 to-blue-secondary/10 blur-xl" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-primary/10 to-blue-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-primary/20">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Every project is unique. Let's discuss your specific requirements and create a tailored solution that perfectly fits your needs and budget.
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-primary to-blue-secondary hover:from-blue-primary/90 hover:to-blue-secondary/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}