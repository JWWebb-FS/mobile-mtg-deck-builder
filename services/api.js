import axios from "axios";

const BASE_URL = "https://mtg-deck-builder-o20y.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// These functions handle your mandatory CRUD operations
export const getDecks = () => api.get("/decks"); // GET
export const createDeck = (data) => api.post("/decks", data); // POST
export const updateDeck = (id, data) => api.put(`/decks/${id}`, data); // PUT
export const deleteDeck = (id) => api.delete(`/decks/${id}`); // DELETE

export default api;
