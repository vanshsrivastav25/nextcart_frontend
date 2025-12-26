import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from '../common/https';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const LatestProduct = () => {
  const[products, setProducts] = useState([])

  const latestProducts = async () => {
    await fetch(apiUrl+'/get-latest-products',{
      method: 'GET',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
      }
    })
    .then(res => res.json())
    .then(result => {
      setProducts(result.data)
    })
  }

  useEffect(() => {
    latestProducts();
  },[])

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
          {
            products && products.map(product => {
              return (
                <div className="col-sm-6 col-md-4 col-lg-3">

                  <div className="product-card">

                    {/* IMAGE */}
                    <div className="product-img">
                      <img src={product.image_url} alt="Product" />

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
                      <Link to="/product" className="product-title">
                        {product.title}
                      </Link>

                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} />
                        ))}
                      </div>

                      <div className="price">
                        ₹{product.price}
                        {
                          product.compare_price && <span>₹{product.compare_price}</span>
                        } 
                      </div>
                    </div>

                  </div>

                </div>
              )
            }) 
          }
        </div>

      </div>
    </section>
  );
};

export default LatestProduct;
