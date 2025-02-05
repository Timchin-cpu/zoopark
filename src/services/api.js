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