import React, { useEffect, useState, useContext } from "react";
import Layout from "../common/Layout";
import { AuthContext } from "../contexts/UserAuth";
import { apiUrl } from "../common/https";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.token) {
      navigate("/account/login");
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      toast.error("Session expired");
      logout();
      navigate("/account/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-5 text-center">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="profile-wrapper">

          {/* LEFT SIDEBAR */}
          <div className="profile-sidebar">
            <img
              src=""
              alt="Profile"
              className="profile-avatar"
            />
            <h4>{profile?.name}</h4>
            <span className="profile-role">{profile?.role}</span>

            <ul className="profile-menu">
              <li className="active">Personal Information</li>
              <li>Login & Password</li>
              <li onClick={() => {
                logout();
                navigate("/account/login");
              }}>Log Out</li>
            </ul>
          </div>

          {/* RIGHT CONTENT */}
          <div className="profile-content">
            <h3>Personal Information</h3>

            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={profile?.name} disabled />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="text" value={profile?.email} disabled />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input type="text" value={profile?.role} disabled />
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-secondary">Discard Changes</button>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
