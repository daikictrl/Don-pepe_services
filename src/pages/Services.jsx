import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { DataManager } from '../utils/dataManager'
import CarGalleryModal from '../components/CarGalleryModal'
import ClickSpark from '../components/animations/ClickSpark'
import Dock from '../components/animations/Dock'

function Services() {
  const { t } = useLanguage()
  const location = useLocation()
  const [selectedCar, setSelectedCar] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cars, setCars] = useState([])
  const [properties, setProperties] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  useEffect(() => {
    setCars(DataManager.getCars())
    setProperties(DataManager.getProperties())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredCars = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return cars
    }

    const query = debouncedSearchQuery.toLowerCase()
    return cars.filter(car => {
      const searchableFields = [
        car.name,
        car.specs?.year,
        car.specs?.engine,
        car.specs?.color,
        car.specs?.transmission,
        car.folder
      ].filter(Boolean)

      return searchableFields.some(field =>
        field.toString().toLowerCase().includes(query)
      )
    })
  }, [cars, debouncedSearchQuery])

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
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-gold mb-4 sm:mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('nav_services')}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
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
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold mb-4">{t('properties_title')}</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
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
                      <div className="relative h-56 overflow-hidden flex-shrink-0 bg-dark/50">
                        <img
                          src={property.image}
                          alt={property.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          style={{ contentVisibility: 'auto' }}
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-2xl font-serif text-gold mb-3 flex-shrink-0">{property.name}</h3>
                        <p className="text-gray-400 mb-4 flex-grow">{property.description}</p>
                        <div className="flex justify-between mb-4 pb-4 border-b border-gold/10">
                          <div className="text-gold">
                            <i className="fas fa-bed mr-2"></i>
                            {property.beds} {t('services_beds')}
                          </div>
                          <div className="text-gold">
                            <i className="fas fa-bath mr-2"></i>
                            {property.baths} {t('services_baths')}
                          </div>
                          <div className="text-gold">
                            <i className="fas fa-ruler-combined mr-2"></i>
                            {property.sqft} {t('services_sqft')}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-auto flex-shrink-0 items-stretch">
                          <a
                            href={`https://wa.me/971585926244?text=Hello, I'm interested in the ${property.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('contact_whatsapp')}
                            className="flex-1 min-w-0 inline-flex items-center gap-3 justify-center px-5 py-3 text-sm bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-md shadow-sm hover:shadow-md transform transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400"
                          >
                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <i className="fab fa-whatsapp text-lg"></i>
                            </span>
                            <span className="hidden sm:inline">{t('contact_whatsapp')}</span>
                            <span className="inline sm:hidden">Contact via...</span>
                          </a>

                          <a
                            href={`mailto:donpepeservices@proton.me?subject=Inquiry about ${property.name}`}
                            aria-label={t('contact_email')}
                            className="flex-1 min-w-0 inline-flex items-center gap-3 justify-center px-5 py-3 text-sm bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-md shadow-sm hover:shadow-md transform transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400"
                          >
                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                              <i className="fas fa-envelope text-lg"></i>
                            </span>
                            <span className="hidden sm:inline">{t('contact_email')}</span>
                            <span className="inline sm:hidden">Contact via...</span>
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
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold mb-4">{t('vehicles_title')}</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              {t('services_vehicles_desc')}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto mb-12 px-4 sm:px-0"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold via-purple to-gold rounded-lg blur opacity-30 group-focus-within:opacity-60 transition duration-200"></div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('services_search_placeholder')}
                  aria-label="Search Cars"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-14 bg-dark border-2 border-gold/30 rounded-lg text-gray-200 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 focus:scale-[1.02]"
                />
                <div className="absolute right-4 sm:right-5 text-gold text-lg sm:text-xl pointer-events-none">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs sm:text-sm text-gray-400 mt-3 text-center"
              >
                {filteredCars.length === 0
                  ? t('services_search_no_results')
                  : `${t('services_search_found').replace('{count}', filteredCars.length).replace('{plural}', filteredCars.length === 1 ? t('services_search_found_car') : t('services_search_found_cars'))}`}
              </motion.p>
            )}
          </motion.div>

          {/* Car Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map((car, index) => (
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
                        className="relative h-56 overflow-hidden flex-shrink-0 bg-dark/50"
                        onClick={() => handleOpenModal(car)}
                      >
                        <img
                          src={car.images[0]}
                          alt={car.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          style={{ contentVisibility: 'auto' }}
                          onError={(e) => {
                            e.target.src = '/images/logo.svg'
                            console.error('Car image failed to load:', car.images[0])
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 px-4"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl text-gold/30 mb-6">
                <i className="fas fa-car"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-gold mb-3">{t('services_no_results_title')}</h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto mb-6 px-4">
                {t('services_no_results_desc')}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark font-semibold rounded-lg hover:shadow-lg transition-all uppercase tracking-wider text-sm sm:text-base"
              >
                {t('services_clear_search')}
              </button>
            </motion.div>
          )}
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

