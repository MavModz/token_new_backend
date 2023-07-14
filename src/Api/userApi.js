import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

// to login user
export const checkIfUserExists = async (number) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/login/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// to register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to vendors list
export const vendorsList = async (token) => {
  // console.log(token);
  try {
    const response = await axios.get(`${BASE_URL}/user/vendor/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userUpdate = async (id, userData) => {
  console.log(id);
  console.log(userData);
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/profile/update`,
      userData
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
