import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import ClickSpark from './animations/ClickSpark'

function CarGalleryModal({ car, isOpen, onClose }) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCurrentIndex(0)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, car])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % car.images.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  if (!car) return null

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the ${car.name}. Please provide more information.`
  )
  const emailSubject = encodeURIComponent(`Inquiry about ${car.name}`)
  const emailBody = encodeURIComponent(
    `Hello,\n\nI'm interested in learning more about the ${car.name}.\n\nThank you.`
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark border border-gold/20 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/20 flex items-center justify-center text-gold text-xl transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Gallery */}
            <div className="relative">
              <div className="relative h-96 md:h-[500px] bg-dark-light">
                <motion.img
                  key={currentIndex}
                  src={car.images[currentIndex]}
                  alt={car.name}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.target.src = '/images/logo.svg'
                    console.error('Image failed to load:', car.images[currentIndex])
                  }}
                />

                {/* Navigation Buttons */}
                {car.images.length > 1 && (
                  <>
                    <ClickSpark>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePrevious()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-gold/20 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-gold text-xl transition-colors"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                    </ClickSpark>
                    <ClickSpark>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNext()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-gold/20 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-gold text-xl transition-colors"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </ClickSpark>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {car.images.length > 1 && (
                <div className="grid grid-cols-6 gap-2 p-4 bg-dark-light">
                  {car.images.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                        index === currentIndex
                          ? 'border-gold scale-105'
                          : 'border-gold/20 hover:border-gold/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={img}
                        alt={`${car.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.target.src = '/images/logo.svg'
                        }}
                      />
                      {index === currentIndex && (
                        <motion.div
                          className="absolute inset-0 bg-gold/20"
                          layoutId="activeThumb"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Info */}
            <div className="p-6 border-t border-gold/20">
              <h2 className="text-3xl font-serif text-gold mb-6">{car.name}</h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 bg-dark-light rounded-lg border border-gold/10"
                  >
                    <div className="text-sm text-gray-400 mb-2 capitalize">{key}</div>
                    <div className="text-gold font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-4 flex-wrap">
                <ClickSpark>
                  <a
                    href={`https://wa.me/971585926244?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center uppercase tracking-wider"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    {t('contact_whatsapp')}
                  </a>
                </ClickSpark>
                <ClickSpark>
                  <a
                    href={`mailto:donpepeservices@proton.me?subject=${emailSubject}&body=${emailBody}`}
                    className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-center uppercase tracking-wider"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    {t('contact_email')}
                  </a>
                </ClickSpark>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CarGalleryModal

