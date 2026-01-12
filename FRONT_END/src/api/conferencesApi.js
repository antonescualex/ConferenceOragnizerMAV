import axios from "axios";
const API_URL = "http://localhost:3000";

export const getConferences = async () => {
  const res = await axios.get(`${API_URL}/conferences`);
  return res.data;
};

export const createConference = async (data) => {
  const res = await axios.post(`${API_URL}/conferences`, data);
  return res.data;
};

export const updateConference = async (id, data) => {
  const res = await axios.put(`${API_URL}/conferences/${id}`, data);
  return res.data;
};

export const deleteConference = async (id) => {
  await axios.delete(`${API_URL}/conferences/${id}`);
};