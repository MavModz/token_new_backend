// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_SERVER_URL;

// // console.log(BASE_URL);

// export const checkIfUserExists = async (number) => {
//   console.log(number);
//   return await axios.get(`${BASE_URL}/user/${number}`);
// };

// export const register = async (response) => {
//   console.log(response);
//   return await axios.post(`${BASE_URL}/user`, response, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

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

export const register = async (userData) => {
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
