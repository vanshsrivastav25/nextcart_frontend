import React from "react";
import Layout from "../common/Layout";
import UserSidebar from "../../components/common/UserSidebar";

const UserProfile = () => {
  return (
    <Layout>
      <div className="container my-4">
        {/* Page Title */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="page-title">My Account</h4>
        </div>

        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserSidebar />
          </div>

          {/* Content */}
          <div className="col-md-9">
            <div className="user-profile-card">
              <div className="card-body p-4">
                <h5 className="section-title mb-4">Profile Information</h5>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div className="text-end mt-3">
                  <button className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
