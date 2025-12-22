import React, { useState } from 'react';
import Layout from './common/Layout';
import ProductImgMain from "../assets/images/Product-1.jpg";
import ProductImgThumb1 from "../assets/images/Product-1.jpg";
import ProductImgThumb2 from "../assets/images/Product-2.jpg";
import ProductImgThumb3 from "../assets/images/Product-3.jpg";
import ProductImgThumb4 from "../assets/images/Product-4.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// ✅ Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(ProductImgMain);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Detail');
  const [selectedSize, setSelectedSize] = useState('M');

  const colors = ['#1abc9c', '#e74c3c', '#f39c12', '#7f8c8d'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const images = [
    ProductImgThumb1,
    ProductImgThumb2,
    ProductImgThumb3,
    ProductImgThumb4
  ];

  return (
    <Layout>
      <div className="product-container">
        <div className="col-md-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
              <li className="breadcrumb-item active">Blue Burton Backpack</li>
            </ol>
          </nav>
        </div>

        <div className="row mt-4">
          {/* LEFT: Images */}
          <div className="col-md-6">
            <div className="row">
              {/* Thumbnails with Swiper */}
              <div className="col-2">
                <Swiper
                  direction="vertical"
                  slidesPerView={4}
                  spaceBetween={10}
                  modules={[Navigation]}
                  className="thumb-swiper"
                  breakpoints={{
                    0: { direction: "horizontal" },
                    768: { direction: "vertical" }
                  }}
                >
                  {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div
                        className="thumb-wrapper"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img
                          src={img}
                          alt={`Thumb ${idx}`}
                          className={selectedImage === img ? 'active' : ''}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Main Image */}
              <div className="col-10">
                <div className="main-image">
                  <img src={selectedImage} alt="Product" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="col-md-6">
            <h6>Backpack</h6>
            <h2 className="product-title">Blue Burton Backpack</h2>

            {/* ✅ SKU CODE */}
            <p className="sku">SKU: <span>BB-10239</span></p>

            <div className="price">
              <span className="old-price">$345.00</span>
              <span className="new-price">$223.00</span>
              <span className="discount">Discount</span>
            </div>

            <div className="rating mb-3">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
              <span className="review">(3 Reviews)</span>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>

            {/* Colors */}
            <div className="mb-3">
              <h6>Color</h6>
              <div className="d-flex gap-2">
                {colors.map((c, i) => (
                  <span key={i} className="color-dot" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-3">
              <h6>Size</h6>
              <div className="d-flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <h6>Quantity</h6>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2 mb-4">
              <button className="btn btn-primary">Add to Cart</button>
              <button className="btn btn-outline-secondary">Add to Wishlist</button>
            </div>

            {/* Tabs */}
            <div className="product-tabs">
              {['Detail', 'Features', 'Shipping', 'Care Instruction'].map(tab => (
                <button
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <div className="tab-content">
                {activeTab === 'Detail' && <p>Product details go here...</p>}
                {activeTab === 'Features' && <p>Product features go here...</p>}
                {activeTab === 'Shipping' && <p>Shipping info...</p>}
                {activeTab === 'Care Instruction' && <p>Care instructions...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
