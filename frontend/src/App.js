import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import webfont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import { Elements } from "@stripe/react-stripe-js";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import LoginSignup from "./components/User/LoginSignup";
import ShippingDetails from "./components/Checkout/ShippingDetails";
import CartPage from "./components/Cart/CartPage";
import OrderDetails from "./components/Checkout/OrderDetails";
import PaymentDetails from "./components/Checkout/PaymentDetails";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { loadUser } from "./actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import SearchItem from "./components/Home/Search";

function App() {
  const [stripeApiKey, setstripeApiKey] = React.useState();
  const { isAuthenticated, userd } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripekey");

    setstripeApiKey(data.key);
  };

  const checkuser = (component) => {
    if (!isAuthenticated) {
      return <LoginSignup />;
    }
    return component;
  };
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans"],
      },
    });
    dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              exact
              path="/payment"
              element={checkuser(<PaymentDetails />)}
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/search" element={<SearchItem />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route
          exact
          path="/shipping"
          element={checkuser(<ShippingDetails />)}
        />
        <Route exact path="/cart" element={<CartPage />} />
        <Route
          exact
          path="/confirmorder"
          element={checkuser(<OrderDetails />)}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
