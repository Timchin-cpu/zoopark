// src/services/api.js
import axios from '../axios-controller';

export const userService = {
  getUser: (id) => axios.get(`/user/${id}`),
  updateSettings: (userId, settings) => axios.put('/user/settings', { userId, settings })
};

export const cardsService = {
  getAllCards: () => axios.get('/cards'),
  getCardsByType: (type) => axios.get(`/cards/${type}`)
};

export const tasksService = {
  getAllTasks: () => axios.get('/tasks')
};
export const peopleService = {
    // Получение списка фотографий для полиции
    async getPolicePhotos() {
      try {
        const response = await axios.get(`/police/photos`);
        return response.data;
      } catch (error) {
        console.error('Error fetching police photos:', error);
        throw error;
      }
    },
  
    // Получение списка фотографий для пожарных  
    async getFirefighterPhotos() {
      try {
        const response = await axios.get(`/firefighter/photos`);
        return response.data;
      } catch (error) {
        console.error('Error fetching firefighter photos:', error);
        throw error;
      }
    }
  };