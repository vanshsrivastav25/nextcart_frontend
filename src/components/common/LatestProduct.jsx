import React from "react";
import { Link } from "react-router-dom";
import ProductImgOne from "../../assets/images/Product-1.jpg";
import ProductImgTwo from "../../assets/images/Product-2.jpg";
import ProductImgThree from "../../assets/images/Product-3.jpg";
import ProductImgFour from "../../assets/images/Product-4.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const LatestProduct = () => {
  return (
    <section className="latest-products py-5">
      <div className="latest-products-container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>New Arrival</h2>
          <Link to="/" className="primary-text">
            View All
          </Link>
        </div>

        {/* Product */}
        <div className="row g-4">

           {/* Product One */}
          <div className="col-sm-6 col-md-4 col-lg-3">

            <div className="product-card">

              {/* IMAGE */}
              <div className="product-img">
                <img src={ProductImgOne} alt="Product" />

                <button className="wishlist-btn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>

                {/* Hover Button */}
                <div className="quick-add">
                  <button className="btn w-100">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="me-2"
                    />
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

          {/* Product Two */}
          <div className="col-sm-6 col-md-4 col-lg-3">

            <div className="product-card">

              {/* IMAGE */}
              <div className="product-img">
                <img src={ProductImgTwo} alt="Product" />

                <button className="wishlist-btn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>

                {/* Hover Button */}
                <div className="quick-add">
                  <button className="btn w-100">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="me-2"
                    />
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

          {/* Product Three */}
          <div className="col-sm-6 col-md-4 col-lg-3">

            <div className="product-card">

              {/* IMAGE */}
              <div className="product-img">
                <img src={ProductImgThree} alt="Product" />

                <button className="wishlist-btn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>

                {/* Hover Button */}
                <div className="quick-add">
                  <button className="btn w-100">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="me-2"
                    />
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

          {/* Product Four */}
          <div className="col-sm-6 col-md-4 col-lg-3">

            <div className="product-card">

              {/* IMAGE */}
              <div className="product-img">
                <img src={ProductImgFour} alt="Product" />

                <button className="wishlist-btn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>

                {/* Hover Button */}
                <div className="quick-add">
                  <button className="btn w-100">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="me-2"
                    />
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
        </div>

      </div>
    </section>
  );
};

export default LatestProduct;
