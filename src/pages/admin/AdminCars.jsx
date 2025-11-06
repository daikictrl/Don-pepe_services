import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DataManager } from '../../utils/dataManager'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminCars() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    setCars(DataManager.getCars())
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    folder: '',
    year: '',
    transmission: '',
    color: '',
    description: ''
  })

  const handleAdd = () => {
    setEditingCar(null)
    setFormData({
      name: '',
      folder: '',
      year: '',
      transmission: '',
      color: '',
      description: ''
    })
    setUploadedImages([])
    setIsModalOpen(true)
  }

  const handleEdit = (car) => {
    setEditingCar(car)
    setFormData({
      name: car.name,
      folder: car.folder,
      year: car.specs.year,
      transmission: car.specs.transmission,
      color: car.specs.color,
      description: ''
    })
    setUploadedImages([])
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      const updatedCars = cars.filter(car => car.id !== id)
      setCars(updatedCars)
      DataManager.saveCars(updatedCars)
    }
  }

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    const base64Images = await Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })
    )
    setUploadedImages(base64Images)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let updatedCars
    if (editingCar) {
      updatedCars = cars.map(car => 
        car.id === editingCar.id 
          ? { 
              ...car, 
              name: formData.name, 
              folder: formData.folder,
              images: uploadedImages.length > 0 ? uploadedImages : car.images,
              specs: { 
                ...car.specs, 
                year: formData.year, 
                transmission: formData.transmission, 
                color: formData.color
              } 
            }
          : car
      )
    } else {
      const newCar = {
        id: Date.now(),
        name: formData.name,
        folder: formData.folder,
        images: uploadedImages.length > 0 ? uploadedImages : ['/images/logo.svg'],
        specs: {
          year: formData.year,
          transmission: formData.transmission,
          color: formData.color
        }
      }
      updatedCars = [...cars, newCar]
    }
    setCars(updatedCars)
    DataManager.saveCars(updatedCars)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif text-gold mb-2">Luxury Cars</h1>
          <p className="text-gray-400">Manage your vehicle inventory</p>
        </div>
        <ClickSpark>
          <Dock>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider"
            >
              <i className="fas fa-plus mr-2"></i>Add Car
            </button>
          </Dock>
        </ClickSpark>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="bg-dark-light border border-gold/20 rounded-xl overflow-hidden hover:border-gold transition-all glow-effect">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.images[0] || '/images/logo.svg'}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <ClickSpark>
                    <button
                      onClick={() => handleEdit(car)}
                      className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white"
                    >
                      <i className="fas fa-edit text-sm"></i>
                    </button>
                  </ClickSpark>
                  <ClickSpark>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white"
                    >
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  </ClickSpark>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-serif text-gold mb-2 line-clamp-2">{car.name}</h3>
                <div className="flex justify-between text-sm text-gray-400">
                  <span><i className="fas fa-calendar mr-1 text-gold"></i>{car.specs.year}</span>
                  <span><i className="fas fa-cog mr-1 text-gold"></i>{car.specs.transmission}</span>
                  <span className="text-gray-400 text-xs">
                    <i className="fas fa-images mr-1"></i>{car.images.length} images
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
              {editingCar ? 'Edit Car' : 'Add New Car'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gold mb-2">Car Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gold mb-2">Folder Name</label>
                  <input
                    type="text"
                    value={formData.folder}
                    onChange={(e) => setFormData({...formData, folder: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gold mb-2">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gold mb-2">Transmission</label>
                  <input
                    type="text"
                    value={formData.transmission}
                    onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gold mb-2">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gold mb-2">Images Upload (4-6 images)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-dark border border-gold/20 rounded-lg text-gray-100 focus:border-gold focus:outline-none"
                />
                {uploadedImages.length > 0 && (
                  <p className="text-gold text-sm mt-2">
                    <i className="fas fa-check-circle mr-2"></i>
                    {uploadedImages.length} image(s) uploaded
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <ClickSpark>
                  <Dock>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider"
                    >
                      {editingCar ? 'Update' : 'Add'} Car
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

export default AdminCars

