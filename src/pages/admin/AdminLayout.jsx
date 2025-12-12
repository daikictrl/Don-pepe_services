import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminLayout() {
  const { theme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark">
      <AdminSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      {/* Main content area - responsive margin */}
      <main className="lg:ml-64">
        {/* Top Header with Mobile Menu Toggle & Language Selector */}
        <header className="bg-dark-light border-b border-gold/20 px-4 sm:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Toggle - Only visible on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* Spacer for desktop */}
            <div className="hidden lg:block"></div>

            {/* Language Selector */}
            <div className="relative">
              <ClickSpark>
                <Dock>
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gold/10 border border-gold/20 rounded-lg text-gray-300 hover:bg-gold/20 hover:text-gold transition-all"
                  >
                    <i className="fas fa-globe text-gold"></i>
                    <span className="text-sm font-semibold uppercase hidden sm:inline">
                      {language === 'en' ? 'English' : 'Français'}
                    </span>
                    <span className="text-sm font-semibold uppercase sm:hidden">
                      {language === 'en' ? 'EN' : 'FR'}
                    </span>
                    <i className={`fas fa-chevron-${isLangDropdownOpen ? 'up' : 'down'} text-xs text-gold`}></i>
                  </button>
                  {isLangDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-0"
                        onClick={() => setIsLangDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-dark-light border border-gold/20 rounded-lg shadow-xl overflow-hidden z-50"
                      >
                        <button
                          onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gold/10 transition-colors ${
                            language === 'en' ? 'text-gold' : 'text-gray-300'
                          }`}
                        >
                          <i className="fas fa-flag"></i> English
                        </button>
                        <button
                          onClick={() => { setLanguage('fr'); setIsLangDropdownOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gold/10 transition-colors border-t border-gold/10 ${
                            language === 'fr' ? 'text-gold' : 'text-gray-300'
                          }`}
                        >
                          <i className="fas fa-flag"></i> Français
                        </button>
                      </motion.div>
                    </>
                  )}
                </Dock>
              </ClickSpark>
            </div>
          </div>
        </header>
        
        {/* Page Content - Responsive padding */}
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout