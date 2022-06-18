import React, { useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Typography } from "@material-ui/core";
import "./PaymentDetails.css";
import Steps from "../layout/Steps/Step";
import axios from "axios";
import { newOrder } from "../../actions/orderActions";
import MetaData from "../layout/MetaData";

const PaymentDetails = () => {
  const orderAmount = JSON.parse(localStorage.getItem("orderInfo"));
  const { userd } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { address, city, state, country, phoneNo, pinCode } = shippingInfo;

  const stripe = useStripe();
  const elements = useElements();
  const paymentbutton = useRef();
  const alert=useAlert()

  React.useEffect(() => {
    if (!shippingInfo || !orderAmount) {
      console.log("nope");
      navigate("/cart");
    }
  }, [navigate]);

  const placeorder = async (e) => {
    e.preventDefault();

    paymentbutton.current.disabled = true;

    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userd.name,
            email: userd.email,
            address: {
              line1: address,
              city: city,
              state: state,
              postal_code: pinCode,
              country: "US",
            },
          },
        },
      });

      const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderAmount.subtotal,
        taxPrice: orderAmount.tax,
        shippingPrice: orderAmount.shippingCharges,
        totalPrice: orderAmount.totalamount,
      };

      if (result.error) {
        paymentbutton.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
           alert.success('Your order has been placed!')
          dispatch(newOrder(order));
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const paymentData = {
    amount: orderAmount ? Math.round(orderAmount.totalamount * 100) : "Amount",
  };
  return (
    <div className="parent-payment">
      <MetaData title={"Payment"} />
      <Steps activeStep={2} />

      <form className="pay-form" onSubmit={placeorder}>
        <Typography className="cardinfo">Card Info</Typography>
        <div>
          <CreditCardIcon />
          <CardNumberElement className="paymentInput" />
        </div>

        <div>
          <EventIcon />
          <CardExpiryElement className="paymentInput" />
        </div>

        <div>
          <VpnKeyIcon />
          <CardCvcElement className="paymentInput" />
        </div>
        <button
          ref={paymentbutton}
          type={"submit"}
        >{`Pay OMR ${paymentData.amount}`}</button>
      </form>
    </div>
  );
};

export default PaymentDetails;
