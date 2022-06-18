import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_DETAILS,
} from "../constants/cartConstants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  const cartItem = {
    product: data.product._id,
    name: data.product.name,
    image: data.product.images[0].image_url,
    price: data.product.price,
    quantity,
  };

  dispatch({ type: ADD_TO_CART, payload: cartItem });

  localStorage.setItem(
    "cartProducts",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const removefromcart = (item) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: item });

  localStorage.setItem(
    "cartProducts",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const saveShippingDetails = (details) => async (dispatch, getState) => {
  dispatch({ type: SAVE_SHIPPING_DETAILS, payload: details });

  localStorage.setItem("shippingDetailsUser", JSON.stringify(details));
};
