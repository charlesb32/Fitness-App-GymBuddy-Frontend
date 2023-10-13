import axios from "axios";

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
    console.log("HI");
    const response = await instance.post("/login", loginPayload);
    console.log("HERE");
    console.log(response);
    const { token } = response.data;
    console.log(token);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
