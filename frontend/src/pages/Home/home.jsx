import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../end/footer';
import './home.css';

const Home = () => {
  return (
    <div>
      <nav className="main-nav">
        <div className="nav-logo">
          <Link to="/">
            <img src="./logo.png" alt="Bank Logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
      </nav>

      <div className="hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">BluVault Bank</h1>
          <p className="hero-tagline">Trusted Today. Ready for Tomorrow.</p>
          <div className="auth-buttons">
            <div className="main-auth-group">
              <Link to="/login" className="auth-btn">Login</Link>
              <hr />
              <Link to="/signup" className="auth-btn">Signup</Link>
            </div>
            <Link to="/admin" className="auth-btn admin">Admin Login</Link>
          </div>
        </div>
      </div>

      <section className='about' id="about">
        <div className="about-container">
          <div className="about-img">
            <img
              src="https://media.istockphoto.com/id/1334729682/photo/financial-advisor-with-couple-explaining-options.jpg?s=612x612&w=0&k=20&c=EBzsda6OgkSSSLEqMySSq67u2-2ZzATqbf1Pg4TPKw0="
              alt="About Our Bank"
            />
          </div>
          <div className="about-content">
            <h3>About Us</h3>
            <p>
              <span className="bank-highlight">BluVault</span> is a forward-thinking financial institution dedicated to delivering exceptional banking experiences through innovation, integrity, and personalized service.
              <br /><br />
              With a legacy of trust and performance, we help individuals, businesses, and communities achieve their financial goals with confidence and security.
              <br /><br />
              We offer a comprehensive suite of banking services—including personal banking, business solutions, and credit facilities—tailored to your evolving needs. Our approach combines cutting-edge technology with human-centric support for a seamless and secure banking journey.
              <br /><br />
              <strong>Our vision:</strong> To be your most trusted financial partner, known for reliability, innovation, and unwavering customer focus.
            </p>
          </div>
        </div>
      </section>

      <section className='services' id="services">
        <h2>Our Services</h2>
        <div>
          <img src="https://media.istockphoto.com/id/1049658918/photo/mobile-banking-network.jpg?s=612x612&w=0&k=20&c=IxP4nfRjkNdAlVSkjh61hg-rPm7RpCCsaZ5ZEh-K2BM=" alt="Service 1" />
          <h3>Personal Banking</h3>
          <p>Easy and secure personal banking services for your daily needs.</p>
        </div>
        <div>
          <img src="https://cdn.pixabay.com/photo/2020/02/18/08/35/finance-4858797_1280.jpg" alt="Service 2" />
          <h3>Business Banking</h3>
          <p>Comprehensive solutions for businesses of all sizes.</p>
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfO_4QaSGwbwaEaCkcXRLlI6CJNFJ8LSbEw&s" alt="Service 3" />
          <h3>Loans & Credit</h3>
          <p>Flexible loans and credit options to help you grow.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;