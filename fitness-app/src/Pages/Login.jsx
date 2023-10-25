import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const loginResponse = await login(formData); // Await the login response

      if (loginResponse && localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        setAuthToken(token);
        const userResponse = await getUser(token); // Await the user response
        dispatch(setUserInfo(userResponse.data));
        navigate("/home"); // Navigate to /home if login is successful
      } else {
        console.log("Not Authed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

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
            onClick={() => {
              console.log("HERE");
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
