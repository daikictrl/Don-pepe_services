import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ClickSpark from '../../components/animations/ClickSpark'
import Dock from '../../components/animations/Dock'

function AdminMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+971 50 123 4567',
      subject: 'Inquiry about Bentley',
      message: 'I am interested in the Bentley Continental GT. Please provide more information.',
      date: '2024-12-01',
      status: 'new'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+971 55 123 4567',
      subject: 'Property Viewing',
      message: 'I would like to schedule a viewing for the Palm Jumeirah Villa.',
      date: '2024-12-02',
      status: 'read'
    }
  ])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== id))
    }
  }

  const handleReply = (message) => {
    window.open(`mailto:${message.email}?subject=Re: ${message.subject}`, '_blank')
  }

  const handleWhatsApp = (message) => {
    const phone = message.phone.replace(/\s+/g, '')
    const text = `Hello ${message.name}, regarding your inquiry about ${message.subject}`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-gold mb-2">Client Messages</h1>
        <p className="text-gray-400">Manage customer inquiries</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-dark-light border border-gold/20 rounded-xl p-12 text-center">
          <i className="fas fa-inbox text-gray-600 text-6xl mb-4"></i>
          <p className="text-gray-400 text-xl">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-dark-light border border-gold/20 rounded-xl p-6 hover:border-gold transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-gold mb-1">{message.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      <i className="fas fa-envelope mr-2"></i>{message.email}
                      {message.phone && (
                        <>
                          <br />
                          <i className="fas fa-phone mr-2"></i>{message.phone}
                        </>
                      )}
                    </p>
                    <p className="text-gray-500 text-xs">
                      <i className="fas fa-clock mr-1"></i>{message.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {message.phone && (
                      <ClickSpark>
                        <button
                          onClick={() => handleWhatsApp(message)}
                          className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center text-white"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </button>
                      </ClickSpark>
                    )}
                    <ClickSpark>
                      <button
                        onClick={() => handleReply(message)}
                        className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white"
                      >
                        <i className="fas fa-reply"></i>
                      </button>
                    </ClickSpark>
                    <ClickSpark>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center text-white"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </ClickSpark>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-gold font-semibold mb-2">
                    <i className="fas fa-tag mr-2"></i>Subject: {message.subject}
                  </p>
                  <p className="text-gray-300">
                    {message.message}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <ClickSpark>
                    <Dock>
                      <button
                        onClick={() => handleReply(message)}
                        className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        <i className="fas fa-envelope mr-2"></i>Reply via Email
                      </button>
                    </Dock>
                  </ClickSpark>
                  {message.phone && (
                    <ClickSpark>
                      <Dock>
                        <button
                          onClick={() => handleWhatsApp(message)}
                          className="flex-1 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                        >
                          <i className="fab fa-whatsapp mr-2"></i>Reply via WhatsApp
                        </button>
                      </Dock>
                    </ClickSpark>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminMessages

