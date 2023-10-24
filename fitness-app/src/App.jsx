import Home from "./Pages/Home";
import Topbar from "./Components/Topbar";
import Plans from "./Pages/Plans";
import CreatePlan from "./Pages/CreatePlan";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { setAuthToken } from "./Axios/setAuthToken";
import { getUser } from "./Axios/APICalls";
import RouteGuard from "./Components/RouteGuard";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./Redux/userActions";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const dispatch = useDispatch();
  // Check jwt token on app startup

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setAuthToken(token);
  //     setIsAuthenticated(true);
  //     getUser(token).then((res) => {
  //       // console.log(res.data);
  //       // setCurrUser(res.data);
  //       dispatch(setUserInfo(res.data));
  //       // setDataLoaded(true);
  //     });
  //     // console.log(isAuthenticated);
  //   } else {
  //     console.log(isAuthenticated);
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/createPlan" element={<CreatePlan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
