import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate('/admin/dashboard')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-purple-dark/20 to-dark flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-dark-light border border-gold/20 rounded-xl p-8 shadow-2xl glow-effect">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src="/images/logo.svg" alt="Don Pépé Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-serif text-gold mb-2">Don Pépé Admin</h1>
            <p className="text-gray-400">Secure Access Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-gold mb-2 font-semibold">
                <i className="fas fa-envelope mr-2"></i>Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none transition-colors"
                placeholder="admin@donpepe.com"
              />
            </div>

            <div>
              <label className="block text-gold mb-2 font-semibold">
                <i className="fas fa-lock mr-2"></i>Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <ClickSpark>
              <Dock>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark mr-2"></div>
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </Dock>
            </ClickSpark>
          </form>

          {/* Back to Website */}
          <div className="mt-6 pt-6 border-t border-gold/20 text-center">
            <a
              href="/"
              className="text-gray-400 hover:text-gold transition-colors text-sm"
            >
              <i className="fas fa-arrow-left mr-2"></i>Back to Website
            </a>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 bg-gold/10 border border-gold/20 rounded-lg">
            <p className="text-gray-400 text-xs text-center">
              Demo Credentials:<br/>
              <span className="text-gold font-mono">admin@donpepe.com</span> / <span className="text-gold font-mono">admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin

