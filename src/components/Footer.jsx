import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import ClickSpark from './animations/ClickSpark'

function Footer() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleLinkClick = (path) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Navigate after a short delay
    setTimeout(() => {
      navigate(path)
    }, 300)
  }

  const socialLinks = [
    { icon: 'facebook-f', url: '#', label: 'Facebook' },
    { icon: 'instagram', url: '#', label: 'Instagram' },
    { icon: 'twitter', url: '#', label: 'Twitter' },
    { icon: 'linkedin-in', url: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-dark-light border-t border-gold/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <img src="/images/logo.svg" alt="Don Pépé Logo" className="h-12 mb-4" />
            <h3 className="text-2xl font-serif text-gold mb-2">Don Pépé</h3>
            <p className="text-gray-400 text-sm italic">Luxury Beyond Limits</p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <ClickSpark key={social.icon}>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-colors"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </motion.a>
                </ClickSpark>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider">{t('quick_links')}</h4>
            <ul className="space-y-2">
              {[
                { path: '/', key: 'nav_home' },
                { path: '/services', key: 'nav_services' },
                { path: '/concierge', key: 'nav_concierge' },
                { path: '/contact', key: 'nav_contact' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-400 hover:text-gold transition-colors text-sm text-left"
                  >
                    {t(link.key)}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/admin/login"
                  className="text-gray-400 hover:text-gold transition-colors text-sm text-left"
                >
                  <i className="fas fa-shield-alt mr-2"></i>Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider">{t('contact_us')}</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-gold mt-1"></i>
                <span>Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-gold"></i>
                <span>+971 58 592 6244 / +971 55 204 7022</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-gold"></i>
                <span>donpepeservices@proton.me</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Don Pépé Services. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

