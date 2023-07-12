import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const checkIfAdminExists = async (number) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerAdmin = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all vendors

export const getAllVendors = async (token) => {
  console.warn(token);
  try {
    const response = await axios.get(`${BASE_URL}/admin/vendor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
