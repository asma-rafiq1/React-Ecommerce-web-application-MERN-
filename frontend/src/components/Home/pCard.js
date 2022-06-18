import React from "react";
import { Link } from "react-router-dom";

const PCard = ({ product }) => {
  return (
    <Link className="noyellow" to={`/product/?id=${product._id}`}>
      <div id="productCard">
        <img src={product.images[0].image_url} id="imgfirstproductline" />
        <p>{product.name}</p>
        <div className="price">
          <p>OMR {product.price}</p>
          {/* // <p>$290</p> */}
        </div>
      </div>
    </Link>
  );
};

export default PCard;
