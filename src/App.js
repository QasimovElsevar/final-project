import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/Explore";
import Downloaded from "./pages/downloaded/Downloaded";
import logo from "./AppLogo.png";

export default function App() {
  return (
    <div className="App">
      <nav className="topnav">
        {/* LEFT: Logo */}
        <div className="navLeft">
          <NavLink to="/">
            <img src={logo} alt="Home" className="navLogo" />
          </NavLink>
        </div>

        {/* CENTER: Links */}
        <div className="navCenter">
          <NavLink to="/" end className="navLink">Əsas</NavLink>
          <NavLink to="/profile" className="navLink">Haqqında</NavLink>
          <NavLink to="/explore" className="navLink">İş nümunələri</NavLink>
          <NavLink to="/downloaded" className="navLink">Əlaqə</NavLink>
        </div>

        {/* RIGHT: Search + Profile */}
        <div className="navRight">
          <NavLink to="/explore" className="iconBtn">🔍</NavLink>
          <NavLink to="/profile" className="iconBtn">👤</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/downloaded" element={<Downloaded />} />
      </Routes>
    </div>
  );
}
