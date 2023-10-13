import axios from "axios";
import { setAuthToken } from "./setAuthToken";

const baseURL = "http://localhost:4000/";
const instance = axios.create({ baseURL });

export const addWorkoutToUser = async (userData) => {
  try {
    // Make a PUT request to your server's route for assigning a workout
    const response = await instance.put("/addWorkoutToUser", { userData });
    return response.data;
  } catch (error) {
    console.log("ERROR");
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    // Make a PUT request to your server's route for assigning a workout
    const response = await instance.post("/addUser", { userData });
    return response.data;
  } catch (error) {
    console.log("ERROR");
    throw error;
  }
};

export const login = async (loginPayload) => {
  try {
    const response = await instance.post("/login", loginPayload);
    console.log(response.data);
    const { token } = response.data;
    localStorage.setItem("token", token);
    //set token to axios common header
    setAuthToken(token);
    const user = await getUser(token);
    console.log(user);
    console.log(token);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (token) => {
  const headers = {
    "x-access-token": token,
  };
  try {
    const user = await instance.get("/getUser", { headers });
    return user;
  } catch (err) {
    throw err;
  }
};
