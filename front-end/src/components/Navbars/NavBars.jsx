import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbars() {
  return (
    <>
      <nav className="navbar navbar-expand-sm py-3 shadow-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-uppercase fw-bold" href="#">
            <img
              src={"/public/imgs/ist.png"}
              alt="Logo"
              width="90"
              height="60"
              className="d-inline-block align-text-top"
            />
            {/* Optional text */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
