import axios from "axios";
const API_URL = "http://localhost:3000";

export const getArticles = async () => {
  const res = await axios.get(`${API_URL}/articles`);
  return res.data;
};

export const createArticle = async (articleData) => {
  const res = await axios.post(`${API_URL}/articles`, articleData);
  return res.data;
};

export const updateArticle = async (id, articleData) => {
  const res = await axios.put(`${API_URL}/articles/${id}`, articleData);
  return res.data;
};

export const deleteArticles = async (id) => {
  await axios.delete(`${API_URL}/articles/${id}`);
};