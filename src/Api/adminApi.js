import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

//to check if admin is exists
export const checkIfAdminExists = async (number) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login/${number}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//admin register
export const addVendor = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/add`, userData, {
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

export const getAllVendors = async () => {
  // console.warn(token);
  const token = localStorage.getItem("auth_token");
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

//to update admin
export const adminUpdate = async (id, userData) => {
  console.log(id);
  console.log(userData);
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/${id}`,
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//to approve vendors
export const vendorApprove = async (id, token) => {
  // const token = localStorage.getItem("auth_token");
  console.warn(id, "", token);
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/approval/${id}`,
      null,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    console.warn(response);
    return response;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

//to reject vendors
export const vendorReject = async (id) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await axios.patch(`${BASE_URL}/admin/reject/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete vendors
export const vendorDelete = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/vendor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// to update vendors
export const vendorUpdate = async (id, userData) => {
  console.log(id);
  console.log(userData);
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/${id}`,
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//to get all products
export const getAllProducts = async (token) => {
  // console.warn(token);
  try {
    const response = await axios.get(`${BASE_URL}/admin/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to  add products
export const addProducts = async (token, newProduct) => {
  console.warn(token, "", newProduct);
  try {
    const response = await axios.post(`${BASE_URL}/admin/product`, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//to delete products
export const deleteProducts = async (token, id) => {
  // console.warn(token);
  try {
    const response = await axios.delete(
      `${BASE_URL}/admin/product/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//to update products
export const editProducts = async (token, id, editProduct) => {
  // console.warn(token);
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/product/update/${id}`,
      editProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
