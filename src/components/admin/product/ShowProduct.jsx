import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import AdminSidebar from "../../common/AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { adminToken, apiUrl } from "../../common/https";
import Loading from "../../common/Loading";
import NoState from "../../common/NoState";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/products`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
    .then((res) => res.json())
    .then((result) => {
      setLoading(false);
      if (result.status == 200) {
        setProducts(result.data);
      } else {
        console.log("Something went wrong");
      }
    });
  };

  const deleteProduct = async (id) => {
    if (confirm("Are you sure want to delete?")) {
      const res = await fetch(`${apiUrl}/products/${id}`,{
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
        const newProducts = products.filter(product => product.id != id)
        setProducts(newProducts);
        toast.success(result.message)
      } else {
        console.log("Something went wrong");
      }
    })
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
                <h5 className="mb-0">Products</h5>
                <Link to='/admin/products/create' className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Create
                </Link>
              </div>

              {/* BODY */}
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table admin-table mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>SKU</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4">
                            <Loading text="Fetching products..." />
                          </td>
                        </tr>
                      ) : products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              {
                                product.image_url
                                  ? <img src={product.image_url} alt="" width={50} />
                                  : <img src="https://placehold.co/50x50" alt="placeholder" />
                              }
                            </td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.sku_code}</td>
                            <td>
                              {product.status == 1 ? (
                                <span className="status active">Active</span>
                              ) : (
                                <span className="status block">Block</span>
                              )}
                            </td>
                            <td className="text-center">
                              <Link to={`/admin/products/edit/${product.id}`} className="icon-btn edit">
                                <FontAwesomeIcon icon={faPen} />
                              </Link>
                              <Link onClick={() => deleteProduct(product.id)} className="icon-btn delete">
                                <FontAwesomeIcon icon={faTrash} />
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">
                            <NoState text="No product found." />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShowProduct;
