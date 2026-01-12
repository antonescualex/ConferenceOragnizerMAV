import axios from "axios";
const API_URL = "http://localhost:3000";

export const getAuthors = async () => {
  const res = await axios.get(`${API_URL}/authors`);
  return res.data;
};

export const createAuthor = async (data) => {
  const res = await axios.post(`${API_URL}/authors`, data);
  return res.data;
};

export const updateAuthor = async (id, data) => {
  const res = await axios.put(`${API_URL}/authors/${id}`, data);
  return res.data;
};

export const deleteAuthor = async (id) => {
  await axios.delete(`${API_URL}/authors/${id}`);
};