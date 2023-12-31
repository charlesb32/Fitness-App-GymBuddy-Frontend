//SignUp Page
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Logo from "../Assets/Logo.jpg";
import { addUser } from "../Axios/APICalls";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    addUser(formData);
    navigate("/login");
  };
  return (
    <div className="login">
      <img id="login_logo_img" src={Logo} alt="App Logo" />
      <div className="login-logo">
        <h2>GymBuddy</h2>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="firstname"
            required
            id="firstname"
            onChange={handleChange}
            name="firstname"
            value={formData.firstname}
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="lastname"
            required
            id="lastname"
            onChange={handleChange}
            name="lastname"
            value={formData.lastname}
          />
        </div>
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="email"
            type="email"
            required
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
        <div className="form-group">
          <TextField
            className="signup_login_field"
            placeholder="confirm password"
            required
            id="confirm_password"
            onChange={handleChange}
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
          />
        </div>
        <div className="form-buttons">
          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/login")}
          >
            Go Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
