import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const checkIfUserExists = async (number) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
