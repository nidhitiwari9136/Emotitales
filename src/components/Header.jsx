import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">EmotiTales AI</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/summary">Summary</Link>
        <Link to="/story">Story</Link>
      </nav>
    </header>
  );
}

export default Header;
