import React from "react";
import PosterPortalLogo from "../assets/poster-portal-logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  function notImplemented() {
    alert("This function is not implemented yet");
  }

  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <a href="#" className="footer__logo--wrapper">
            <img src={PosterPortalLogo} alt="" className="footer__logo" />
            <h1 className="site-name">
              POSTER<span>PLANET</span>
            </h1>
          </a>
          <div className="footer__list">
            <a onClick={() => navigate("/")} className="footer__link">
              Home
            </a>
            <span className="footer__link no-cursor" onClick={notImplemented}>
              About
            </span>
            <a onClick={() => navigate("/cart")} className="footer__link">
              Cart
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
