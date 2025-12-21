import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn,
  faPinterest
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCreditCard, 
  faTruck, 
  faShieldAlt, 
  faHeadphones,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      {/* Top Section: Features & Newsletter */}
      <div className="footer-top">
        <div className="container">
          {/* Features */}
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <div className="feature-content">
                <h5>Free Shipping</h5>
                <p className="muted-text">On orders over $99</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              <div className="feature-content">
                <h5>Secure Payment</h5>
                <p className="muted-text">100% secure & safe</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
              <div className="feature-content">
                <h5>Quality Guarantee</h5>
                <p className="muted-text">30-day return policy</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FontAwesomeIcon icon={faHeadphones} />
              </div>
              <div className="feature-content">
                <h5>24/7 Support</h5>
                <p className="muted-text">Dedicated support</p>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="newsletter-section">
            <div className="newsletter-content">
              <h3>Stay Updated</h3>
              <p className="muted-text">Subscribe to our newsletter for the latest offers</p>
            </div>
            <div className="newsletter-form">
              <form>
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="form-control"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </div>
                <div className="form-check mt-2">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="newsletterCheck"
                  />
                  <label className="form-check-label muted-text" htmlFor="newsletterCheck">
                    I agree to receive marketing emails
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-col">
              <div className="footer-logo">
                <h3 className="brand-name">NextCart</h3>
                <p className="brand-tagline">Redefining Online Shopping</p>
              </div>
              <p className="footer-description muted-text">
                Your one-stop destination for premium products with exceptional customer service and fast delivery.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                  <span className="muted-text">123 Street, City, Country</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                  <span className="muted-text">+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                  <span className="muted-text">support@nextcart.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/shop" className="footer-link">Shop</a></li>
                <li><a href="/categories" className="footer-link">Categories</a></li>
                <li><a href="/deals" className="footer-link">Today's Deals</a></li>
                <li><a href="/new-arrivals" className="footer-link">New Arrivals</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-col">
              <h5 className="footer-title">Customer Service</h5>
              <ul className="footer-links">
                <li><a href="/faq" className="footer-link">FAQ</a></li>
                <li><a href="/shipping" className="footer-link">Shipping Policy</a></li>
                <li><a href="/returns" className="footer-link">Return Policy</a></li>
                <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="/terms" className="footer-link">Terms of Service</a></li>
              </ul>
            </div>

            {/* Account */}
            <div className="footer-col">
              <h5 className="footer-title">My Account</h5>
              <ul className="footer-links">
                <li><a href="/account" className="footer-link">My Account</a></li>
                <li><a href="/orders" className="footer-link">Order History</a></li>
                <li><a href="/wishlist" className="footer-link">Wishlist</a></li>
                <li><a href="/track" className="footer-link">Track Order</a></li>
                <li><a href="/help" className="footer-link">Help Center</a></li>
              </ul>
            </div>

            {/* Payment Methods & Apps */}
            {/* <div className="footer-col">
              <h5 className="footer-title">We Accept</h5>
              <div className="payment-methods">
                <div className="payment-icons">
                  <span className="payment-icon visa">Visa</span>
                  <span className="payment-icon mastercard">MasterCard</span>
                  <span className="payment-icon paypal">PayPal</span>
                  <span className="payment-icon applepay">Apple Pay</span>
                  <span className="payment-icon googlepay">Google Pay</span>
                </div>
              </div>
              <div className="mobile-apps">
                <h6 className="mb-2">Download Our App</h6>
                <div className="app-buttons">
                  <a href="#" className="app-btn app-store">
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </a>
                  <a href="#" className="app-btn play-store">
                    <span>Get it on</span>
                    <strong>Google Play</strong>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p className="muted-text mb-0">
                &copy; {currentYear} NextCart. All rights reserved.
              </p>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </div>
            
            <div className="footer-bottom-links">
              <a href="/privacy" className="footer-bottom-link muted-text">Privacy Policy</a>
              <span className="separator">•</span>
              <a href="/terms" className="footer-bottom-link muted-text">Terms of Service</a>
              <span className="separator">•</span>
              <a href="/cookies" className="footer-bottom-link muted-text">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;