import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import { useTheme } from '../contexts/ThemeContext';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className='shadow'>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand href="/" className="me-5">
              <img src={Logo} alt="Apnastore Logo" width={140} />
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="navbarScroll" />
            
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0 align-items-center"
                navbarScroll
              >
                <Nav.Link href="#action1" className="px-3">Mens</Nav.Link>
                <Nav.Link href="#action2" className="px-3">Womens</Nav.Link>
                <Nav.Link href="#" disabled className="px-3">Kids</Nav.Link>
              </Nav>

              {/* Right Side Icons Container */}
              <div className="d-flex align-items-center ms-3">
                
                {/* Cart */}
                <Link to="/cart " className="nav-icon me-3 position-relative">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                  <span className="nav-icon-badge">3</span>
                </Link>
                
                {/* Account Dropdown - Icon Only */}
                <div className="dropdown">
                  <button 
                    className="btn btn-link dropdown-toggle p-0" 
                    type="button" 
                    id="accountDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ 
                      background: 'transparent', 
                      border: 'none',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-color)'
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                    <li><a className="dropdown-item" href="#">My Profile</a></li>
                    <li><a className="dropdown-item" href="#">Orders</a></li>
                    <li><a className="dropdown-item" href="#">Wishlist</a></li>
                    <li><a className="dropdown-item" href="#">Setting</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item">Logout</a></li>
                  </ul>
                </div>
                
                {/* Theme Toggle */}
                <button 
                  className="btn theme-toggle ms-3"
                  onClick={toggleTheme}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  style={{ 
                    background: 'transparent', 
                    border: 'none',
                    padding: '8px',
                  }}
                >
                  {isDarkMode ? (
                    <FontAwesomeIcon icon={faSun} style={{ color: '#ffd700', fontSize: '1.2rem' }} />
                  ) : (
                    <FontAwesomeIcon icon={faMoon} style={{ color: '#2f4858', fontSize: '1.2rem' }} />
                  )}
                </button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header