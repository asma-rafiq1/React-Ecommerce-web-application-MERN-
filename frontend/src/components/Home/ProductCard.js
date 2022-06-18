import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
import "./Home.css";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    // readOnly: true,
    // precision: 0.5,
    edit: false,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
  };
  return (
    <>
      <Link className="productCard" to={`/product?id=${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options} />
          <span className="productCardSpan">
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </>
  );
};

export default ProductCard;
