import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function StatsCounter() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: 15, suffix: '+', label: t('stat_experience'), icon: 'calendar-alt' },
    { value: 500, suffix: '+', label: t('stat_clients'), icon: 'users' },
    { value: 100, suffix: '%', label: t('stat_satisfaction'), icon: 'heart' },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-dark via-purple-dark to-dark relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-pulse-slow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
              className="text-center"
            >
              <div className="mb-4 text-6xl text-gold">
                <i className={`fas fa-${stat.icon}`}></i>
              </div>
              <motion.div
                className="text-7xl md:text-8xl font-serif text-gold mb-4 font-bold"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
              >
                <AnimatedNumber value={stat.value} isInView={isInView} />
                <span className="text-gold-light">{stat.suffix}</span>
              </motion.div>
              <div className="text-xl text-gray-300 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedNumber({ value, isInView }) {
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    if (!isInView) return

    let startTime = null
    const duration = 2000 // 2 seconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(easeOutCubic * value)
      
      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return <span>{displayValue}</span>
}

export default StatsCounter

