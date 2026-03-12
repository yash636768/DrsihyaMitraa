import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const photoService = {
  uploadPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getPhotos: (query = '') => {
    return api.get(`/search?q=${query}`);
  },
  
  labelFace: (faceId, personName) => {
    return api.post('/label-face', { face_id: faceId, person_name: personName });
  },
  
  chat: (message) => {
    return api.post('/chat', { message });
  },
};

export default api;
