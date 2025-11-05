import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Concierge from './pages/Concierge'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCars from './pages/admin/AdminCars'
import AdminProperties from './pages/admin/AdminProperties'
import AdminConcierge from './pages/admin/AdminConcierge'
import AdminMessages from './pages/admin/AdminMessages'
import AdminUsers from './pages/admin/AdminUsers'
import AdminSettings from './pages/admin/AdminSettings'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'

function PublicApp() {
  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark' : 'bg-dark-light'} transition-colors duration-300`}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicApp />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="concierge" element={<AdminConcierge />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

