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

  return (
    <div className="min-h-screen bg-dark">
      <AdminSidebar />
      <main className="ml-64">
        {/* Top Header with Language Selector */}
        <header className="bg-dark-light border-b border-gold/20 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-end">
            {/* Language Selector */}
            <div className="relative">
              <ClickSpark>
                <Dock>
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-lg text-gray-300 hover:bg-gold/20 hover:text-gold transition-all"
                  >
                    <i className="fas fa-globe text-gold"></i>
                    <span className="text-sm font-semibold uppercase">{language === 'en' ? 'English' : 'Français'}</span>
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
        
        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout




