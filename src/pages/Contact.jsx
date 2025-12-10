import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import ClickSpark from '../components/animations/ClickSpark'
import Dock from '../components/animations/Dock'

function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(formData.subject || t('email_subject_contact'))
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    )
    window.location.href = `mailto:donpepeservices@proton.me?subject=${subject}&body=${body}`
  }

  const offices = [
    {
      name: 'Dubai Office',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      address: 'Dubai, UAE',
      phone: '+971 58 592 6244 / +971 55 204 7022',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
    },
    {
      name: 'London Office',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      address: 'Dubai, UAE',
      phone: '+971 58 592 6244 / +971 55 204 7022',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
    },
    {
      name: 'Monaco Office',
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      address: 'Dubai, UAE',
      phone: '+971 58 592 6244 / +971 55 204 7022',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
    }
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-purple-dark/20 to-dark"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
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
            {t('nav_contact')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('contact_banner_subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ClickSpark>
              <Dock>
                <a
                  href="https://wa.me/971585926244?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20Don%20P%C3%A9p%C3%A9%20Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 bg-dark-light border border-gold/20 rounded-xl hover:border-gold transition-all text-center glow-effect overflow-hidden"
                >
                  <div className="text-6xl text-green-500 mb-4">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <h3 className="text-2xl font-serif text-gold mb-3">{t('whatsapp')}</h3>
                  <p className="text-gray-400 mb-6 min-h-[3rem]">{t('for_immediate_assistance_quick')}</p>
                  <div className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider text-sm">
                    {t('contact_whatsapp')} →
                  </div>
                </a>
              </Dock>
            </ClickSpark>

            <ClickSpark>
              <Dock>
                <a
                  href="mailto:donpepeservices@proton.me?subject=Inquiry from Don Pépé Services Website"
                  className="block p-8 bg-dark-light border border-gold/20 rounded-xl hover:border-gold transition-all text-center glow-effect overflow-hidden"
                >
                  <div className="text-6xl text-red-500 mb-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3 className="text-2xl font-serif text-gold mb-3">{t('email')}</h3>
                  <p className="text-gray-400 mb-6 min-h-[3rem]">{t('for_detailed_inquiries_info')}</p>
                  <div className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider text-sm">
                    {t('contact_email')} →
                  </div>
                </a>
              </Dock>
            </ClickSpark>

            <ClickSpark>
              <Dock>
                <a
                  href="tel:+971585926244"
                  className="block p-8 bg-dark-light border border-gold/20 rounded-xl hover:border-gold transition-all text-center glow-effect overflow-hidden"
                >
                  <div className="text-6xl text-gold mb-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h3 className="text-2xl font-serif text-gold mb-3">{t('phone')}</h3>
                  <p className="text-gray-400 mb-6 min-h-[3rem]">{t('speak_directly')}</p>
                  <div className="mt-4 text-gold font-semibold text-lg">
                    +971 58 592 6244
                  </div>
                  <div className="text-gold font-semibold text-lg">
                    +971 55 204 7022
                  </div>
                </a>
              </Dock>
            </ClickSpark>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-dark-light border border-gold/20 rounded-xl p-8 glow-effect">
              <h2 className="text-3xl font-serif text-gold mb-6 text-center">{t('send_message')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gold mb-2 font-semibold">{t('full_name')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gold mb-2 font-semibold">{t('email_address')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gold mb-2 font-semibold">{t('phone_number')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gold mb-2 font-semibold">{t('subject')} *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold mb-2 font-semibold">{t('your_message')} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <ClickSpark>
                  <Dock>
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider glow-effect"
                    >
                      {t('btn_send_message')}
                    </button>
                  </Dock>
                </ClickSpark>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-20 bg-dark-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-gold mb-4">{t('our_offices')}</h2>
            <p className="text-gray-400 text-lg">{t('offices_subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <ClickSpark>
                  <Dock>
                    <div className="bg-dark border border-gold/20 rounded-xl overflow-hidden hover:border-gold transition-all glow-effect">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={office.image}
                          alt={office.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-serif text-gold mb-4">{office.name}</h3>
                        <div className="space-y-3 text-gray-400 text-sm">
                          <p className="flex items-start gap-3">
                            <i className="fas fa-map-marker-alt text-gold mt-1"></i>
                            <span>{office.address}</span>
                          </p>
                          <p className="flex items-center gap-3">
                            <i className="fas fa-phone text-gold"></i>
                            <span>{office.phone}</span>
                          </p>
                          <p className="flex items-center gap-3">
                            <i className="fas fa-clock text-gold"></i>
                            <span>{office.hours}</span>
                          </p>
                        </div>
                        <a
                          href={`https://wa.me/971585926244?text=Hello%2C%20I%27d%20like%20to%20visit%20your%20${office.name}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
                        >
                          <i className="fab fa-whatsapp mr-2"></i>Contact
                        </a>
                      </div>
                    </div>
                  </Dock>
                </ClickSpark>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden border border-gold/20"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1785090455045!2d55.27027881541551!3d25.197196983891853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4345f84c0a01%3A0x3d1b4c8a0c8f3c8b!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1625656789012!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact

