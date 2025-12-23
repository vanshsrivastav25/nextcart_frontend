import React, { useState } from "react";
import Layout from "../../common/Layout";
import AdminSidebar from "../../common/AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/https";

const CreateCategory = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveCategory = async (data) => {
    setDisable(true);
    console.log(data);
    const res = await fetch(`${apiUrl}/categories`,{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${adminToken()}`
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(result => {
      setDisable(false);
      if (result.status == 200) {
        toast.success(result.message);
        navigate('/admin/categories')
      } else {
        console.log("Something went wrong");
      }
    })
  };

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
                <h5 className="mb-0">Create Category</h5>
                <Link to="/admin/categories" className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Back
                </Link>
              </div>

              {/* BODY */}
              <div className="card-body">
                <form onSubmit={handleSubmit(saveCategory)}>
                  {/* NAME */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      {...register("name", {
                        required: "The name field is required",
                      })}
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  {/* STATUS */}
                  <div className="mb-4">
                    <label className="form-label">Status</label>
                    <select
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                    >
                      <option value="">Select a Status</option>
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">
                        {errors.status.message}
                      </div>
                    )}
                  </div>

                  {/* BUTTON */}
                  <button disabled={disable}
                  type="submit" className="btn btn-primary btn-sm">
                    Create
                  </button>
                </form>
              </div>
              {/* END */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
