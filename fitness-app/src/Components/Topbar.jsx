import { Button } from "@mui/material";
import * as React from "react";
import Logo from "../Assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../Redux/store";
const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.userInfo);
  // const setIsLoggedIn = props.setIsLoggedIn;
  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("persist:root");
    const persistor = persistStore(store);
    persistor.purge(); // This will purge the persisted state
    dispatch(logout()); // Dispatch the logout action to clear user-related state
    navigate("/login");
    // setIsLoggedIn(false);
  };
  return (
    <div className="top_bar">
      <div className="left_side">
        <img id="topbar_logo_img" src={Logo} alt="App Logo" />
        <h3 style={{ paddingRight: "400px" }}>GymBuddy</h3>
        <h3>Welcome {currUser ? currUser.user.firstname : ""}</h3>
      </div>
      <div className="button_container">
        <Button variant="outlined" onClick={() => navigate("/home")}>
          Home
        </Button>
        <Button variant="outlined" onClick={() => navigate("/plans")}>
          Plans
        </Button>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
