import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import AdminSidebar from "../../common/AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { adminToken, apiUrl } from "../../common/https";
import Loading from "../../common/Loading";
import NoState from "../../common/NoState";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShowCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true)
    const res = await fetch(`${apiUrl}/categories`,{
      method: 'GET',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      }
    }).then(res => res.json())
    .then(result => {
      setLoading(false)
      if (result.status == 200) {
        setCategories(result.data);
      } else {
        console.log("Something went wrong");
      }
    })
  }

  const deleteCategory = async (id) => {
    if (confirm("Are you sure want to delete?")) {
      const res = await fetch(`${apiUrl}/categories/${id}`,{
      method: 'GET',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      }
    })
    .then(res => res.json())
    .then(result => {
      setLoading(false)
      if (result.status == 200) {
        const newCategories = categories.filter(category => category.id != id)
        setCategories(newCategories);
        toast.success(result.message)
      } else {
        console.log("Something went wrong");
      }
    })
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

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
                <Link to={'/admin/categories/create'} className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Create
                </Link>
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
                      {loading ? (
                        <tr>
                          <td colSpan="4">
                            <Loading text="Fetching categories..." />
                          </td>
                        </tr>
                      ) : categories.length > 0 ? (
                        categories.map((category) => (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                              {category.status == 1 ? (
                                <span className="status active">Active</span>
                              ) : (
                                <span className="status inactive">Block</span>
                              )}
                            </td>
                            <td className="text-center">
                              <Link to={`/admin/categories/edit/${category.id}`} className="icon-btn edit">
                                <FontAwesomeIcon icon={faPen} />
                              </Link>
                              <Link onClick={() => deleteCategory(category.id)} className="icon-btn delete">
                                <FontAwesomeIcon icon={faTrash} />
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">
                            <NoState text="No category found." />
                          </td>
                        </tr>
                      )}
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
