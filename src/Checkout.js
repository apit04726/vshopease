import React from 'react';
import { useCartContext } from "./context/cart_context";
import FormatPrice from "./Helpers/FormatPrice";
import { Button } from "./styles/Button";
import styled from "styled-components";
import { FaLock, FaShoppingBag, FaTruck, FaCheckCircle } from "react-icons/fa";

const Checkout = () => {
  const { cart, total_price, shipping_fee } = useCartContext();

  // Calculate total
  const orderTotal = total_price + shipping_fee;

  // Razorpay payment handler
  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res || !window.Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    // IMPORTANT: Replace with your Razorpay TEST key from https://dashboard.razorpay.com/app/keys
    const razorpayKey = "YOUR_RAZORPAY_KEY_ID";
    if (!razorpayKey || razorpayKey === "YOUR_RAZORPAY_KEY_ID") {
      alert("Please set your Razorpay key in Checkout.js");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: orderTotal * 100, // Amount in paise
      currency: "INR",
      name: "VShopEase",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        // You can add order success logic here
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          alert("Oops! Something went wrong. Payment Failed");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Load Razorpay script
  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  return (
    <CheckoutWrapper>
      <div className="container">
        <div className="header-section">
          <div className="header-content">
            <h1 className="main-title">Secure Checkout</h1>
            <p className="subtitle">Complete your purchase with confidence</p>
          </div>
          <div className="security-badge">
            <FaLock className="lock-icon" />
            <span>SSL Secured Payment</span>
          </div>
        </div>

        <div className="content-grid">
          {/* Left Column - Order Summary */}
          <div className="order-section">
            <div className="section-header">
              <FaShoppingBag className="section-icon" />
              <h2>Order Summary</h2>
            </div>

            <div className="cart-items-container">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-details">
                      <span className="item-quantity">{item.amount} × </span>
                      <span className="item-unit-price"><FormatPrice price={item.price} /></span>
                    </div>
                  </div>
                  <div className="item-total">
                    <FormatPrice price={item.price * item.amount} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span><FormatPrice price={total_price} /></span>
              </div>
              <div className="price-row">
                <span>Shipping Fee</span>
                <span><FormatPrice price={shipping_fee} /></span>
              </div>
              <div className="divider"></div>
              <div className="price-row total">
                <span>Order Total</span>
                <span className="total-amount"><FormatPrice price={orderTotal} /></span>
              </div>
            </div>

            <div className="shipping-info">
              <FaTruck className="truck-icon" />
              <div>
                <div className="shipping-title">Free Shipping</div>
                <div className="shipping-desc">Estimated delivery: 3-5 business days</div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="payment-section">
            <div className="section-header">
              <FaLock className="section-icon" />
              <h2>Payment Details</h2>
            </div>

            <div className="payment-card">
              <div className="payment-amount">
                <div className="amount-label">Total Amount</div>
                <div className="amount-value"><FormatPrice price={orderTotal} /></div>
              </div>

              <div className="payment-features">
                <div className="feature">
                  <FaCheckCircle className="feature-icon" />
                  <span>Secure 256-bit SSL Encryption</span>
                </div>
                <div className="feature">
                  <FaCheckCircle className="feature-icon" />
                  <span>No Extra Transaction Fees</span>
                </div>
                <div className="feature">
                  <FaCheckCircle className="feature-icon" />
                  <span>Instant Payment Confirmation</span>
                </div>
              </div>

              <Button
                className="payment-button"
                onClick={handlePayment}
                fullWidth
              >
                <FaLock className="button-icon" />
                Pay Securely with Razorpay
              </Button>

              <p className="secure-note">
                Your payment is fully encrypted. Card details are never stored.</p>

              <div className="payment-methods">
                <div className="methods-label">Accepted Payment Methods:</div>
                <div className="method-icons">
                  <span className="method-icon">💳</span>
                  <span className="method-icon">🏦</span>
                  <span className="method-icon">📱</span>
                  <span className="method-icon">🔗</span>
                </div>
              </div>
            </div>

            <div className="support-info">
              <div className="support-title">Need Help?</div>
              <div className="support-desc">
                Contact our support team at support@vshopease.com or call +91 9876543210
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutWrapper>
  );
};

const CheckoutWrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 2rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Header Section */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-content {
    flex: 1;
  }

  .main-title {
    font-size: 2.8rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.4rem;
    color: #718096;
    font-weight: 400;
  }

  .security-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    font-weight: 600;
    color: #38a169;
    font-size: 14px;
  }

  .lock-icon {
    font-size: 1.4rem;
  }

  /* Content Grid */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    margin-bottom: 3rem;
  }

  /* Common Section Styles */
  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .section-header h2 {
    font-size: 22px;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }

  .section-icon {
    font-size: 19px;
    color: #667eea;
  }

  /* Order Section */
  .order-section {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .cart-items-container {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 2rem;
    padding-right: 0.5rem;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    font-size: 1.1rem;

    &:hover {
      background: #f7fafc;
      border-radius: 0.5rem;
    }
  }

  .item-info {
    flex: 1;
  }

  .item-name {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
    font-size: 13px;
  }

  .item-details {
    font-size: 13px;
    color: #718096;
  }

  .item-unit-price {
    font-weight: 500;
  }

  .item-total {
    font-weight: 700;
    color: #2d3748;
    font-size: 1.3rem;
  }

  /* Pricing Breakdown */
  .pricing-breakdown {
    background: #f8fafc;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 16px;
    color: #4a5568;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .price-row.total {
    font-size: 16px;
    font-weight: 700;
    color: #2d3748;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #e2e8f0;
  }

  .total-amount {
    font-size: 1.6rem;
    color: #667eea;
  }

  .divider {
    height: 1px;
    background: #e2e8f0;
    margin: 1rem 0;
  }

  /* Shipping Info */
  .shipping-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%);
    padding: 1.25rem;
    border-radius: 0.75rem;
    border: 1px solid #c6f6d5;
    font-size: 1.1rem;
  }

  .truck-icon {
    font-size: 1.8rem;
    color: #38a169;
  }

  .shipping-title {
    font-weight: 600;
    color: #276749;
    margin-bottom: 0.25rem;
    font-size: 16px;
  }

  .shipping-desc {
    font-size: 13px;
    color: #38a169;
  }

  /* Payment Section */
  .payment-section {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(50, 50, 93, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .payment-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 1rem;
    padding: 2rem;
    color: white;
    margin-bottom: 2rem;
  }

  .payment-amount {
    text-align: center;
    margin-bottom: 2rem;
  }

  .amount-label {
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 0.5rem;
  }

  .amount-value {
    font-size: 3.2rem;
    font-weight: 700;
  }

  .payment-features {
    margin-bottom: 2rem;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    font-size: 13px;
    opacity: 0.95;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .feature-icon {
    color: #68d391;
    font-size: 13px;
  }

  .payment-button {
    background: white !important;
    color: #667eea !important;
    border: none;
    padding: 1.25rem !important;
    font-size: 1.3rem !important;
    font-weight: 600 !important;
    border-radius: 0.75rem !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
    transition: all 0.3s ease !important;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    &:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
      background: #f7fafc !important;
    }
  }

  .button-icon {
    font-size: 1.4rem;
  }

  .secure-note {
    text-align: center;
    font-size: 15px;
    opacity: 0.9;
    margin: 1.5rem 0;
    line-height: 1.5;
  }

  .payment-methods {
    text-align: center;
    margin-top: 1.5rem;
  }

  .methods-label {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 0.75rem;
  }

  .method-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .method-icon {
    font-size: 2rem;
    opacity: 0.9;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  /* Support Info */
  .support-info {
    background: #f7fafc;
    border-radius: 0.75rem;
    padding: 1.5rem;
    text-align: center;
    border: 1px solid #e2e8f0;
  }

  .support-title {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-size: 14px;
  }

  .support-desc {
    font-size: 13px;
    color: #718096;
    line-height: 1.5;
  }

  /* Responsive Design - Desktop */
  @media (min-width: 1025px) {
    .container {
      max-width: 1200px;
    }
    
    .main-title {
      font-size: 2.8rem;
    }
    
    .subtitle {
      font-size: 1.4rem;
    }
    
    .cart-item {
      font-size: 1.1rem;
    }
  }

  /* Responsive Design - Tablet */
  @media (max-width: 1024px) and (min-width: 769px) {
    .container {
      max-width: 900px;
    }
    
    .content-grid {
      gap: 2rem;
    }
    
    .main-title {
      font-size: 2.5rem;
    }
    
    .subtitle {
      font-size: 1.3rem;
    }
    
    .section-header h2 {
      font-size: 1.6rem;
    }
    
    .cart-item {
      font-size: 1.05rem;
    }
    
    .price-row {
      font-size: 1.1rem;
    }
    
    .amount-value {
      font-size: 2.8rem;
    }
    
    .payment-button {
      font-size: 1.2rem !important;
    }
  }

  /* Responsive Design - Mobile */
  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .header-section {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }

    .main-title {
      font-size: 2.2rem;
    }
    
    .subtitle {
      font-size: 1.2rem;
    }

    .cart-items-container {
      max-height: 300px;
    }

    .payment-card {
      padding: 1.5rem;
    }

    .amount-value {
      font-size: 2.5rem;
    }
    
    .section-header h2 {
      font-size: 1.5rem;
    }
    
    .cart-item {
      font-size: 1rem;
    }
    
    .price-row {
      font-size: 1.1rem;
    }
    
    .payment-button {
      font-size: 1.1rem !important;
    }
    
    .feature {
      font-size: 1rem;
    }
  }

  /* Responsive Design - Small Mobile */
  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }

    .order-section,
    .payment-section {
      padding: 1.5rem;
    }

    .main-title {
      font-size: 2.9rem;
    }
    
    .subtitle {
      font-size: 12px;
    }

    .section-header h2 {
      font-size: 16px;
    }

    .payment-button {
      padding: 1rem !important;
      font-size: 1rem !important;
    }

    .amount-value {
      font-size: 2.2rem;
    }
    
    .amount-label {
      font-size: 12px;
    }

    .cart-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 1rem;
    }

    .item-total {
      align-self: flex-end;
      font-size: 13px;
    }

    .security-badge {
      width: 58%;
      justify-content: center;
      font-size: 11px;
    }
    
    .price-row {
      font-size: 15px;
    }
    
    .price-row.total {
      font-size: 15px;
    }
    
    .total-amount {
      font-size: 15px;
    }
    
    .feature {
      font-size: 11px;
    }
    
    .support-title {
      font-size: 14px;
    }
    
    .support-desc {
      font-size: 11px;
    }
    
    .secure-note {
      font-size: 11px;
    }
    
    .methods-label {
      font-size: 11px;
    }
    
    .method-icon {
      font-size: 1.8rem;
    }
  }

  /* Extra Small Mobile */
  @media (max-width: 360px) {
    .main-title {
      font-size: 1.7rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .section-header h2 {
      font-size: 14px;
    }
    
    .cart-item {
      font-size: 11px;
    }
    
    .payment-button {
      font-size: 0.95rem !important;
    }
    
    .amount-value {
      font-size: 1.9rem;
    }
  }

  /* Scrollbar Styling */
  .cart-items-container::-webkit-scrollbar {
    width: 6px;
  }

  .cart-items-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .cart-items-container::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .cart-items-container::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

export default Checkout;