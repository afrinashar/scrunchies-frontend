import axios from "axios";
export const API_BASE_URL= "http://localhost:3001";

 
const api = axios.create({
  baseURL: API_BASE_URL,
});
 
export const getPhotos = async () => {
  const response = await api.get('/photos');
  return response.data;
};
export const getPhotoById = async (photoId) => {
    const response = await api.get(`/photos/${photoId}`);
    return response.data;
  };
export const createPhoto = async (photoData) => {
  const response = await api.post('/photos', photoData);
  return response.data;
};

export const updatePhoto = async (photoId, photoData) => {
  const response = await api.put(`/photos/${photoId}`, photoData);
  return response.data;
};

export const deleteItem = async (photoId) => {
  const response = await api.delete(`/items/${photoId}`);
  return response.data;
};
