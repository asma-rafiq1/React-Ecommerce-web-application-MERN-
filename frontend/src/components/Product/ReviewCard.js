import React from "react";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewcard">
      <img src="" className="reviewcard-img" />
      <h4>{review.name}</h4>
      <Rating {...options} />
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
