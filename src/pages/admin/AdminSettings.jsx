import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { DataManager } from '../../utils/dataManager'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminSettings() {
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    siteName: 'Don Pépé Services',
    defaultLanguage: 'en',
    primaryColor: '#d4af37',
    secondaryColor: '#6b46c1',
    whatsapp: '+971 58 592 6244',
    email: 'donpepeservices@proton.me',
    address: 'Dubai, UAE'
  })

  useEffect(() => {
    setSettings(DataManager.getSettings())
  }, [])

  const handleSave = () => {
    DataManager.saveSettings(settings)
    alert('Settings saved successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-gold mb-2">Settings</h1>
        <p className="text-gray-400">Manage global site configuration</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-light border border-gold/20 rounded-xl p-6"
        >
          <h2 className="text-2xl font-serif text-gold mb-4">
            <i className="fas fa-cog mr-2"></i>General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gold mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gold mb-2">Default Language</label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => setSettings({...settings, defaultLanguage: e.target.value})}
                className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div>
              <label className="block text-gold mb-2">Logo Upload</label>
              <input
                type="file"
                className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-light border border-gold/20 rounded-xl p-6"
        >
          <h2 className="text-2xl font-serif text-gold mb-4">
            <i className="fas fa-palette mr-2"></i>Theme Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gold mb-2">Current Theme</label>
              <button
                onClick={toggleTheme}
                className="px-6 py-3 bg-dark border border-gold/20 rounded-lg hover:border-gold transition-all text-gray-300"
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} mr-2`}></i>
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
            <div>
              <label className="block text-gold mb-2">Primary Color (Gold)</label>
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                className="w-full h-12 bg-dark border border-gold/20 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-gold mb-2">Secondary Color (Purple)</label>
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                className="w-full h-12 bg-dark border border-gold/20 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-light border border-gold/20 rounded-xl p-6"
        >
          <h2 className="text-2xl font-serif text-gold mb-4">
            <i className="fas fa-address-book mr-2"></i>Contact Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gold mb-2">WhatsApp</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gold mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gold mb-2">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ClickSpark>
            <Dock>
              <button
                onClick={handleSave}
                className="w-full px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider text-lg glow-effect"
              >
                <i className="fas fa-save mr-2"></i>Save Settings
              </button>
            </Dock>
          </ClickSpark>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminSettings

