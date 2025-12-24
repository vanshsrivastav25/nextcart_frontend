import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AdminAuthContext } from '../contexts/AdminAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faLayerGroup,
  faTags,
  faBox,
  faShoppingCart,
  faUsers,
  faShippingFast,
  faChartLine,
  faKey,
  faSignOutAlt,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
  const { logout } = useContext(AdminAuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  // Determine active item based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/categories')) setActiveItem('categories');
    else if (path.includes('/admin/brands')) setActiveItem('brands');
    else if (path.includes('/admin/products')) setActiveItem('products');
    else if (path.includes('/admin/orders')) setActiveItem('orders');
    else if (path.includes('/admin/users')) setActiveItem('users');
    else if (path.includes('/admin/shipping')) setActiveItem('shipping');
    else if (path.includes('/admin/analytics')) setActiveItem('analytics');
    else if (path.includes('/admin/password')) setActiveItem('password');
    else setActiveItem('dashboard');
  }, [location]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  const navItems = [
    { id: 'dashboard', icon: faTachometerAlt, label: 'Dashboard', path: '/admin' },
    { id: 'categories', icon: faLayerGroup, label: 'Categories', path: '/admin/categories' },
    { id: 'brands', icon: faTags, label: 'Brands', path: '/admin/brands' },
    { id: 'products', icon: faBox, label: 'Products', path: '/admin/products' },
    { id: 'orders', icon: faShoppingCart, label: 'Orders', path: '/admin/orders' },
    { id: 'users', icon: faUsers, label: 'Users', path: '/admin/users' },
    { id: 'shipping', icon: faShippingFast, label: 'Shipping', path: '/admin/shipping' },
    { id: 'analytics', icon: faChartLine, label: 'Analytics', path: '/admin/analytics' },
    { id: 'password', icon: faKey, label: 'Password', path: '/admin/password' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={closeSidebar}
      />

      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="admin-welcome">
            <h2>Welcome <span>Nirmal</span></h2>
          </div>
          <p className="admin-role">Administrator</p>
        </div>

        {/* Sidebar Navigation */}
        <div className="sidebar-nav">
          <div className="section-title">Dashboard</div>
          
          {navItems.map((item) => (
            <div 
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveItem(item.id);
                closeSidebar();
              }}
            >
              <FontAwesomeIcon icon={item.icon} />
              <Link to={item.path}>{item.label}</Link>
            </div>
          ))}
        </div>

        {/* Logout Button - Separated at bottom */}
        <div className="sidebar-footer">
          <div 
            className="nav-item logout" 
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar