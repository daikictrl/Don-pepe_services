import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DataManager } from '../../utils/dataManager'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminConcierge() {
  const [services, setServices] = useState([])

  useEffect(() => {
    setServices(DataManager.getConcierge())
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: ''
  })

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      icon: '',
      title: '',
      description: ''
    })
    setIsModalOpen(true)
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      icon: service.icon,
      title: service.title,
      description: service.description
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(service => service.id !== id)
      setServices(updatedServices)
      DataManager.saveConcierge(updatedServices)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let updatedServices
    if (editingService) {
      updatedServices = services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      )
    } else {
      const newService = {
        id: Date.now(),
        ...formData
      }
      updatedServices = [...services, newService]
    }
    setServices(updatedServices)
    DataManager.saveConcierge(updatedServices)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif text-gold mb-2">Concierge Services</h1>
          <p className="text-gray-400">Manage concierge offerings</p>
        </div>
        <ClickSpark>
          <Dock>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider"
            >
              <i className="fas fa-plus mr-2"></i>Add Service
            </button>
          </Dock>
        </ClickSpark>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-dark-light border border-gold/20 rounded-xl p-8 hover:border-gold transition-all glow-effect h-full flex flex-col">
              <div className="text-6xl text-gold mb-6">
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <h3 className="text-2xl font-serif text-gold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed flex-grow">{service.description}</p>
              <div className="flex gap-2 mt-6">
                <ClickSpark>
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white"
                  >
                    <i className="fas fa-edit mr-2"></i>Edit
                  </button>
                </ClickSpark>
                <ClickSpark>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center text-white"
                  >
                    <i className="fas fa-trash mr-2"></i>Delete
                  </button>
                </ClickSpark>
              </div>
            </div>
          </motion.div>
        ))}
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
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gold mb-2">Icon Name (Font Awesome)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                  placeholder="e.g. plane, utensils, ticket-alt"
                  required
                />
              </div>
              <div>
                <label className="block text-gold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-4">
                <ClickSpark>
                  <Dock>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider"
                    >
                      {editingService ? 'Update' : 'Add'} Service
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

export default AdminConcierge
