import Home from "./Pages/Home";
import Topbar from "./Components/Topbar";
import Plans from "./Pages/Plans";
import CreatePlan from "./Pages/CreatePlan";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/createPlan" element={<CreatePlan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
