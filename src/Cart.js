import { useEffect } from "react";
import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  // scroll to top when cart page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  if (cart.length === 0) {
    return (
      <EmptyDiv>
        <h3>No <a className="homeUrl" href="https://vshopease.vercel.app/Products">Cart</a> in Item</h3>
      </EmptyDiv>
    )
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products">
            <Button className="continue-shopping">Continue Shopping</Button>
          </NavLink>
          <Button className="btn btn-clear" id="clear-btn" onClick={clearCart}>Clear Cart</Button>
          <NavLink to="/checkout">
            <Button className="checkout-btn">Proceed to Checkout</Button>
          </NavLink>
        </div>

        {/* Cart Summary Section */}
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>Subtotal:</p>
              <p><FormatPrice price={total_price} /></p>
            </div>
            <div>
              <p>Shipping Fee:</p>
              <p><FormatPrice price={shipping_fee} /></p>
            </div>
            <div>
              <p>Order Total:</p>
              <p><FormatPrice price={total_price + shipping_fee} /></p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
   display: grid;
   place-items: center;
   height: 50vh;

   h3 {
    font-size: 3.2rem;
    text-transform: capitalize;
    font-weight: 300;
   }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

.continue-shopping:hover {
  background-color: rgb(0, 142, 185)!important;
  }

.continue-shopping {
  border-radius: 5px;
  background-color: darkblue !important;
  }

  #clear-btn{
  border-radius: 5px;
  }
  .checkout-btn{
  border-radius: 5px;
  }

  #clear-btn:hover{
 background-color: green;
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: rgb(101 34 102);
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {  
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 2rem 0.5rem;
    .grid-five-column {
      grid-template-columns: 1fr 0.7fr 1fr;
      font-size: 1.3rem;
      gap: 0.5rem;
    }
    .cart-heading {
      font-size: 1.2rem;
      padding: 0.5rem 0;
    }
    .cart-hide {
      display: none;
    }
    .cart-item {
      gap: 1.2rem;
      padding: 1.2rem 0;
    }
    .cart-image--name img {
      max-width: 3.5rem;
      height: 3.5rem;
    }
    .cart-two-button {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
      button, a {
        width: 100%;
        font-size: 1.3rem;
        padding: 1rem 0.5rem;
      }
    }
    .order-total--amount {
      width: 100%;
      align-items: stretch;
      margin: 2rem 0 0 0;
      .order-total--subdata {
        width: 100%;
        padding: 1.2rem;
        gap: 1rem;
      }
      div {
        flex-direction: row;
        gap: 1rem;
        font-size: 1.2rem;
      }
    }
    .amount-toggle {
      gap: 1rem;
      font-size: 1.2rem;
      .amount-style {
        font-size: 1.5rem;
      }
    }
    .remove_icon {
      font-size: 1.3rem;
    }
  }
`;

export default Cart;