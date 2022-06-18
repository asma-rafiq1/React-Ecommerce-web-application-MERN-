import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removefromcart } from "../../actions/cartActions";
import { GiCrossMark } from "react-icons/gi";
import { FaBeer } from "react-icons/fa";
const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity) => {
    const newQty = quantity + 1;
    if (item.stock <= newQty) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const removeCartItem = () => {
    dispatch(removefromcart(item));
  };
  return (
    <div className="cartCardParent">
      <div className="cartItemImage">
        <img className="cartItemImage" src={item.image} />
      </div>
      <div className="cartDetails">
        <div className="pricecart">
          <p>OMR {item.price}</p>
          <GiCrossMark onClick={removeCartItem} size={20} />
        </div>
        <p>{item.name}</p>
        <div className="quantityselector">
          <button
            className="quantity"
            onClick={() => increaseQuantity(item.id, item.quantity)}
          >
            +
          </button>
          <p>{item.quantity}</p>
          <button
            className="quantity"
            onClick={() => decreaseQuantity(item.id, item.quantity)}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
