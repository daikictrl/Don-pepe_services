import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@donpepe.com',
      role: 'admin',
      status: 'active',
      created: '2024-01-01'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleAdd = () => {
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      password: ''
    })
    setIsModalOpen(true)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const toggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, name: formData.name, email: formData.email }
          : user
      ))
    } else {
      const newUser = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        role: 'admin',
        status: 'active',
        created: new Date().toISOString().split('T')[0]
      }
      setUsers([...users, newUser])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif text-gold mb-2">User Management</h1>
          <p className="text-gray-400">Manage admin accounts</p>
        </div>
        <ClickSpark>
          <Dock>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider"
            >
              <i className="fas fa-user-plus mr-2"></i>Add Admin
            </button>
          </Dock>
        </ClickSpark>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-dark-light border border-gold/20 rounded-xl overflow-hidden">
          <thead className="bg-gold/10 border-b border-gold/20">
            <tr>
              <th className="px-6 py-4 text-left text-gold font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-gold font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-gold font-semibold">Role</th>
              <th className="px-6 py-4 text-left text-gold font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-gold font-semibold">Created</th>
              <th className="px-6 py-4 text-left text-gold font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gold/10 last:border-0 hover:bg-gold/5 transition-colors"
              >
                <td className="px-6 py-4 text-gray-300">{user.name}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">{user.created}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <ClickSpark>
                      <button
                        onClick={() => handleEdit(user)}
                        className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white"
                      >
                        <i className="fas fa-edit text-sm"></i>
                      </button>
                    </ClickSpark>
                    <ClickSpark>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center text-white"
                      >
                        <i className="fas fa-trash text-sm"></i>
                      </button>
                    </ClickSpark>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-light border border-gold/20 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-3xl font-serif text-gold mb-6">
              {editingUser ? 'Edit User' : 'Add New Admin'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                  required
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="block text-gold mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              )}
              <div className="flex gap-4">
                <ClickSpark>
                  <Dock>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider"
                    >
                      {editingUser ? 'Update' : 'Add'} User
                    </button>
                  </Dock>
                </ClickSpark>
                <ClickSpark>
                  <Dock>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 bg-dark border border-gold/20 text-gold font-semibold rounded-lg hover:border-gold transition-all"
                    >
                      Cancel
                    </button>
                  </Dock>
                </ClickSpark>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
