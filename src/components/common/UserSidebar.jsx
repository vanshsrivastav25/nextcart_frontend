import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBoxOpen,
  faKey,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const UserSidebar = () => {
  return (
    <div className="container">
      <div className="user-sidebar">
        <div className="sidebar-header">Account</div>

        <ul className="sidebar-list">
          <li>
            <NavLink to="/account" className="sidebar-item">
              <FontAwesomeIcon icon={faUser} />
              Account
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="sidebar-item">
              <FontAwesomeIcon icon={faBoxOpen} />
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/forgot-password" className="sidebar-item">
              <FontAwesomeIcon icon={faKey} />
              Change Password
            </NavLink>
          </li>

          <li>
            <NavLink to="/logout" className="sidebar-item logout">
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
