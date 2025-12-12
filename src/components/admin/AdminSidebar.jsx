import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import ClickSpark from '../animations/ClickSpark'
import Dock from '../animations/Dock'

function AdminSidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/admin/dashboard', icon: 'tachometer-alt', label: 'Dashboard' },
    { path: '/admin/cars', icon: 'car', label: 'Cars' },
    { path: '/admin/properties', icon: 'home', label: 'Properties' },
    { path: '/admin/concierge', icon: 'concierge-bell', label: 'Concierge' },
    { path: '/admin/messages', icon: 'envelope', label: 'Messages' },
    { path: '/admin/users', icon: 'users', label: 'Users' },
    { path: '/admin/settings', icon: 'cog', label: 'Settings' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  const sidebarContent = (
    <div className="p-6">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group mb-8" onClick={handleLinkClick}>
        <motion.img 
          src="/images/logo.svg" 
          alt="Don Pépé Logo" 
          className="h-10 w-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <div>
          <h1 className="text-xl sm:text-2xl font-serif bg-gradient-to-r from-gold via-gold-light to-purple-light bg-clip-text text-transparent">
            {t('site_name')}
          </h1>
          <span className="text-xs text-gold-light tracking-widest uppercase block">
            Luxury Beyond Limits
          </span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ClickSpark>
              <Dock>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-gold text-dark font-semibold'
                      : 'text-gray-300 hover:bg-gold/10 hover:text-gold'
                  }`}
                >
                  <i className={`fas fa-${item.icon} w-5`}></i>
                  <span>{item.label}</span>
                </Link>
              </Dock>
            </ClickSpark>
          </motion.div>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="mt-8 pt-8 border-t border-gold/20">
        <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-dark rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-user text-gold"></i>
          </div>
          <div className="overflow-hidden">
            <p className="text-gold font-semibold text-sm truncate">{user?.name}</p>
            <p className="text-gray-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>

        <ClickSpark>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all border border-red-500/20"
          >
            <i className="fas fa-sign-out-alt w-5"></i>
            <span>Logout</span>
          </button>
        </ClickSpark>

        {/* Public Site Link */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="mt-3 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gold/10 hover:text-gold transition-all border border-gold/20"
        >
          <i className="fas fa-external-link-alt w-5"></i>
          <span>View Website</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block w-64 bg-dark-light border-r border-gold/20 h-screen fixed left-0 top-0 overflow-y-auto z-50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar - Slide in from left */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-64 sm:w-72 bg-dark-light border-r border-gold/20 h-screen overflow-y-auto z-50 lg:hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
              
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminSidebar