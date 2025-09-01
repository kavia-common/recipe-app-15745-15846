import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simple error normalization
const normalizeError = (error) => {
  if (error.response) {
    return { status: error.response.status, data: error.response.data, message: error.response.data?.message || error.message };
  }
  return { status: 0, data: null, message: error.message || 'Network error' };
};

// PUBLIC_INTERFACE
export const AuthAPI = {
  /** Login via email/password */
  async login(payload) {
    try {
      const { data } = await api.post('/auth/login', payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Register new user */
  async register(payload) {
    try {
      const { data } = await api.post('/auth/register', payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Get current user profile */
  async me() {
    try {
      const { data } = await api.get('/auth/me');
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Update profile fields */
  async updateProfile(payload) {
    try {
      const { data } = await api.put('/users/me', payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Update privacy settings */
  async updatePrivacy(payload) {
    try {
      const { data } = await api.put('/users/me/privacy', payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Social login start (redirect helper) */
  buildSocialLoginUrl(provider, redirectUri) {
    const r = encodeURIComponent(redirectUri || window.location.origin);
    return `${API_BASE_URL}/auth/oauth/${provider}?redirect_uri=${r}`;
  },
};

// PUBLIC_INTERFACE
export const RecipesAPI = {
  /** Search/browse recipes with filters */
  async search(params) {
    try {
      const { data } = await api.get('/recipes', { params });
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Get a single recipe by id */
  async get(id) {
    try {
      const { data } = await api.get(`/recipes/${id}`);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Create a recipe */
  async create(payload) {
    try {
      const { data } = await api.post('/recipes', payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Update a recipe */
  async update(id, payload) {
    try {
      const { data } = await api.put(`/recipes/${id}`, payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Delete a recipe */
  async remove(id) {
    try {
      const { data } = await api.delete(`/recipes/${id}`);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Rate and comment */
  async rate(id, score) {
    try {
      const { data } = await api.post(`/recipes/${id}/ratings`, { score });
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  async comment(id, text) {
    try {
      const { data } = await api.post(`/recipes/${id}/comments`, { text });
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Collections */
  async collections() {
    try {
      const { data } = await api.get('/collections');
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  async addToCollection(collectionId, recipeId) {
    try {
      const { data } = await api.post(`/collections/${collectionId}/items`, { recipeId });
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
};

// PUBLIC_INTERFACE
export const MealAPI = {
  /** Meal planning */
  async getPlan(params) {
    try {
      const { data } = await api.get('/meal-plan', { params });
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  async savePlan(payload) {
    try {
      const { data } = await api.post('/meal-plan', payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Shopping list */
  async getShoppingList(params) {
    try {
      const { data } = await api.get('/shopping-list', { params });
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  async generateShoppingList(payload) {
    try {
      const { data } = await api.post('/shopping-list/generate', payload);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
};

// PUBLIC_INTERFACE
export const SocialAPI = {
  /** Follow user */
  async follow(userId) {
    try {
      const { data } = await api.post(`/users/${userId}/follow`);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  async unfollow(userId) {
    try {
      const { data } = await api.delete(`/users/${userId}/follow`);
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
  /** Feed/community */
  async feed(params) {
    try {
      const { data } = await api.get('/feed', { params });
      return data;
    } catch (e) {
      throw normalizeError(e);
    }
  },
};

export default api;
