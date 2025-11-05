import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminProperties() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Palm Jumeirah Villa',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      beds: 5,
      baths: 6,
      sqft: '7,500',
      description: 'Exclusive beachfront villa with private pool and stunning sea views.'
    },
    {
      id: 2,
      name: 'Downtown Penthouse',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      beds: 4,
      baths: 5,
      sqft: '5,200',
      description: 'Luxurious penthouse with panoramic views of Burj Khalifa and Downtown Dubai.'
    },
    {
      id: 3,
      name: 'Emirates Hills Mansion',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      beds: 6,
      baths: 7,
      sqft: '10,000',
      description: 'Elegant mansion in the prestigious Emirates Hills with golf course views.'
    }
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    beds: '',
    baths: '',
    sqft: '',
    description: ''
  })

  const handleAdd = () => {
    setEditingProperty(null)
    setFormData({
      name: '',
      beds: '',
      baths: '',
      sqft: '',
      description: ''
    })
    setIsModalOpen(true)
  }

  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormData({
      name: property.name,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      description: property.description
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(property => property.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProperty) {
      setProperties(properties.map(property => 
        property.id === editingProperty.id 
          ? { ...property, ...formData }
          : property
      ))
    } else {
      const newProperty = {
        id: properties.length + 1,
        ...formData,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      }
      setProperties([...properties, newProperty])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif text-gold mb-2">Luxury Properties</h1>
          <p className="text-gray-400">Manage your property listings</p>
        </div>
        <ClickSpark>
          <Dock>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider"
            >
              <i className="fas fa-plus mr-2"></i>Add Property
            </button>
          </Dock>
        </ClickSpark>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-dark-light border border-gold/20 rounded-xl overflow-hidden hover:border-gold transition-all glow-effect">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <ClickSpark>
                    <button
                      onClick={() => handleEdit(property)}
                      className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white"
                    >
                      <i className="fas fa-edit text-sm"></i>
                    </button>
                  </ClickSpark>
                  <ClickSpark>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
                    >
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  </ClickSpark>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif text-gold mb-3">{property.name}</h3>
                <p className="text-gray-400 mb-4">{property.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gold">
                    <i className="fas fa-bed mr-2"></i>{property.beds} Beds
                  </span>
                  <span className="text-gold">
                    <i className="fas fa-bath mr-2"></i>{property.baths} Baths
                  </span>
                  <span className="text-gold">
                    <i className="fas fa-ruler-combined mr-2"></i>{property.sqft} sqft
                  </span>
                </div>
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
              {editingProperty ? 'Edit Property' : 'Add New Property'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gold mb-2">Property Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gold mb-2">Beds</label>
                  <input
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData({...formData, beds: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gold mb-2">Baths</label>
                  <input
                    type="number"
                    value={formData.baths}
                    onChange={(e) => setFormData({...formData, baths: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gold mb-2">Sqft</label>
                  <input
                    type="text"
                    value={formData.sqft}
                    onChange={(e) => setFormData({...formData, sqft: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
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
                      {editingProperty ? 'Update' : 'Add'} Property
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

export default AdminProperties
