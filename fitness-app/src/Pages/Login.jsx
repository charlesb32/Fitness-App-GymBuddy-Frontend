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

const Login = () => {
  const navigate = useNavigate();
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

  const handleLogin = () => {
    login(formData);
    // const loginPayload = {
    //   email: formData.email,
    //   password: formData.password,
    // };
  };
  return (
    <div className="login">
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
          onClick={handleLogin}
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
    </div>
  );
};

export default Login;
