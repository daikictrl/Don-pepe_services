import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { DataManager } from '../utils/dataManager'
import ClickSpark from '../components/animations/ClickSpark'
import Dock from '../components/animations/Dock'

function Concierge() {
  const { t } = useLanguage()
  const [services, setServices] = useState([])

  useEffect(() => {
    setServices(DataManager.getConcierge())
  }, [])

  return (
    <div className="pt-20 min-h-screen">
      {/* Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-purple-dark/20 to-dark"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
            opacity: 0.3
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-serif text-gold mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('nav_concierge')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('personalized_experiences')}
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-gold mb-4">{t('luxury_concierge')}</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              {t('concierge_service_desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.icon}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <ClickSpark>
                  <Dock>
                    <div className="p-8 bg-dark-light border border-gold/20 rounded-xl hover:border-gold transition-all glow-effect h-full flex flex-col">
                      <motion.div
                        className="text-6xl text-gold mb-6"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <i className={`fas fa-${service.icon}`}></i>
                      </motion.div>
                      <h3 className="text-2xl font-serif text-gold mb-4">{service.titleKey ? t(service.titleKey) : service.title}</h3>
                        <p className="text-gray-400 leading-relaxed flex-grow">{service.descriptionKey ? t(service.descriptionKey) : service.description}</p>
                      <Link
                        to="/contact"
                        className="inline-block mt-6 text-gold font-semibold hover:translate-x-2 transition-transform"
                      >
                        {t('book_service')} →
                      </Link>
                    </div>
                  </Dock>
                </ClickSpark>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-dark-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-pulse-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-serif text-gold mb-4">{t('get_in_touch')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              {t('contact_form_desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ClickSpark>
              <Dock>
                <a
                  href="https://wa.me/971585926244?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20your%20concierge%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 bg-dark border border-gold/20 rounded-xl hover:border-gold transition-all text-center glow-effect overflow-hidden"
                >
                  <div className="text-5xl text-green-500 mb-4">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <h3 className="text-xl font-serif text-gold mb-3">{t('whatsapp')}</h3>
                  <p className="text-gray-400 text-sm mb-6 min-h-[3rem]">{t('for_immediate_assistance')}</p>
                  <div className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider text-sm">
                    {t('chat_with_us')} →
                  </div>
                </a>
              </Dock>
            </ClickSpark>

            <ClickSpark>
              <Dock>
                <a
                  href="mailto:donpepeservices@proton.me?subject={t('concierge_service_inquiry')}"
                  className="block p-8 bg-dark border border-gold/20 rounded-xl hover:border-gold transition-all text-center glow-effect overflow-hidden"
                >
                  <div className="text-5xl text-red-500 mb-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3 className="text-xl font-serif text-gold mb-3">{t('email')}</h3>
                  <p className="text-gray-400 text-sm mb-6 min-h-[3rem]">{t('for_detailed_inquiries')}</p>
                  <div className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider text-sm">
                    {t('send_email')} →
                  </div>
                </a>
              </Dock>
            </ClickSpark>

            <ClickSpark>
              <Dock>
                <a
                  href="tel:+971585926244"
                  className="block p-8 bg-dark border border-gold/20 rounded-xl hover:border-gold transition-all text-center glow-effect overflow-hidden"
                >
                  <div className="text-5xl text-gold mb-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h3 className="text-xl font-serif text-gold mb-3">{t('phone')}</h3>
                  <p className="text-gray-400 text-sm mb-6 min-h-[3rem]">{t('speak_directly')}</p>
                  <div className="mt-4 text-gold font-semibold">
                    {t('call_us')} →
                  </div>
                </a>
              </Dock>
            </ClickSpark>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Concierge

