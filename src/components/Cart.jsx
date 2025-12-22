import React from "react";
import Layout from "./common/Layout";
import ProductImg from '../assets/images/Product-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

const Cart = () => {
  return (
    <Layout>
      <div className="cart-container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active">Cart</li>
          </ol>
        </nav>

        <h2 className="cart-title">Cart</h2>

        <div className="row">
          {/* LEFT: Cart Items */}
          <div className="col-md-8">
            <div className="cart-item">
              <div className="cart-product">
                <img src={ProductImg} alt="" />
                <div>
                  <h6>Yellow & White Dress Combination for Kids</h6>
                    <div className="price-size">
                        <span className="price">$10</span>
                        <span className="size-badge">M</span>
                    </div>
                </div>
              </div>

              <input
                type="number"
                min="1"
                defaultValue="1"
                className="qty-input"
              />

              <button className="remove-btn">
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="col-md-4">
            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>$10</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>$3</span>
              </div>
              <div className="summary-row total">
                <span>Grand Total</span>
                <span>$13</span>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
