import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import Dock from './animations/Dock'
import ClickSpark from './animations/ClickSpark'

function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)

  const navItems = [
    { path: '/', key: 'nav_home' },
    { path: '/services', key: 'nav_services', hasDropdown: true },
    { path: '/concierge', key: 'nav_concierge' },
    { path: '/contact', key: 'nav_contact' },
  ]

  const servicesSubmenu = [
    { path: '/services#properties', key: 'nav_luxury_properties' },
    { path: '/services#vehicles', key: 'nav_luxury_cars' },
  ]

  const handleNavClick = (path) => {
    setIsMenuOpen(false)
    setIsServicesDropdownOpen(false)
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              src="/images/logo.svg" 
              alt="Don Pépé Logo" 
              className="h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
            <div>
              <h1 className="text-2xl font-serif bg-gradient-to-r from-gold via-gold-light to-purple-light bg-clip-text text-transparent">
                {t('site_name')}
              </h1>
              <span className="text-xs text-gold-light tracking-widest uppercase block">
                {t('site_tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div key={item.path} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      className="text-gray-300 uppercase text-sm font-medium tracking-wider hover:text-gold transition-colors relative"
                    >
                      {t(item.key)}
                      <i className="fas fa-chevron-down ml-2 text-xs"></i>
                    </button>
                    {isServicesDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-0"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-dark-light border border-gold/20 rounded-lg shadow-xl overflow-hidden z-[60]"
                        >
                          {servicesSubmenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => handleNavClick(subItem.path)}
                              className="block px-6 py-4 text-gray-300 hover:bg-gold/10 hover:text-gold transition-colors border-b border-gold/10 last:border-b-0"
                            >
                              <div className="flex items-center justify-between">
                                <span>{t(subItem.key)}</span>
                                <i className="fas fa-chevron-right text-xs"></i>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      </>
                    )}
                    {(location.pathname === item.path || location.hash === '#properties' || location.hash === '#vehicles') && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-purple"
                        layoutId="activeTab"
                        initial={false}
                      />
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className="relative"
                  >
                    <motion.span
                      className="text-gray-300 uppercase text-sm font-medium tracking-wider hover:text-gold transition-colors"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {t(item.key)}
                    </motion.span>
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-purple"
                        layoutId="activeTab"
                        initial={false}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <Dock className="hidden md:flex">
              <div className="relative group">
                <button className="p-2 rounded-lg hover:bg-gold/10 transition-colors">
                  <i className="fas fa-globe text-gold text-lg"></i>
                </button>
                <div className="absolute top-full right-0 mt-2 w-40 bg-dark-light border border-gold/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`w-full px-4 py-2 text-left hover:bg-gold/10 transition-colors ${
                      language === 'en' ? 'text-gold' : 'text-gray-300'
                    }`}
                  >
                    <i className="fas fa-flag mr-2"></i> English
                  </button>
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`w-full px-4 py-2 text-left hover:bg-gold/10 transition-colors ${
                      language === 'fr' ? 'text-gold' : 'text-gray-300'
                    }`}
                  >
                    <i className="fas fa-flag mr-2"></i> Français
                  </button>
                </div>
              </div>
            </Dock>

            {/* Theme Toggle */}
            <ClickSpark>
              <button
                onClick={() => {
                  toggleTheme()
                }}
                className="p-2 rounded-lg hover:bg-gold/10 transition-colors glow-effect relative"
                aria-label="Toggle theme"
              >
                <motion.i
                  key={theme}
                  className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-gold text-lg`}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />
              </button>
            </ClickSpark>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gold/20"
          >
            {navItems.map((item) => (
              <div key={item.path}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      className={`w-full text-left block py-3 px-4 rounded-lg transition-colors ${
                        location.pathname === item.path || location.hash === '#properties' || location.hash === '#vehicles'
                          ? 'bg-gold/10 text-gold'
                          : 'text-gray-300 hover:bg-gold/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{t(item.key)}</span>
                        <i className={`fas fa-chevron-${isServicesDropdownOpen ? 'up' : 'down'} text-xs`}></i>
                      </div>
                    </button>
                    {isServicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-2"
                      >
                        {servicesSubmenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => handleNavClick(subItem.path)}
                            className="block py-2 px-4 rounded-lg text-gray-400 hover:bg-gold/5 hover:text-gold transition-colors text-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span>{t(subItem.key)}</span>
                              <i className="fas fa-chevron-right text-xs"></i>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`block py-3 px-4 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-300 hover:bg-gold/5'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  )
}

export default Header

