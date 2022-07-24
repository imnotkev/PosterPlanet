import React from "react";

const Size = ({ height, width }) => {
  return (
    <span className="result__size">
      {Math.round(height / 70)}x{Math.round(width / 70)} cm
    </span>
  );
};

export default Size;
