import axios from 'axios';

// 1. Open API (TheMealDB) - For Searching & Filtering
const OPEN_API_BASE = "https://www.themealdb.com/api/json/v1/1";

// 2. Your Backend (MockAPI) - For CRUD
// REPLACE THIS with your actual MockAPI URL from Step 2
const BACKEND_API = "https://690f1c6e45e65ab24ac28d43.mockapi.io/recipes";

export const api = {
    // Open API Functions
    searchRecipes: (query) => axios.get(`${OPEN_API_BASE}/search.php?s=${query}`),
    filterByCategory: (cat) => axios.get(`${OPEN_API_BASE}/filter.php?c=${cat}`),

    // CRUD Functions (MockAPI)
    getFavorites: () => axios.get(BACKEND_API),
    addFavorite: (recipeData) => axios.post(BACKEND_API, recipeData),
    deleteFavorite: (id) => axios.delete(`${BACKEND_API}/${id}`),
    updateFavorite: (id, data) => axios.put(`${BACKEND_API}/${id}`, data),
    getOneFavorite: (id) => axios.get(`${BACKEND_API}/${id}`),
};