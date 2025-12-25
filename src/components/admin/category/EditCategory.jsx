import React, { useState } from 'react'
import Layout from '../../common/Layout'
import AdminSidebar from '../../common/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/https'
import { toast } from 'react-toastify'

const EditCategory = () => {
  const [disable, setDisable] = useState(false);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(`${apiUrl}/categories/${params.id}`,{
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${adminToken()}`
        }
      }).then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.status == 200) {
          setCategory(result.data)
          reset({
            name: result.data.name,
            status: result.data.status,
          })
        } else {
          console.log("Something went wrong");
        }
      })
    }
  });

  const saveCategory = async (data) => {
    setDisable(true);
    console.log(data);
    const res = await fetch(`${apiUrl}/categories/${params.id}`,{
      method: 'PUT',
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
                <h5 className="mb-0">Edit Category</h5>
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
                    Update
                  </button>
                </form>
              </div>
              {/* END */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditCategory