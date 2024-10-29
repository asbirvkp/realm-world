import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import WalletButton from './WalletButton';
import './Header.css';  // This should now correctly import the CSS file

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    // For example:
    // logout();
    navigate('/login');
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      closeMenu();
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h4 className="logo">Realm World</h4>
        </Link>
        <div className="wallet-button-wrapper">
          <WalletButton />
        </div>
        <button 
          ref={toggleButtonRef}
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        {isMenuOpen && (
          <nav className="navbar-toggle" ref={menuRef}>
            <ul className="navbar-list">
              <li>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `navbar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/trade-history" 
                  className={({ isActive }) => 
                    `navbar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  Trade History
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/transaction-history" 
                  className={({ isActive }) => 
                    `navbar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  Transaction History
                </NavLink>
              </li>
              <li>
                <button 
                  className="navbar-link logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
