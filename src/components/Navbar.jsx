
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("http://127.0.0.1:8000/api/logout/");
    } catch {}
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo" onClick={() => navigate("/")}>
        EmotiTales AI
      </div>

      {user && (
        <>
          {/* Hamburger Button */}
          <div 
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`nav-links ${menuOpen ? "show" : ""}`}>

            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>

            <Link to="/summary" className={location.pathname === "/summary" ? "active" : ""}>
              Summary
            </Link>

            <Link to="/story" className={location.pathname === "/story" ? "active" : ""}>
              Story
            </Link>

            <Link to="/library">
              Library
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>

          </div>
        </>
      )}

    </nav>
  );
}

export default Navbar;