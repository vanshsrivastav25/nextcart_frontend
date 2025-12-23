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

const ShowBrand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    setLoading(true)
    const res = await fetch(`${apiUrl}/brands`,{
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
        setBrands(result.data);
      } else {
        console.log("Something went wrong");
      }
    })
  }

  const deleteBrand = async (id) => {
    if (confirm("Are you sure want to delete?")) {
      const res = await fetch(`${apiUrl}/brands/${id}`,{
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
        const newBrands = brands.filter(brand => brand.id != id)
        setBrands(newBrands);
        toast.success(result.message)
      } else {
        console.log("Something went wrong");
      }
    })
    }
  }

  useEffect(() => {
    fetchBrands()
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
                <h5 className="mb-0">Brand List</h5>
                <Link to={'/admin/brands/create'} className="btn btn-primary btn-sm">
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
                            <Loading text="Fetching brands..." />
                          </td>
                        </tr>
                      ) : brands.length > 0 ? (
                        brands.map((brand) => (
                          <tr key={brand.id}>
                            <td>{brand.id}</td>
                            <td>{brand.name}</td>
                            <td>
                              {brand.status == 1 ? (
                                <span className="status active">Active</span>
                              ) : (
                                <span className="status block">Block</span>
                              )}
                            </td>
                            <td className="text-center">
                              <Link to={`/admin/brands/edit/${brand.id}`} className="icon-btn edit">
                                <FontAwesomeIcon icon={faPen} />
                              </Link>
                              <Link onClick={() => deleteBrand(brand.id)} className="icon-btn delete">
                                <FontAwesomeIcon icon={faTrash} />
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">
                            <NoState text="No brand found." />
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

export default ShowBrand;
