import axios from "axios";

const API_BASE_URL = "http://localhost:5131/api/user";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.sort((a, b) => a.userId - b.userId);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    await axios.post(API_BASE_URL, user);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, user);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
