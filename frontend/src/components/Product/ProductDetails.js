import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  createReview,
  getProductDetail,
} from "../../actions/productActions";
import { useSearchParams, useLocation } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { Rating } from "@material-ui/lab";
import MetaData from "../layout/MetaData";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { addToCart, removefromcart } from "../../actions/cartActions";

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const alert = useAlert();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const { error, product, loading } = useSelector(
    (state) => state.productDetail
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.createReviews
  );

  const cartadded = useRef();
  let cartItem;

  const addtocart = () => {
    cartItem = {
      product: product._id,
      name: product.name,
      image: product.images[0].image_url,
      price: product.price,
      quantity,
    };

    if (cartadded.current.textContent === "Add to Cart") {
      dispatch(addToCart(product._id, quantity));
      cartadded.current.textContent = "Remove from Cart";
      return;
    }

    if (cartadded.current.textContent === "Remove from Cart") {
      dispatch(removefromcart(cartItem));
      cartadded.current.textContent = "Add to Cart";
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success(success);
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetail(id));
  }, [dispatch, error, success, reviewError]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    setQuantity((val) => val + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    setQuantity((val) => val - 1);
  };

  const submitReview = () => {
    const form = {
      rating,
      comment,
      productID: id,
    };

    dispatch(createReview(form));

    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Product"} />
          <div className="main">
            <div className="firstpartmain">
              <div>
                {product.images && (
                  <img
                    src={product.images[0].image_url}
                    alt="no image"
                    className="proImage"
                  />
                )}

                {/* {console.log(product.images.image_url)} */}
                {/* <Carousel>
              {product.images && product.images.map((item, i) => <img key={i} src={item.image_url} alt="bag image" />)}
            </Carousel> */}
              </div>

              <div className="details">
                <h2>{product.name}</h2>
                <p className="id">Product # {product._id}</p>
                <hr className="margin-0"></hr>
                <Rating {...options} />
                <hr></hr>
                <h1 className="price">OMR {product.price}</h1>
                <div className="details-part-2">
                  <div className="quantityselector">
                    <button className="quantity" onClick={increaseQuantity}>
                      +
                    </button>
                    <p>{quantity}</p>
                    <button className="quantity" onClick={decreaseQuantity}>
                      -
                    </button>
                  </div>
                  <button
                    onClick={addtocart}
                    disabled={product.stock < 1 ? true : false}
                    className="button"
                  >
                    <a ref={cartadded}>Add to Cart</a>
                  </button>
                </div>
                <hr></hr>
                <p>
                  Status:{" "}
                  <span
                    className={
                      product.stock < 1
                        ? "redColor status"
                        : "greenColor status"
                    }
                  >
                    {product.stock < 1 ? "OutofStock" : "InStock"}
                  </span>
                </p>
                <hr></hr>
                <div>
                  <h4>Description:</h4>
                  <p className="description">{product.description}</p>
                </div>
                <div className="button" onClick={() => setOpen(true)}>
                  <a>Submit Review</a>
                </div>
              </div>
            </div>

            <div className="review-section">
              <h2>Reviews</h2>
              <hr className="mid-hr" align="center"></hr>

              <Dialog
                open={open}
                aria-labelledby="simple-dialog-title"
                onClose={() => setOpen((val) => !val)}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    value={rating}
                    size={"large"}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <textarea
                    className="submitDialogTextArea"
                    rows={5}
                    cols={30}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReview} color="secondary">
                    Submit
                  </Button>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>

              <div className="reviewcards">
                {product.reviews &&
                  product.reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}

                {/* //No reviews yet */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
