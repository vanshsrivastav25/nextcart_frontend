import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';
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
  faKey
} from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
  const {logout } = useContext(AdminAuthContext);

  return (
     <div className="admin-sidebar">
        {/* Compact User Profile */}
        <div className="admin-profile-compact">
        <div className="profile-avatar-small">
            {/* <img src='' alt='Admin Name' /> */}
        </div>
        <div className="profile-info-small">
            <h6 className="profile-name-small">Admin Name</h6>
            <span className="profile-role-small">Admin Role</span>
        </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="sidebar-nav">
            <div className="nav-item active">
                <FontAwesomeIcon icon={faTachometerAlt} />
                <span>Dashboard</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faLayerGroup} />
                <Link to={`/admin/categories`}>Categories</Link>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faTags} />
                <span>Brands</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faBox} />
                <span>Products</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Orders</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faUsers} />
                <span>Users</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faShippingFast} />
                <span>Shipping</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faChartLine} />
                <span>Analytics</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faKey} />
                <span>Password</span>
            </div>
        </div>

        {/* Logout Button */}
        <div className="sidebar-footer">
        <div className="nav-item logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>
            <Link onClick={logout}>Logout</Link>
            </span>
        </div>
        </div>
    </div>
  )
}

export default AdminSidebar