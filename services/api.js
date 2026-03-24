import axios from "axios";

const BASE_URL = "https://mtg-deck-builder-o20y.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Correct api endpoints for CRUD operations on decks
export const getDecks = () => api.get("/api/cards");
export const createDeck = (data) => api.post("/api/cards", data);
export const updateDeck = (id, data) => api.put(`/api/cards/${id}`, data);
export const deleteDeck = (id) => api.delete(`/api/cards/${id}`);

export default api;
