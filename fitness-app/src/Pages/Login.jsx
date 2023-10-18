import React, { useState } from "react";
import {
  TextField,
  Button,
  // FormControl,
  // InputLabel,
  Select,
  MenuItem,
  // SelectChangeEvent,
  // Box,
  // OutlinedInput,
  Typography,
} from "@mui/material";
import Logo from "../Assets/Logo.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../Axios/APICalls";
import { setAuthToken } from "../Axios/setAuthToken";
import { getUser } from "../Axios/APICalls";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../Redux/userActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Name: ${name}, Value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    console.log(formData);
    // const loginResponse = await login(formData);
    login(formData).then((res) => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        // setIsAuthenticated(true);
        getUser(token).then((res) => {
          // console.log(res.data);
          // setCurrUser(res.data);
          dispatch(setUserInfo(res.data));
          // setDataLoaded(true);
        });
        // console.log(isAuthenticated);
      } else {
        console.log("Not Authed");
        // setIsAuthenticated(false);
      }
    });
    // console.log(loginResponse);
    navigate("/home");
    // window.location.reload();
    // navigate("/login");
  };
  // const handleLogin = async () => {
  //   try {
  //     console.log(formData);
  //     await login(formData); // Wait for the login process to complete
  //     // navigate("/home"); // Navigate to the home page upon successful login
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     // Handle the login failure, such as displaying an error message to the user.
  //   }
  // };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <img id="login_logo_img" src={Logo} alt="App Logo" />
        <h3>GymBuddy</h3>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="email"
            required
            type="email"
            id="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="password"
            required
            id="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            type="password"
          />
        </div>
        <div className="form_group">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
            type="submit"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
