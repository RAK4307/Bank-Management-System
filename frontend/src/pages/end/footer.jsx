import React from 'react';
import './footer.css'; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="footer-logo">BluVault</p>
          <p className="footer-slogan">Your trusted financial partner for secure &amp; innovative banking solutions.</p>
          <p className="footer-address">
            <strong>Address:</strong><br />
            82 Horizon Avenue, Financial District<br />
            Newport City, NY 10201, USA
          </p>
          <p className="footer-contact">
            <strong>Contact Us:</strong><br />
            +123 456 7890
          </p>
        </div>
        <div className="footer-social-section">
          <p className="footer-follow"><strong>Follow us on:</strong></p>
          <ul className="footer-social">
            <li><a href="mailto:bluvault@bank.com" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-envelope"></i> Mail</a></li>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i> Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i> Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i> Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i> LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-muted">© 2025 BluVault Bank. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;