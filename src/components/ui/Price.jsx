import React from "react";

const Price = ({ height, width }) => {
  return (
    <span className="result__price">
      ${Math.round((height + width) / 300)}.99
    </span>
  );
};

export default Price;
