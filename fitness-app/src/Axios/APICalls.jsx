import axios from "axios";
import { setAuthToken } from "./setAuthToken";

const baseURL = "http://localhost:4000/";
const instance = axios.create({ baseURL });

//given the currUserId and the userData from the create plan form, will create a specific plan for that user
export const addPlanToUser = async (userData, currUserId) => {
  try {
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

//creates a new user using userData
export const addUser = async (userData) => {
  try {
    const response = await instance.post("/addUser", { userData });
    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
    return error;
  }
};

//logs user in
export const login = async (loginPayload) => {
  try {
    const response = await instance.post("/login", loginPayload);
    console.log(response.data);
    const { token } = response.data;
    localStorage.setItem("token", token);
    //set token to axios common header
    setAuthToken(token);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
    return error;
  }
};

//gets the user info based on the token
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

//gets all plans for a currUser by userID
export const getPlans = async (currUserId) => {
  try {
    const plans = await instance.get(`/getPlans/${currUserId}`);
    return plans;
  } catch (err) {
    throw err;
  }
};

//sets the acticePlanIndex for a user based on their id and the index of the plan they selected
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

//gets userInfo based on userID
export const getUserInfo = async (currUserId) => {
  try {
    const ind = await instance.get(`/getUserInfo/${currUserId}`);
    return ind;
  } catch (err) {
    throw err;
  }
};

export const deletePlanById = async (planId, userId) => {
  try {
    await instance.delete(`/deletePlanById/${planId}/${userId}`);
  } catch (err) {
    throw err;
  }
};
