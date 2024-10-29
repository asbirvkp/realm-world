import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  // Add this function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add this handler function near your other handlers
  const handleViewDetailsClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link to="/" className="logo-link">
          <h1 className="logo">RealmWorld</h1>
        </Link>
        {!isMobileView && (
          <nav className="desktop-nav">
            <a href="#" onClick={handleDashboardClick}>Dashboard</a>
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}>About Us</a>
            <a href="#how-it-works" onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-it-works');
            }}>How It Works</a>
            <Link to="/how-it-works">Contact Us</Link>
          </nav>
        )}
        <div className="header-right">
          {!isMobileView ? (
            <div className="auth-buttons desktop">
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/signup" className="signup-button">Sign Up</Link>
            </div>
          ) : (
            <div className="mobile-buttons">
              <Link to="/login" className="login-button mobile">Login</Link>
              <button className="menu-toggle" onClick={toggleMenu}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
              </button>
            </div>
          )}
        </div>
      </header>
      {isMenuOpen && isMobileView && (
        <nav className="mobile-nav">
          <a href="#" onClick={handleDashboardClick}>Dashboard</a>
          <a href="#about" onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
            setIsMenuOpen(false);
          }}>About Us</a>
          <a href="#how-it-works" onClick={(e) => {
            e.preventDefault();
            scrollToSection('how-it-works');
            setIsMenuOpen(false);
          }}>How It Works</a>
          <Link to="/how-it-works">Contact Us</Link>
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </nav>
      )}
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>
              Your Unique Edge For<br />
              <span className="highlight">AI-Powered</span> Trading
            </h2>
            
            <div className="trading-cards">
              {/* First card temporarily hidden
              <div className="trading-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="card-title">
                    <h3>This Week PNL</h3>
                    <p>Current performance</p>
                  </div>
                </div>
                <div className="card-stats">
                  <span className="stat-value">+42.39%</span>
                  <span className="stat-label">Profit</span>
                </div>
                <button className="card-action">
                  View Details
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              */}
              <div className="trading-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-history"></i>
                  </div>
                  <div className="card-title">
                    <h3>Last Week PNL</h3>
                    <p>Previous performance</p>
                  </div>
                </div>
                <div className="card-stats">
                  <span className="stat-value">+42.18%</span>
                  <span className="stat-label">Profit</span>
                </div>
                <button className="card-action" onClick={handleViewDetailsClick}>
                  View Details
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>

              <div className="trading-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="card-title">
                    <h3>Last Month PNL</h3>
                    <p>Monthly overview</p>
                  </div>
                </div>
                <div className="card-stats">
                  <span className="stat-value">+162%</span>
                  <span className="stat-label">Profit</span>
                </div>
                <button className="card-action" onClick={handleViewDetailsClick}>
                  View Details
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="about">
          <div className="section-title">
            <h2>Why Choose Realm World?</h2>
          </div>
          <div className="features-container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <h3>Advanced AI Trading</h3>
                <p>Our proprietary AI algorithms analyze market trends and execute trades with a 98% success ratio.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-wallet"></i>
                </div>
                <h3>Easy Transactions</h3>
                <p>Seamless deposit and withdrawal process, allowing you to manage your investments effortlessly.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Risk Management</h3>
                <p>Advanced risk assessment and management tools to protect and grow your investments.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works" id="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <h3>1. Deposit Funds</h3>
              <p>Easily deposit funds into your Realm World account.</p>
            </div>

            <div className="step">
              <div className="step-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>2. AI Takes Over</h3>
              <p>Our advanced AI analyzes markets and executes trades automatically.</p>
            </div>

            <div className="step">
              <div className="step-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>3. Watch Profits Grow</h3>
              <p>Monitor your investments and withdraw profits at any time.</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2 className="section-title">What Our Investors Say</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "I've been using Realm World for 6 months, and the results are incredible. The AI consistently outperforms my manual trading strategies."
              </p>
              <div className="testimonial-author">
                - Sarah K., Tech Entrepreneur
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-text">
                "The ease of use and the performance of Realm World's AI trading have exceeded my expectations. It's truly a game-changer for my financial future."
              </p>
              <div className="testimonial-author">
                - Michael R., Retired Teacher
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Start Your Journey to Financial Freedom</h2>
          <div className="cta-card">
            <h3>Create Your Account</h3>
            <p>Join Realm World and let our AI work towards your financial goals while you focus on what matters most to you.</p>
            <Link to="/signup" className="cta-button">
              Sign Up Now
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Platform</h4>
              <ul>
                <li><Link to="/ai-trading">AI Trading</Link></li>
                <li><Link to="/performance">Performance Metrics</Link></li>
                <li><Link to="/risk-management">Risk Management</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/market-insights">Market Insights</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Realm World</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Realm World. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default LandingPage;
