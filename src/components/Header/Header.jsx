import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Header.css";
// import LOGO from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  
  return (
    // bg-light when need use this class
    <header className="py-3 shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo Section */}
        <div className="logo-container d-flex align-items-center">
          <img src="https://www.mjunction.in/wp-content/themes/mjunction/img/logo.png" alt="Logo" className="logo me-3" />
          {/* <h1 className="header-title text-primary m-0">
            <Link to="/">PDF <span className="text-accent">Text Extractor</span></Link>
          </h1> */}
        </div>

        {/* Navigation Section */}
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              {/* All Tools Dropdown */}
              {/*<li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  All Tools
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Merge</a></li>
                  <li><a className="dropdown-item" href="#">Split</a></li>
                  <li><a className="dropdown-item" href="#">Add pages</a></li>
                </ul>
              </li>
               <li className="nav-item">
                <a className="nav-link" href="#">Compress</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Edit</a>
              </li>*/}
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/")}>PDF Extractor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/upload/aadhar-card")}>Aadhar Card</a>
              </li> 
            </ul>
          </div>
        </nav>

        {/* Auth Links */}
        {/* <div className="auth-links d-flex">
          <a className="nav-link d-inline-block me-3" href="#">Log in</a>
          <a className="btn btn-primary" href="#">Sign up</a>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
