import React, { useState } from 'react'
import { motion } from 'framer-motion'

function ClickSpark({ children, className = '' }) {
  const [spark, setSpark] = useState({ x: 0, y: 0, visible: false })

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setSpark({ x, y, visible: true })
    setTimeout(() => setSpark({ x, y, visible: false }), 600)
  }

  return (
    <div className={`relative ${className}`} onClick={handleClick}>
      {children}
      {spark.visible && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: spark.x,
            top: spark.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gold to-purple blur-xl"></div>
        </motion.div>
      )}
    </div>
  )
}

export default ClickSpark

