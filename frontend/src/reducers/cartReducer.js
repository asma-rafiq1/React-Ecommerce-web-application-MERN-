import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_DETAILS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const itemFound = state.cartItems.find((i) => i.product === item.product);

      if (itemFound) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === item.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.product !== action.payload.product
        ),
      };

    case SAVE_SHIPPING_DETAILS:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
