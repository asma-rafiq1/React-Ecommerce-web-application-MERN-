import React from "react";
import { useSelector } from "react-redux";
import Steps from "../layout/Steps/Step";
import "./OrderDetails.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderDetails = () => {
  const { userd } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const { address, city, state, country, phoneNo, pinCode } = shippingInfo;

  const subtotal = cartItems.reduce((acc, item) => {
    return (acc += item.price * item.quantity);
  }, 0);

  const tax = subtotal * 0.18;
  const shippingCharges = subtotal > 1000 ? 200 : 0;

  const totalamount = subtotal + tax + shippingCharges;

  const submit = () => {
    let orderInfo = {
      subtotal: subtotal,
      tax: tax,
      shippingCharges: shippingCharges,
      totalamount: totalamount,
    };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    navigate("/payment");
  };
  return (
    <div className="parent-conta">
      <MetaData title={"Confirm Order"} />
      <Steps activeStep={1} />
      <div className="sec-con">
        <div className="column">
          <div>
            <h1>Shipping Info</h1>
            <div className="column">
              <p>Name : {userd.name}</p>
              <p>Phone : {phoneNo}</p>
              <p>Address : {`${address} ${city} ${state} ${country}`}</p>
            </div>
          </div>

          <div>
            <h1>Your Cart Items:</h1>

            <div className="cartItemsFull">
              {cartItems.map((item) => {
                return (
                  <div className="row">
                    <img src={item.image} />
                    <p>{item.name.slice(0, 90)}</p>
                    <p>{`${item.quantity} * ${item.price} = OMR ${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="column ordersum">
          <h1>Order Summary</h1>
          <hr></hr>

          <div className="rowam">
            <p>Subtotal:</p>
            <p>{subtotal}</p>
          </div>
          <div className="rowam">
            <p>Shipping Charges:</p>
            <p>{shippingCharges}</p>
          </div>

          <div className="rowam">
            <p>GST:</p>
            <p>{tax}</p>
          </div>

          <hr></hr>

          <div className="rowam">
            <p>Total:</p>
            <p>{totalamount}</p>
          </div>
          <button onClick={submit} className="checkout">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
