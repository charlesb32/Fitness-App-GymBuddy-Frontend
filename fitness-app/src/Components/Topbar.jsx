import { Button } from "@mui/material";
import * as React from "react";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  return (
    <div className="top_bar">
      <div className="left_side">
        <img id="logo_img" src={Logo} alt="App Logo" />
        <h3>GymBuddy</h3>
      </div>
      <div className="button_container">
        <Button variant="outlined" onClick={() => navigate("/home")}>
          Home
        </Button>
        <Button variant="outlined" onClick={() => navigate("/plans")}>
          Plans
        </Button>
        <Button variant="outlined">Logout</Button>
      </div>
    </div>
  );
};

export default Topbar;
