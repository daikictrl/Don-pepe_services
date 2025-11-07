const API_BASE_URL = '/api';

const handleResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }
  
  return data;
};

export const apiClient = {
  cars: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/cars`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      return handleResponse(response);
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/cars/${id}`);
      return handleResponse(response);
    },
    
    create: async (car) => {
      const response = await fetch(`${API_BASE_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
      return handleResponse(response);
    },
    
    update: async (id, car) => {
      const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
      return handleResponse(response);
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },

  properties: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      return handleResponse(response);
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      return handleResponse(response);
    },
    
    create: async (property) => {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
      return handleResponse(response);
    },
    
    update: async (id, property) => {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
      return handleResponse(response);
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },

  concierge: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/concierge`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      return handleResponse(response);
    },
    
    create: async (service) => {
      const response = await fetch(`${API_BASE_URL}/concierge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      return handleResponse(response);
    },
    
    update: async (id, service) => {
      const response = await fetch(`${API_BASE_URL}/concierge/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      return handleResponse(response);
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/concierge/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },

  settings: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      return handleResponse(response);
    },
    
    get: async (key) => {
      const response = await fetch(`${API_BASE_URL}/settings/${key}`);
      return handleResponse(response);
    },
    
    save: async (key, value) => {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });
      return handleResponse(response);
    },
    
    delete: async (key) => {
      const response = await fetch(`${API_BASE_URL}/settings/${key}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    },
  },

  upload: {
    image: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    },
    
    deleteImage: async (path) => {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });
      return handleResponse(response);
    },
  },
};
