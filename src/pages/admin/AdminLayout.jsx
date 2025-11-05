import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { useTheme } from '../../contexts/ThemeContext'

function AdminLayout() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-dark">
      <AdminSidebar />
      <main className="ml-64">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout




