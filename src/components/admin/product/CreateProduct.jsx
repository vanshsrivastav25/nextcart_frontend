import React, { useEffect, useRef, useState } from "react";
import Layout from "../../common/Layout";
import AdminSidebar from "../../common/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/https";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const CreateProduct = () => {
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const editor = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  /* ================= SAVE PRODUCT ================= */
  const saveProduct = async (data) => {
    setDisable(true);

    const res = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setDisable(false);

    if (result.status === 200) {
      toast.success(result.message);
      navigate("/admin/products");
    } else {
      toast.error("Something went wrong");
    }
  };

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetch(`${apiUrl}/categories`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.data));

    fetch(`${apiUrl}/brands`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    })
      .then((res) => res.json())
      .then((res) => setBrands(res.data));
  }, []);

  return (
    <Layout>
      <div className="container py-4">
        <div className="row">
          {/* SIDEBAR */}
          <div className="col-lg-3 col-md-4 mb-3">
            <AdminSidebar />
          </div>

          {/* CONTENT */}
          <div className="col-lg-9 col-md-8">
            <div className="card admin-card">
              <div className="card-header d-flex justify-content-between">
                <h5>Products / Create</h5>
                <Link to="/admin/products" className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Back
                </Link>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit(saveProduct)}>
                  {/* TITLE */}
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                  </div>

                  {/* CATEGORY & BRAND */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <select
                        {...register("category", { required: "Category is required" })}
                        className={`form-control ${errors.category ? "is-invalid" : ""}`}
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      <div className="invalid-feedback">{errors.category?.message}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Brand</label>
                      <select
                        {...register("brand", { required: "Brand is required" })}
                        className={`form-control ${errors.brand ? "is-invalid" : ""}`}
                      >
                        <option value="">Select Brand</option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                      <div className="invalid-feedback">{errors.brand?.message}</div>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <JoditEditor
                      ref={editor}
                      onBlur={(content) => {
                        setValue("description", content);
                        trigger("description");
                      }}
                    />
                    <input
                      type="hidden"
                      {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                      <small className="text-danger">{errors.description.message}</small>
                    )}
                  </div>

                  {/* SHORT DESCRIPTION */}
                  <div className="mb-3">
                    <label className="form-label">Short Description</label>
                    <textarea
                      {...register("short_description", { required: "Short description is required" })}
                      className={`form-control ${errors.short_description ? "is-invalid" : ""}`}
                      rows={3}
                    />
                    <div className="invalid-feedback">{errors.short_description?.message}</div>
                  </div>

                  {/* PRICING */}
                  <h6 className="mt-4">Pricing</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        {...register("price", { required: "Price is required" })}
                        className={`form-control ${errors.price ? "is-invalid" : ""}`}
                      />
                      <div className="invalid-feedback">{errors.price?.message}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Discount Price</label>
                      <input
                        {...register("compare_price", { required: "Discount price is required" })}
                        className={`form-control ${errors.compare_price ? "is-invalid" : ""}`}
                      />
                      <div className="invalid-feedback">{errors.compare_price?.message}</div>
                    </div>
                  </div>

                  {/* INVENTORY */}
                  <h6 className="mt-4">Inventory</h6>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">SKU</label>
                      <input
                        {...register("sku_code", { required: "SKU is required" })}
                        className={`form-control ${errors.sku_code ? "is-invalid" : ""}`}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Barcode</label>
                      <input
                        {...register("barcode", { required: "Barcode is required" })}
                        className={`form-control ${errors.barcode ? "is-invalid" : ""}`}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        {...register("quantity", { required: "Quantity is required" })}
                        className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
                      />
                    </div>
                  </div>

                  {/* STATUS & FEATURED */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        {...register("status", { required: true })}
                        className="form-control"
                      >
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Featured</label>
                      <select
                        {...register("is_featured", { required: true })}
                        className="form-control"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <button disabled={disable} className="btn btn-primary btn-sm">
                    Create Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
