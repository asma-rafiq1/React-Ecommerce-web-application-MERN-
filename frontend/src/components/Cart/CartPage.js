import React from "react";
import { useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import noshop from "../../images/noshop.png";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./cart.css";
import {
  Visa,
  Paypal,
  Paywithgoogle,
  VisaElectron,
  Western,
  Amex,
} from "react-pay-icons";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((prev, i) => {
    return (prev += i.price * i.quantity);
  }, 0);

  const checkout = () => {
    navigate("/shipping");
  };
  return (
    <div className="parent-cont">
      <MetaData title="Cart" />

      <div className="firstbox">
        <div>
          <img className="logoC" src={noshop} />
        </div>

        <div className="cartItemDisplay">
          {cartItems &&
            cartItems.map((item) => {
              return (
                <div>
                  <CartItemCard key={item.id} item={item} />
                  <hr className="hr"></hr>
                </div>
              );
            })}

          {/* <div className='cartempty'>
                    <h1>Cart is empty</h1>
                </div> */}
        </div>
      </div>

      <div className="secondbox">
        <div>
          <h1>Total</h1>
        </div>
        <hr className="line"></hr>
        <div className="subtotal">
          <h1>Sub Total</h1>
          <h1>OMR {subtotal}</h1>
        </div>
        <button onClick={checkout} className="checkout">
          Check Out
        </button>

        <h2>WE ACCEPT:</h2>
        <div className="cards">
          <Visa />
          <Paypal />
          <Paywithgoogle />
          <VisaElectron />
          <Western />
          <Amex />
        </div>
        <p>Got a discount code? Add it in the next step</p>
      </div>
    </div>
  );
};

export default CartPage;
