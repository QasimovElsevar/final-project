import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Downloaded from "./pages/Downloaded";

export default function App() {
  return (
    <div className="App">
      <nav className="nav">
        <NavLink to="/">Əsas</NavLink>
        <NavLink to="/profile">Haqqinda</NavLink>
        <NavLink to="/explore">Iş nümunələri</NavLink>
        <NavLink to="/downloaded">Əlaqə məlumatları</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />} ></Route>
        <Route path="/explore" element={<Explore />} ></Route>
        <Route path="/downloaded" element={<Downloaded />} ></Route>
      </Routes>
    </div>
  );
}
