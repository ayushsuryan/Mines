import axios from "axios";

const API_URL = "https://mines-backend-o81m.onrender.com";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/v1/user/signin`, credentials);
  return response.data;
};

export const register = async (userDetails) => {
  const response = await axios.post(`${API_URL}/v1/user/signup`, userDetails);
  return response.data;
};
