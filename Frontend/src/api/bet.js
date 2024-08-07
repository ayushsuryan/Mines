import axios from "axios";

const API_URL = "https://mines-backend-o81m.onrender.com";

export const startBet = async (mines) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Authorization": `${token}`,
  };

  try {
    const response = await axios.put(
      `${API_URL}/v1/bet/mines/start?mines=${mines}`,
      null,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error starting bet:", error);
    throw error;
  }
};

export const openMine = async (mineId) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Authorization": `${token}`,
  };

  try {
    const response = await axios.post(
      `${API_URL}/v1/bet/mines/open`,
      { mineId },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error starting bet:", error);
    throw error;
  }
};
