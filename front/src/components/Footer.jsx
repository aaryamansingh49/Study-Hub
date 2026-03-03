import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-brand">
          <h2>Workshit</h2>
          <p>
            Worksheets for university students. 
            Learn smarter. Practice better. Save time
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Legal */}
        <div className="footer-links">
          <h3>Legal</h3>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Workshit. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;