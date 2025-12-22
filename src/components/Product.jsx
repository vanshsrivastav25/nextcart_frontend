// Product.jsx
import React, { useState } from 'react';
import Layout from './common/Layout';
import ProductImgMain from "../assets/images/Product-1.jpg";
import ProductImgThumb1 from "../assets/images/Product-1.jpg";
import ProductImgThumb2 from "../assets/images/Product-2.jpg";
import ProductImgThumb3 from "../assets/images/Product-3.jpg";
import ProductImgThumb4 from "../assets/images/Product-4.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(ProductImgMain);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Detail');

  const colors = ['#1abc9c', '#e74c3c', '#f39c12', '#7f8c8d'];

  return (
    <Layout>
      <div className="product-container">
        <div className="col-md-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
              <li className="breadcrumb-item active" aria-current="page">Blue Burton Backpack</li>
            </ol>
          </nav>
        </div>

        <div className="row mt-4">
          {/* LEFT: Product Images - Main + Thumbnails Vertically */}
          <div className="col-md-6">
            <div className="row">
              {/* Left Column: Thumbnails */}
              <div className="col-2">
                <div className="d-flex flex-column gap-2">
                  {[ProductImgThumb1, ProductImgThumb2, ProductImgThumb3, ProductImgThumb4].map((img, idx) => (
                    <div key={idx} className="thumb-wrapper" onClick={() => setSelectedImage(img)}>
                      <img
                        src={img}
                        alt={`Thumb ${idx}`}
                        className={selectedImage === img ? 'active' : ''}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column: Main Image */}
              <div className="col-10">
                <div className="main-image">
                  <img src={selectedImage} alt="Product" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="col-md-6">
            <h6>Backpack</h6>
            <h2 className="product-title">Blue Burton Backpack</h2>
            <div className="price">
              <span className="old-price">$345.00</span> <span className="new-price">$223.00</span> <span className="discount">Discount</span>
            </div>
            <div className="rating mb-3">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
              <span className="review">(3 Reviews)</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Color Options */}
            <div className="mb-3">
              <h6>Color</h6>
              <div className="d-flex gap-2 mt-1">
                {colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="color-dot"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-3">
              <h6>Quantity</h6>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Add to Cart / Wishlist */}
            <div className="d-flex gap-2 mb-4">
              <button className="btn btn-primary">Add to Cart</button>
              <button className="btn btn-outline-secondary">Add to Wishlist</button>
            </div>

            {/* Tabs */}
            <div className="product-tabs">
              {['Detail', 'Features', 'Shipping', 'Care Instruction'].map((tab) => (
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
                {activeTab === 'Shipping' && <p>Shipping information goes here...</p>}
                {activeTab === 'Care Instruction' && <p>Care instructions go here...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;