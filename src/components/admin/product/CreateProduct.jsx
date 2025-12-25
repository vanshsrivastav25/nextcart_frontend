import React, { useEffect, useRef, useState } from "react";
import Layout from "../../common/Layout";
import AdminSidebar from "../../common/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/https";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const CreateProduct = () => {
  const editor = useRef(null);
  const navigate = useNavigate();

  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { description: "" },
  });

  /* ================= SAVE PRODUCT ================= */
  const saveProduct = async (data) => {
    if (!data.description || data.description.trim() === "") {
      toast.error("Description is required");
      return;
    }

    const payload = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      gallery: galleryImages.map(img => img.id),
    };


    setDisable(true);

    const res = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    setDisable(false);

    if (result.status === 200) {
      toast.success(result.message);
      navigate("/admin/products");
    } else if (result.errors) {
      Object.keys(result.errors).forEach((field) => {
        setError(field, { message: result.errors[field][0] });
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleFile = async (e) => {
    
    const files = Array.from(e.target.files);
    
    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);
      
      setDisable(true);
      
      const res = await fetch(`${apiUrl}/temp-images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData,
      });
      
      const result = await res.json();
      
      if (result.status === 200) {
        console.log("UPLOAD RESPONSE 👉", result);
        setGalleryImages((prev) => [
          ...prev,
          {
            id: result.data.id,
            url: result.data.image_url,
            is_default: prev.length === 0,
          },
        ]);
      }

      setDisable(false);
    }

    e.target.value = null;
  };

  /* ================= IMAGE ACTIONS ================= */
  const setDefaultImage = (id) => {
    setGalleryImages((prev) =>
      prev.map((img) => ({
        ...img,
        is_default: img.id === id,
      }))
    );
  };

  const removeImage = (id) => {
    setGalleryImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);

      if (!filtered.some((img) => img.is_default) && filtered.length > 0) {
        filtered[0].is_default = true;
      }

      return [...filtered];
    });
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
                <h5>Create Products</h5>
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
                        {...register("brand", {  })}
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
                      value={watch("description") || ""}
                      onBlur={(newContent) => {
                        setValue("description", newContent, { shouldValidate: true });
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

                 {/* GALLERY */}
                  <div className="mb-3">
                    <label className="form-label">Product Gallery</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFile}
                      className="form-control"
                    />
                  </div>

                  {/* PREVIEW */}
                  <div className="row g-3 mb-3">
                    {galleryImages.map((img) => (
                      <div className="col-md-3" key={img.id}>
                        <div className="border rounded p-2 position-relative">
                          {img.is_default && (
                            <span className="badge bg-success position-absolute top-0 start-0 m-1">
                              Default
                            </span>
                          )}
                          <img
                            src={img.url}
                            alt=""
                            className="img-fluid rounded"
                            style={{
                              height: 150,
                              objectFit: "cover",
                              width: "100%",
                            }}
                          />
                          <div className="d-flex justify-content-between mt-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setDefaultImage(img.id)}
                            >
                              <FontAwesomeIcon icon={faStar} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeImage(img.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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
