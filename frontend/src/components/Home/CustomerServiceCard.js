import React from "react";
import "./Home.css";

const CustomerServiceCard = ({ des, title, icon }) => {
  return (
    <div className="custSupp">
      <div className="custSuppIcon">{icon}</div>
      <div className="custSuppDetails">
        <p>{title}</p>
        <p>{des}</p>
      </div>
    </div>
  );
};

export default CustomerServiceCard;
