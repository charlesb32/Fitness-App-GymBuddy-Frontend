import axios from "axios";
import { setAuthToken } from "./setAuthToken";

const baseURL = "http://localhost:4000/";
const instance = axios.create({ baseURL });

export const addPlanToUser = async (userData, currUserId) => {
  try {
    // Make a PUT request to your server's route for assigning a plan
    const response = await instance.put("/addPlanToUser", {
      userData,
      currUserId,
    });
    return response.data;
  } catch (error) {
    console.log("ERROR");
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await instance.post("/addUser", { userData });
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message);
    alert(error.response.data.message);
    return error;
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
    // const user = await getUser(token);
    // console.log(user.data);
    // console.log(token);
    return response.data;
    // return { token, user: user.data };
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);

    // throw error;

    return error;
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

export const getPlans = async (currUserId) => {
  try {
    const plans = await instance.get(`/getPlans/${currUserId}`);
    return plans;
  } catch (err) {
    throw err;
  }
};

export const setActivePlanIndex = async (currUserId, index) => {
  try {
    const ind = await instance.put(`/setActivePlanIndex`, {
      currUserId,
      index,
    });
    return ind;
  } catch (err) {
    throw err;
  }
};

export const getUserInfo = async (currUserId) => {
  try {
    const ind = await instance.get(`/getUserInfo/${currUserId}`);
    return ind;
  } catch (err) {
    throw err;
  }
};
