import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { carsData } from '../data/cars'
import CarGalleryModal from '../components/CarGalleryModal'
import ClickSpark from '../components/animations/ClickSpark'
import Dock from '../components/animations/Dock'

function Services() {
  const { t } = useLanguage()
  const location = useLocation()
  const [selectedCar, setSelectedCar] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Scroll to anchor if hash is present
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  const handleOpenModal = (car) => {
    setSelectedCar(car)
    setIsModalOpen(true)
  }

  const properties = [
    {
      name: 'Palm Jumeirah Villa',
      price: '$5,500,000',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      beds: 5,
      baths: 6,
      sqft: '7,500',
      description: 'Exclusive beachfront villa with private pool and stunning sea views.'
    },
    {
      name: 'Downtown Penthouse',
      price: '$3,800,000',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      beds: 4,
      baths: 5,
      sqft: '5,200',
      description: 'Luxurious penthouse with panoramic views of Burj Khalifa and Downtown Dubai.'
    },
    {
      name: 'Emirates Hills Mansion',
      price: '$4,200,000',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      beds: 6,
      baths: 7,
      sqft: '10,000',
      description: 'Elegant mansion in the prestigious Emirates Hills with golf course views.'
    }
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Banner */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-purple-dark/20 to-dark"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
            opacity: 0.3
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-serif text-gold mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('nav_services')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('discover_collection')}
          </motion.p>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 relative overflow-hidden">
        {/* Blurred Radial Gradient Background */}
        <div className="absolute inset-0 bg-dark">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.15)_0%,transparent_50%)] blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(107,70,193,0.15)_0%,transparent_50%)] blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-gold mb-4">{t('properties_title')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('exclusive_villas')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <ClickSpark>
                  <Dock>
                    <div className="bg-dark-light border border-gold/20 rounded-xl overflow-hidden hover:border-gold transition-all glow-effect h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-2xl font-serif text-gold mb-3 flex-shrink-0">{property.name}</h3>
                        <p className="text-gray-400 mb-4 flex-grow">{property.description}</p>
                        <div className="flex justify-between mb-4 pb-4 border-b border-gold/10">
                          <div className="text-gold">
                            <i className="fas fa-bed mr-2"></i>
                            {property.beds} Beds
                          </div>
                          <div className="text-gold">
                            <i className="fas fa-bath mr-2"></i>
                            {property.baths} Baths
                          </div>
                          <div className="text-gold">
                            <i className="fas fa-ruler-combined mr-2"></i>
                            {property.sqft} sqft
                          </div>
                        </div>
                        <div className="flex gap-4 mt-auto flex-shrink-0">
                          <a
                            href={`https://wa.me/971585926244?text=Hello, I'm interested in the ${property.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center text-sm"
                          >
                            <i className="fab fa-whatsapp mr-2"></i>WhatsApp
                          </a>
                          <a
                            href={`mailto:donpepeservices@proton.me?subject=Inquiry about ${property.name}`}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center text-sm"
                          >
                            <i className="fas fa-envelope mr-2"></i>Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </Dock>
                </ClickSpark>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section id="vehicles" className="py-20 relative overflow-hidden">
        {/* Blurred Radial Gradient Background */}
        <div className="absolute inset-0 bg-dark-light">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.15)_0%,transparent_50%)] blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(107,70,193,0.15)_0%,transparent_50%)] blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-gold mb-4">{t('vehicles_title')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From limited edition supercars to custom luxury vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carsData.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group h-full"
              >
                <ClickSpark>
                  <Dock>
                    <div className="bg-dark border border-gold/20 rounded-xl overflow-hidden hover:border-gold transition-all cursor-pointer glow-effect h-full flex flex-col">
                      <div
                        className="relative h-56 overflow-hidden flex-shrink-0"
                        onClick={() => handleOpenModal(car)}
                      >
                        <img
                          src={car.images[0]}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = '/images/logo.svg'
                            console.error('Car image failed to load:', car.images[0])
                          }}
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-lg font-serif text-gold mb-3 line-clamp-2 flex-shrink-0">{car.name}</h3>
                        <div className="flex justify-between text-sm text-gray-400 mb-4 pb-3 border-b border-gold/10 flex-shrink-0">
                          <div>
                            <i className="fas fa-calendar mr-1 text-gold"></i>
                            {car.specs.year}
                          </div>
                          <div>
                            <i className="fas fa-cog mr-1 text-gold"></i>
                            {car.specs.transmission}
                          </div>
                          <div>
                            <i className="fas fa-palette mr-1 text-gold"></i>
                            {car.specs.color}
                          </div>
                        </div>
                        <button
                          onClick={() => handleOpenModal(car)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider text-sm mt-auto flex-shrink-0"
                        >
                          {t('btn_view_details')}
                        </button>
                      </div>
                    </div>
                  </Dock>
                </ClickSpark>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Gallery Modal */}
      <CarGalleryModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCar(null)
        }}
      />
    </div>
  )
}

export default Services

