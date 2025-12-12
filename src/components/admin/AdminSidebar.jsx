import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import ClickSpark from '../animations/ClickSpark'
import Dock from '../animations/Dock'

function AdminSidebar() {
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

  return (
    <aside className="w-64 bg-dark-light border-r border-gold/20 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <img src="/images/logo.svg" alt="Don Pépé Logo" className="h-10 mb-3" />
          <h2 className="text-xl font-serif text-gold">{t('admin_site_name')}</h2>
          <p className="text-gray-400 text-xs">{t('admin_manage_inventory_desc')}</p>
        </div>

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
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === item.path
                        ? 'bg-gold text-dark font-semibold'
                        : 'text-gray-300 hover:bg-gold/10 hover:text-gold'
                    }`}
                  >
                    <i className={`fas fa-${item.icon}`}></i>
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
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <i className="fas fa-user text-gold"></i>
            </div>
            <div>
              <p className="text-gold font-semibold text-sm">{user?.name}</p>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
          </div>

          <ClickSpark>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all border border-red-500/20"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </ClickSpark>

          {/* Public Site Link */}
          <Link
            to="/"
            className="block mt-3 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gold/10 hover:text-gold transition-all border border-gold/20 text-center"
          >
            <i className="fas fa-external-link-alt"></i>
            <span>View Website</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar

