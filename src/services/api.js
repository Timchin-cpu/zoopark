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
  getHourlyIncome: (telegram_id) => axios.get(`/hourly-income/${telegram_id}`),
  getEnergy: (telegram_id) => axios.get(`/user/${telegram_id}/energy`),
  updateEnergy: async (telegram_id, energy) => {
    try {
      const response = await axios.put(`/user/${telegram_id}/energy`, {
        energy,
        lastUpdate: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error updating energy:", error);
      throw error;
    }
  },
  getUserLevel: (telegram_id) => axios.get(`/user/${telegram_id}/level`),
  updateUserPhoto: (telegram_id, photo_url) =>
    axios.put(`/user/${telegram_id}/photo`, { photo_url }),
  updateExperience: (telegram_id, experience) =>
    axios.put(`/user/${telegram_id}/experience`, { experience }),
  getReferralCode: (telegram_id) =>
    axios.get(`/user/${telegram_id}/referral-code`),
  getReferrals: (telegram_id) => axios.get(`/user/${telegram_id}/referrals`),
};
export const cardsService = {
  getAllCards: () => axios.get("/cards"),
  getCardsByType: (type) => axios.get(`/cards/${type}`),
  getCard: (id) => axios.get(`/cards/${id}`),
};
export const cardBackService = {
  getAllCardBacks: () => axios.get("/card-backs"),
  updateUserCardBack: (userId, cardBackId) =>
    axios.put(`/user/${userId}/card-back`, { cardBackId }),
  addCardBack: (formData) => axios.post("/card-backs/add", formData),
  deleteCardBack: (id) => axios.delete(`/card-backs/${id}`),
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
