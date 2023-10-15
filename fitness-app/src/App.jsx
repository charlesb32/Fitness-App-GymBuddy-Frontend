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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currUser, setCurrUser] = useState({});

  // Check jwt token on app startup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      getUser(token).then((res) => {
        // console.log(res.data);
        setCurrUser(res.data);
      });
      // console.log(isAuthenticated);
    } else {
      console.log(isAuthenticated);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route
            path="/home"
            element={
              <PrivateRoute
                element={<Home />}
                isAuthenticated={isAuthenticated}
              />
            }
          /> */}
          <Route path="/home" element={<Home user={currUser} />} />
          <Route path="/plans" element={<Plans user={currUser} />} />
          <Route path="/createPlan" element={<CreatePlan user={currUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
