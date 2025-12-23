import React from "react";
import Layout from "../../common/Layout";
import AdminSidebar from "../../common/AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ShowCategory = () => {
  return (
    <Layout>
      <div className="container py-4">
        <div className="row">
          {/* LEFT SIDEBAR */}
          <div className="col-lg-3 col-md-4 mb-3">
            <AdminSidebar />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-9 col-md-8">
            <div className="card admin-card">
              {/* HEADER */}
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Category List</h5>
                <button className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Create
                </button>
              </div>

              {/* TABLE */}
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table admin-table mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>3</td>
                        <td>Kids</td>
                        <td>
                          <span className="status active">Active</span>
                        </td>
                        <td className="text-center">
                          <button className="icon-btn edit">
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button className="icon-btn delete">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>2</td>
                        <td>Men</td>
                        <td>
                          <span className="status active">Active</span>
                        </td>
                        <td className="text-center">
                          <button className="icon-btn edit">
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button className="icon-btn delete">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>1</td>
                        <td>Women</td>
                        <td>
                          <span className="status active">Active</span>
                        </td>
                        <td className="text-center">
                          <button className="icon-btn edit">
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button className="icon-btn delete">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* END */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShowCategory;
