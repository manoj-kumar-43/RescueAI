const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('rescueai_token');
}

function setToken(token) {
  localStorage.setItem('rescueai_token', token);
}

function clearToken() {
  localStorage.removeItem('rescueai_token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authAPI = {
  register: (credentials) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getMe: () => request('/auth/me'),

  updateProfile: (profileData) =>
    request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
};

export const triageAPI = {
  analyze: (payload) =>
    request('/triage/analyze', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getHistory: () => request('/triage/history'),

  getById: (id) => request(`/triage/${id}`),
};

export const hospitalAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/hospitals${query ? `?${query}` : ''}`);
  },

  getById: (id) => request(`/hospitals/${id}`),
};

export const contactAPI = {
  getAll: () => request('/contacts'),

  add: (contact) =>
    request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    }),

  update: (id, contact) =>
    request(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contact),
    }),

  toggleStatus: (id) =>
    request(`/contacts/${id}/toggle-status`, {
      method: 'PATCH',
    }),

  delete: (id) =>
    request(`/contacts/${id}`, {
      method: 'DELETE',
    }),

  broadcast: (payload) =>
    request('/contacts/broadcast', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getAlertRules: () => request('/contacts/alert-rules'),

  updateAlertRules: (rules) =>
    request('/contacts/alert-rules', {
      method: 'PUT',
      body: JSON.stringify(rules),
    }),
};

export const profileAPI = {
  get: () => request('/profile'),

  update: (data) =>
    request('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  addAllergy: (allergy) =>
    request('/profile/allergies', {
      method: 'POST',
      body: JSON.stringify(allergy),
    }),

  removeAllergy: (index) =>
    request(`/profile/allergies/${index}`, {
      method: 'DELETE',
    }),

  addMedication: (med) =>
    request('/profile/medications', {
      method: 'POST',
      body: JSON.stringify(med),
    }),

  removeMedication: (index) =>
    request(`/profile/medications/${index}`, {
      method: 'DELETE',
    }),

  addCondition: (condition) =>
    request('/profile/conditions', {
      method: 'POST',
      body: JSON.stringify(condition),
    }),

  removeCondition: (index) =>
    request(`/profile/conditions/${index}`, {
      method: 'DELETE',
    }),

  addEvent: (event) =>
    request('/profile/events', {
      method: 'POST',
      body: JSON.stringify(event),
    }),
};

export const activityAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/activity${query ? `?${query}` : ''}`);
  },

  add: (activity) =>
    request('/activity', {
      method: 'POST',
      body: JSON.stringify(activity),
    }),
};

export { getToken, setToken, clearToken };
