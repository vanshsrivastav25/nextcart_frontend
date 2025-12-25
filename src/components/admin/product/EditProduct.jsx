import React, { useEffect, useRef, useState } from "react";
import Layout from "../../common/Layout";
import AdminSidebar from "../../common/AdminSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/https";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

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
    defaultValues: {
      description: "",
    },
  });

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    fetch(`${apiUrl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          const p = res.data;

          setValue("title", p.title);
          setValue("price", p.price);
          setValue("compare_price", p.compare_price);
          setValue("description", p.description);
          setValue("short_description", p.short_description);
          setValue("category", p.category_id);
          setValue("brand", p.brand_id);
          setValue("quantity", p.quantity);
          setValue("sku_code", p.sku_code);
          setValue("barcode", p.barcode);
          setValue("status", p.status);
          setValue("is_featured", p.is_featured);

          if (p.images && p.images.length > 0) {
            setGalleryImages(
              p.images.map((img, index) => ({
                id: img.id,
                url: img.image_url,
                is_default: index === 0,
              }))
            );
          }
        } else {
          toast.error("Product not found");
        }
      });
  }, [id, setValue]);

  /* ================= FETCH CATEGORY & BRAND ================= */
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

  /* ================= UPDATE PRODUCT ================= */
  const updateProduct = async (data) => {
    if (!data.description || data.description.trim() === "") {
      toast.error("Description is required");
      return;
    }

    const payload = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      gallery: galleryImages.map((img) => img.id),
    };

    setDisable(true);

    const res = await fetch(`${apiUrl}/products/${id}`, {
      method: "PUT",
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
      toast.error("Update failed");
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

  return (
    <Layout>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-3">
            <AdminSidebar />
          </div>

          <div className="col-lg-9 col-md-8">
            <div className="card admin-card">
              <div className="card-header d-flex justify-content-between">
                <h5>Products Edit</h5>
                <Link to="/admin/products" className="btn btn-primary btn-sm">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Back
                </Link>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit(updateProduct)}>
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
                      <label>Category</label>
                      <select
                        {...register("category", { required: "Category is required" })}
                        className="form-control"
                      >
                        <option value="">Select</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Brand</label>
                      <select {...register("brand")} className="form-control">
                        <option value="">Select</option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-3">
                    <label>Description</label>
                    <JoditEditor
                      ref={editor}
                      value={watch("description")}
                      onBlur={(content) =>
                        setValue("description", content, { shouldValidate: true })
                      }
                    />
                    <input
                      type="hidden"
                      {...register("description", { required: "Description is required" })}
                    />
                  </div>

                  {/* SHORT DESCRIPTION */}
                  <div className="mb-3">
                    <label>Short Description</label>
                    <textarea
                      {...register("short_description", { required: true })}
                      className="form-control"
                      rows="3"
                    />
                  </div>

                  {/* PRICING */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Price</label>
                      <input {...register("price")} className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Discount Price</label>
                      <input {...register("compare_price")} className="form-control" />
                    </div>
                  </div>

                  {/* INVENTORY */}
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label>SKU</label>
                      <input {...register("sku_code")} className="form-control" />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>Barcode</label>
                      <input {...register("barcode")} className="form-control" />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>Quantity</label>
                      <input {...register("quantity")} className="form-control" />
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Status</label>
                      <select {...register("status")} className="form-control">
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Featured</label>
                      <select {...register("is_featured")} className="form-control">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  {/* GALLERY */}
                  <input type="file" multiple onChange={handleFile} className="form-control mb-3" />

                  <div className="row g-3 mb-3">
                    {galleryImages.map((img) => (
                      <div className="col-md-3" key={img.id}>
                        <div className="border p-2">
                          {img.is_default && <span className="badge bg-success">Default</span>}
                          <img src={img.url} className="img-fluid" />
                          <div className="d-flex justify-content-between mt-2">
                            <button type="button" onClick={() => setDefaultImage(img.id)} className="btn btn-sm btn-outline-primary">
                              <FontAwesomeIcon icon={faStar} />
                            </button>
                            <button type="button" onClick={() => removeImage(img.id)} className="btn btn-sm btn-outline-danger">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button disabled={disable} className="btn btn-primary btn-sm">
                    Update Product
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

export default EditProduct;
