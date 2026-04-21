import React from "react";
import { useNavigate } from "react-router-dom";
import "../OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <div className="success-card">
        <div className="success-icon">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="success-details">
          <p>
            <i className="bi bi-envelope"></i>A confirmation email has been sent
            to your registered email address.
          </p>
          <p>
            <i className="bi bi-truck"></i>
            Your order will be shipped within 2-3 business days.
          </p>
          <p>
            <i className="bi bi-telephone"></i>
            You can track your order using the order ID from your confirmation
            email.
          </p>
        </div>
        <button
          className="btn btn-primary continue-btn"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
