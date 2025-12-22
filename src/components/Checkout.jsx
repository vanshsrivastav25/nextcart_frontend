import React, { useState } from "react";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/Product-1.jpg";

const Checkout = () => {
    const [paymentmethod, setPaymentMethod] = useState('cod');

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

  return (
    <Layout>
      <div className="checkout-container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active">Checkout</li>
          </ol>
        </nav>

        <div className="row mt-4">
          {/* LEFT : Billing Details */}
          <div className="col-md-7">
            <div className="checkout-card">
              <h4 className="section-title">Billing Details</h4>

              <form action="">
                <div className="row">
                    <div className="col-md-6">
                    <input className="form-input" placeholder="Name" />
                    </div>
                    <div className="col-md-6">
                    <input className="form-input" placeholder="Email" />
                    </div>
                </div>

                <textarea className="form-input" rows={4} placeholder="Address" />

                <div className="row">
                    <div className="col-md-6">
                    <input className="form-input" placeholder="City" />
                    </div>
                    <div className="col-md-6">
                    <input className="form-input" placeholder="State" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                    <input className="form-input" placeholder="Zip" />
                    </div>
                    <div className="col-md-6">
                    <input className="form-input" placeholder="Phone" />
                    </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT : Order Summary */}
          <div className="col-md-5">
            <div className="checkout-card">
              <h4 className="section-title">Items</h4>

              <div className="checkout-item">
                    <img src={ProductImg} alt="" />

                    <div className="item-info">
                        <h6>Yellow & White Dress Combination for Kids</h6>

                        <div className="item-meta">
                        <span>Size: <b>M</b></span>
                        <span>Qty: <b>2</b></span>
                        </div>

                        <span className="price">$10</span>
                    </div>
              </div>


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

              {/* Payment */}
              <h4 className="section-title mt-4">Payment Methods</h4>

              <div className="payment-method">
                <label> 
                  <input type="radio" onClick={handlePaymentMethod} checked={paymentmethod == 'stripe'} value={'stripe'} name="payment" /> Stripe
                </label>
                <label>
                  <input type="radio" onClick={handlePaymentMethod} checked={paymentmethod == 'cod'} value={'cod'} name="payment" /> COD
                </label>
              </div>

              <button className="checkout-btn mt-3">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
