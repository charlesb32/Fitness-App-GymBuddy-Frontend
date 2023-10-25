import Home from "./Pages/Home";
import Topbar from "./Components/Topbar";
import Plans from "./Pages/Plans";
import CreatePlan from "./Pages/CreatePlan";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import AuthWrapper from "./Components/AuthWrapper";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.user.userInfo);
  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Topbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <AuthWrapper allowUnauthenticated={true}>
                <SignUp />
              </AuthWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <AuthWrapper>
                <Home />
              </AuthWrapper>
            }
          />
          <Route
            path="/plans"
            element={
              <AuthWrapper>
                <Plans />
              </AuthWrapper>
            }
          />
          <Route
            path="/createPlan"
            element={
              <AuthWrapper>
                <CreatePlan />
              </AuthWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
