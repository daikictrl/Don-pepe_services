import { carsData as initialCarsData } from '../data/cars'

const STORAGE_KEYS = {
  CARS: 'donpepe_cars',
  PROPERTIES: 'donpepe_properties',
  CONCIERGE: 'donpepe_concierge',
  SETTINGS: 'donpepe_settings'
}

const initialProperties = [
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
]

const initialConcierge = [
  {
    id: 1,
    icon: 'plane',
    titleKey: 'travel_arrangements',
    descriptionKey: 'travel_desc',
    title: 'Travel Arrangements',
    description: 'Private jet charters, luxury yacht rentals, VIP airport transfers, and bespoke travel itineraries tailored to your preferences.'
  },
  {
    id: 2,
    icon: 'utensils',
    titleKey: 'dining_experiences',
    descriptionKey: 'dining_desc',
    title: 'Dining Experiences',
    description: 'Reservations at exclusive restaurants, private chef services, culinary tours, and access to Michelin-starred dining establishments.'
  },
  {
    id: 3,
    icon: 'ticket-alt',
    titleKey: 'event_access',
    descriptionKey: 'event_desc',
    title: 'Event Access',
    description: 'VIP tickets to sold-out events, exclusive private parties, cultural experiences, and access to the most prestigious gatherings.'
  },
  {
    id: 4,
    icon: 'shopping-bag',
    titleKey: 'personal_shopping',
    descriptionKey: 'shopping_desc',
    title: 'Personal Shopping',
    description: 'Exclusive shopping experiences, access to limited collections, personal styling services, and private shopping appointments.'
  },
  {
    id: 5,
    icon: 'spa',
    titleKey: 'wellness_services',
    descriptionKey: 'wellness_desc',
    title: 'Wellness Services',
    description: 'Private spa treatments, personal wellness consultations, fitness trainers, and holistic health experiences.'
  },
  {
    id: 6,
    icon: 'glass-cheers',
    titleKey: 'special_occasions',
    descriptionKey: 'occasions_desc',
    title: 'Special Occasions',
    description: 'Bespoke event planning for celebrations, weddings, anniversaries, and special moments with meticulous attention to detail.'
  }
]

const initialSettings = {
  siteName: 'Don Pépé Services',
  defaultLanguage: 'en',
  primaryColor: '#d4af37',
  secondaryColor: '#6b46c1',
  whatsapp: '+971 58 592 6244',
  email: 'donpepeservices@proton.me',
  address: 'Dubai, UAE'
}

export const DataManager = {
  getCars() {
    const stored = localStorage.getItem(STORAGE_KEYS.CARS)
    return stored ? JSON.parse(stored) : initialCarsData
  },

  saveCars(cars) {
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars))
  },

  getProperties() {
    const stored = localStorage.getItem(STORAGE_KEYS.PROPERTIES)
    return stored ? JSON.parse(stored) : initialProperties
  },

  saveProperties(properties) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties))
  },

  getConcierge() {
    const stored = localStorage.getItem(STORAGE_KEYS.CONCIERGE)
    return stored ? JSON.parse(stored) : initialConcierge
  },

  saveConcierge(services) {
    localStorage.setItem(STORAGE_KEYS.CONCIERGE, JSON.stringify(services))
  },

  getSettings() {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return stored ? JSON.parse(stored) : initialSettings
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  }
}
