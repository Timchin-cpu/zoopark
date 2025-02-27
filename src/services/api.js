// src/services/api.js
import axios from "../axios-controller";

export const userService = {
  getUser: (id) => axios.get(`/user/${id}`),
  updateSettings: (userId, settings) =>
    axios.put("/user/settings", { userId, settings }),
};
export const userInitService = {
  // Инициализация пользователя
  initUser: (telegram_id, username) =>
    axios.post("/user/init", {
      telegram_id,
      username,
      level: 1,
      experience: 0,
      coins: 0,
      vibration: true,
      darkTheme: false,
      language: "ru",
    }),

  // Получение данных пользователя по telegram_id
  getUser: (telegram_id) => axios.get(`/user/${telegram_id}`),
  getHourlyIncome: (telegram_id) =>
    axios.get(`/api/hourly-income/${telegram_id}`),
};
export const cardsService = {
  getAllCards: () => axios.get("/cards"),
  getCardsByType: (type) => axios.get(`/cards/${type}`),
};
export const cardSetsService = {
  addCardToSet: (setId, cardId) =>
    axios.post(`/card-sets/${setId}/cards`, { cardId }),
  getSetCards: (setId) => axios.get(`/card-sets/${setId}/cards`),
  removeCardFromSet: (setId, cardId) =>
    axios.delete(`/card-sets/${setId}/cards/${cardId}`),
};
export const tasksService = {
  getAllTasks: () => axios.get("/tasks"),
};
export const userCardsService = {
  // Получение карточек пользователя
  getUserCards: (userId) => axios.get(`/user/${userId}/cards`),

  // Добавление карточки пользователю
  addCardToUser: (userId, cardId) =>
    axios.post(`/user/${userId}/cards`, { cardId }),
};

export const peopleService = {
  // Получение списка фотографий для полиции
  async getPolicePhotos() {
    try {
      const response = await axios.get(`/police/photos`);
      return response.data;
    } catch (error) {
      console.error("Error fetching police photos:", error);
      throw error;
    }
  },

  // Получение списка фотографий для пожарных
  async getFirefighterPhotos() {
    try {
      const response = await axios.get(`/firefighter/photos`);
      return response.data;
    } catch (error) {
      console.error("Error fetching firefighter photos:", error);
      throw error;
    }
  },
};
