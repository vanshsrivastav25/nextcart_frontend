import React from 'react'
import Layout from './common/Layout'
import ProductImgOne from "../assets/images/Product-1.jpg";
import ProductImgTwo from "../assets/images/Product-2.jpg";
import ProductImgThree from "../assets/images/Product-3.jpg";
import ProductImgFour from "../assets/images/Product-4.jpg";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCartShopping,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  return (
    <Layout>
      <div className="shop-container">

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Shop</li>
          </ol>
        </nav>

        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4 sidebar">
            {/* Categories */}
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h3 className='mb-3'>Categories</h3>
                <ul>
                  <li>
                    <input type="checkbox" />
                    <label className='ps-2'>Mens</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label className='ps-2'>Womens</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label className='ps-2'>Kids</label>
                  </li>
                </ul>
              </div>
            </div>

            {/* Brands */}
            <div className="card shadow border-0 mt-4">
              <div className="card-body p-4">
                <h3 className='mb-3'>Brands</h3>
                <ul>
                  <li>
                    <input type="checkbox" />
                    <label className='ps-2'>Nike</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label className='ps-2'>Adidas</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label className='ps-2'>Puma</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="col-md-8">
            <div className="row g-4">

              {[ProductImgOne, ProductImgTwo, ProductImgThree, ProductImgFour].map((img, idx) => (
                <div className="col-md-4 col-sm-6 col-12" key={idx}>
                  <div className="product-card">

                    {/* IMAGE */}
                    <div className="product-img">
                      <img src={img} alt="Product" />
                      <button className="wishlist-btn">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      <div className="quick-add">
                        <button className="btn w-100">
                          <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="product-body">
                      <Link to="/" className="product-title">
                        Olive Green Casual Shirt
                      </Link>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} />
                        ))}
                      </div>
                      <div className="price">
                        ₹3,999 <span>₹6,999</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop
