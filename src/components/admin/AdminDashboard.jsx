import AdminSidebar from "../common/AdminSidebar";
import Layout from "../common/Layout";

const AdminDashboard = () => {
    
  return (
    <Layout>
      <div className="container">
        <div className="row">
          {/* LEFT SIDEBAR */}
          <div className="col-lg-3 col-md-4">
            <AdminSidebar />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-9 col-md-8 mt-3">
            {/* Dashboard Header */}
            <div className="dashboard-header">
              <h3 className="dashboard-title">Dashboard Overview</h3>
              <p className="dashboard-subtitle">
                Welcome back! Here's your store summary.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              <div className="col-xl-4 col-md-6">
                <div className="stat-card-simple">
                  <div className="stat-icon-wrapper blue">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-content-simple">
                    <h4>1</h4>
                    <p>Total Users</p>
                    <span className="stat-tag">
                      <i className="fas fa-arrow-up"></i> View Details
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-6">
                <div className="stat-card-simple">
                  <div className="stat-icon-wrapper orange">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div className="stat-content-simple">
                    <h4>0</h4>
                    <p>Pending Orders</p>
                    <span className="stat-tag">
                      <i className="fas fa-clock"></i> Manage Orders
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-6">
                <div className="stat-card-simple">
                  <div className="stat-icon-wrapper purple">
                    <i className="fas fa-box"></i>
                  </div>
                  <div className="stat-content-simple">
                    <h4>12</h4>
                    <p>Active Products</p>
                    <span className="stat-tag">
                      <i className="fas fa-arrow-up"></i> View Products
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;