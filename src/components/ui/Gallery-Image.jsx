import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const GalleryImage = ({ url, text, id }) => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => navigate(`/search/${text}`)}
      className="gallery__img--wrapper"
      key={id}
    >
      <img src={url} alt="" className="gallery__img" loading="lazy" />
      {/* <span className="gallery__img--text">{text}</span> */}
    </a>
  );
};

export default GalleryImage;
