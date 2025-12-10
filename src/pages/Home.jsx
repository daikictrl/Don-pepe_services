import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import ClickSpark from '../components/animations/ClickSpark'
import Dock from '../components/animations/Dock'
import StatsCounter from '../components/StatsCounter'
import Hero3D from '../components/Hero3D'

function Home() {
  const { t } = useLanguage()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const handleNavClick = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const services = [
    {
      icon: 'home',
      title: t('properties_title'),
      description: t('properties_desc'),
      link: '/services#properties',
      gradient: 'from-gold to-gold-dark'
    },
    {
      icon: 'car',
      title: t('vehicles_title'),
      description: t('vehicles_desc'),
      link: '/services#vehicles',
      gradient: 'from-purple to-purple-dark'
    },
    {
      icon: 'concierge-bell',
      title: t('concierge_title'),
      description: t('concierge_desc'),
      link: '/concierge',
      gradient: 'from-gold to-purple'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Spotlight Effect */}
        <div className="absolute inset-0 z-0 spotlight">
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light via-purple-dark/20 to-dark"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] animate-pulse-slow"></div>
        </div>

        {/* Glow Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* 3D Car */}
        <motion.div
          style={{ opacity, scale }}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10 w-96 h-64 hidden lg:block"
        >
          <Hero3D />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 bg-gradient-to-r from-gold via-gold-light via-purple-light to-gold bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero_title')}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero_subtitle')}
          </motion.p>

          <motion.div
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ClickSpark>
              <Dock>
                <Link
                  to="/services"
                  className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg shadow-lg glow-effect hover:shadow-xl transition-all uppercase tracking-wider"
                >
                  {t('btn_explore')}
                </Link>
              </Dock>
            </ClickSpark>
            
            <ClickSpark>
              <Dock>
                <Link
                  to="/concierge"
                  className="px-8 py-4 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 transition-all uppercase tracking-wider backdrop-blur-sm"
                >
                  {t('btn_concierge')}
                </Link>
              </Dock>
            </ClickSpark>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-purple-dark/10 to-dark"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-serif text-gold mb-6">{t('home_about_title')}</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>{t('home_about_p1')}</p>
              <p>{t('home_about_p2')}</p>
              <p>{t('home_about_p3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-gold mb-4">{t('services_title')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('home_services_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.icon}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <ClickSpark>
                  <Dock>
                    <Link
                      to={service.link}
                      className="block p-8 bg-dark border border-gold/20 rounded-xl hover:border-gold transition-all relative overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                      <div className="relative z-10">
                        <motion.div
                          className="text-6xl text-gold mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <i className={`fas fa-${service.icon}`}></i>
                        </motion.div>
                        <h3 className="text-2xl font-serif text-gold mb-4">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{service.description}</p>
                        <motion.span
                          className="inline-block mt-6 text-gold font-semibold group-hover:translate-x-2 transition-transform"
                        >
                          {t('btn_view_more')} →
                        </motion.span>
                      </div>
                    </Link>
                  </Dock>
                </ClickSpark>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter />

      {/* Why Choose Us Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-purple-dark/5 to-dark"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-gold mb-4">{t('home_why_choose_title')}</h2>
            <p className="text-gray-400 text-lg">{t('home_why_choose_subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'award',
                title: t('home_why_excellence'),
                description: t('home_why_excellence_desc')
              },
              {
                icon: 'users',
                title: t('home_why_trusted_network'),
                description: t('home_why_trusted_desc')
              },
              {
                icon: 'shield-alt',
                title: t('home_why_security'),
                description: t('home_why_security_desc')
              },
              {
                icon: 'headset',
                title: t('home_why_support'),
                description: t('home_why_support_desc')
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.icon}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-dark border border-gold/20 rounded-xl hover:border-gold transition-all text-center glow-effect"
              >
                <div className="text-5xl text-gold mb-4">
                  <i className={`fas fa-${feature.icon}`}></i>
                </div>
                <h3 className="text-xl font-serif text-gold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold/20 via-purple/20 to-gold/20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-serif text-gold mb-6">{t('home_cta_ready')}</h2>
            <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
              {t('home_cta_contact')}
            </p>
            <ClickSpark>
              <Dock>
                <Link
                  to="/contact"
                  onClick={handleNavClick}
                  className="inline-block px-10 py-5 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg shadow-lg glow-effect hover:shadow-xl transition-all uppercase tracking-wider text-lg"
                >
                  {t('home_cta_get_started')}
                </Link>
              </Dock>
            </ClickSpark>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

