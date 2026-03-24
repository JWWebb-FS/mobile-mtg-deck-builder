import axios from "axios";

const BASE_URL = "https://mtg-deck-builder-o20y.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Corrected API endpoints to use the new /api/decks routes
export const getDecks = () => api.get("/api/decks");
export const createDeck = (data) => api.post("/api/decks", data);
export const updateDeck = (id, data) => api.put(`/api/decks/${id}`, data);
export const deleteDeck = (id) => api.delete(`/api/decks/${id}`);

export default api;
