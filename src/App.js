import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Explore from "./pages/explore/Explore";
import Downloaded from "./pages/downloaded/Downloaded";
import logo from "./AppLogo.png";
import magnifying from "./magnifying.png"
import profile from "./profile.png"

export default function App() {
  return (
    <div className="App">
      <nav className="topnav">

        <div className="navLeft">
          <NavLink to="/">
            <img src={logo} alt="Home" className="navLogo" />
          </NavLink>
        </div>

        <div className="navCenter">
          <NavLink to="/" end className="navLink">Main</NavLink>
          <NavLink to="/profile" className="navLink">Profile</NavLink>
          <NavLink to="/explore" className="navLink">Explore</NavLink>
          <NavLink to="/downloaded" className="navLink">Downloaded</NavLink>
        </div>


        <div className="navRight">
          <NavLink to="/explore"><img src={magnifying} alt="Home"className="iconBtn" /></NavLink>
          <NavLink to="/profile"><img src={profile} alt="Home"className="iconBtn" /></NavLink>
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
