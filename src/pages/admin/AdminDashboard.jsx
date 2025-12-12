import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // Check for action parameter and navigate accordingly
    const action = searchParams.get('action')
    if (action === 'add') {
      // This will be handled by the link, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchParams])

  const stats = [
    { 
      title: 'Total Cars', 
      value: '19', 
      icon: 'car', 
      color: 'from-blue-500 to-blue-600',
      link: '/admin/cars'
    },
    { 
      title: 'Total Properties', 
      value: '3', 
      icon: 'home', 
      color: 'from-purple-500 to-purple-600',
      link: '/admin/properties'
    },
    { 
      title: 'Concierge Services', 
      value: '6', 
      icon: 'concierge-bell', 
      color: 'from-gold to-gold-dark',
      link: '/admin/concierge'
    },
    { 
      title: 'Messages', 
      value: '0', 
      icon: 'envelope', 
      color: 'from-green-500 to-green-600',
      link: '/admin/messages'
    },
    { 
      title: 'Active Users', 
      value: '1', 
      icon: 'users', 
      color: 'from-red-500 to-red-600',
      link: '/admin/users'
    },
  ]

  const quickActions = [
    { icon: 'plus-circle', label: 'Add New Car', link: '/admin/cars?action=add', color: 'text-blue-400' },
    { icon: 'plus-circle', label: 'Add Property', link: '/admin/properties?action=add', color: 'text-purple-400' },
    { icon: 'plus-circle', label: 'Add Service', link: '/admin/concierge?action=add', color: 'text-gold' },
    { icon: 'user-plus', label: 'Add Admin', link: '/admin/users?action=add', color: 'text-green-400' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gold mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-400">Welcome back, {user?.name}</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ClickSpark>
              <Dock>
                <Link
                  to={stat.link}
                  className="block bg-dark-light border border-gold/20 rounded-xl p-6 hover:border-gold transition-all glow-effect h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <i className={`fas fa-${stat.icon} text-white text-xl`}></i>
                    </div>
                    <i className="fas fa-chevron-right text-gold"></i>
                  </div>
                  <h3 className="text-3xl font-bold text-gold mb-2">{stat.value}</h3>
                  <p className="text-gray-400">{stat.title}</p>
                </Link>
              </Dock>
            </ClickSpark>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-dark-light border border-gold/20 rounded-xl p-6 mb-8"
      >
        <h2 className="text-2xl font-serif text-gold mb-4">
          <i className="fas fa-bolt mr-2"></i>Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.label}
              to={action.link}
              className="flex items-center gap-3 px-4 py-3 bg-dark border border-gold/20 rounded-lg hover:border-gold transition-all group"
            >
              <i className={`fas fa-${action.icon} ${action.color} text-xl group-hover:scale-110 transition-transform`}></i>
              <span className="text-gray-300 group-hover:text-gold transition-colors">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Recent Messages */}
        <div className="bg-dark-light border border-gold/20 rounded-xl p-6">
          <h2 className="text-2xl font-serif text-gold mb-4">
            <i className="fas fa-inbox mr-2"></i>Recent Messages
          </h2>
          <div className="text-center py-8">
            <i className="fas fa-inbox text-gray-600 text-4xl mb-3"></i>
            <p className="text-gray-400">No messages yet</p>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-dark-light border border-gold/20 rounded-xl p-6">
          <h2 className="text-2xl font-serif text-gold mb-4">
            <i className="fas fa-server mr-2"></i>System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dark rounded-lg border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-gray-300">All Systems Operational</span>
              </div>
              <span className="text-green-500 font-semibold">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark rounded-lg border border-gold/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gold"></div>
                <span className="text-gray-300">Storage Usage</span>
              </div>
              <span className="text-gold font-semibold">45%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard

