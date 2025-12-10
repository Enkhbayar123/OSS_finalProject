import axios from 'axios';

// 1. Open API (TheMealDB)
const OPEN_API_BASE = "https://www.themealdb.com/api/json/v1/1";

// 2. Your Backend (MockAPI)
// We split this so we can have /recipes AND /users
const MOCK_API_BASE = "https://690f1c6e45e65ab24ac28d43.mockapi.io";

export const api = {
    // --- Recipe Functions ---
    searchRecipes: (query) => axios.get(`${OPEN_API_BASE}/search.php?s=${query}`),
    filterByCategory: (cat) => axios.get(`${OPEN_API_BASE}/filter.php?c=${cat}`),

    getFavorites: () => axios.get(`${MOCK_API_BASE}/recipes`),
    addFavorite: (recipeData) => axios.post(`${MOCK_API_BASE}/recipes`, recipeData),
    deleteFavorite: (id) => axios.delete(`${MOCK_API_BASE}/recipes/${id}`),
    updateFavorite: (id, data) => axios.put(`${MOCK_API_BASE}/recipes/${id}`, data),
    getOneFavorite: (id) => axios.get(`${MOCK_API_BASE}/recipes/${id}`),

    // --- User/Auth Functions ---
    // Get all users to check if one exists with the matching email/password
    getAllUsers: () => axios.get(`${MOCK_API_BASE}/users`),
    // Register a new user
    registerUser: (userData) => axios.post(`${MOCK_API_BASE}/users`, userData),
};