import React from "react";
import PosterPortalLogo from "../assets/poster-portal-logo.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const navigate = useNavigate();

  function notImplemented() {
    alert("This function is not implemented yet");
  }

  function goToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <a onClick={() => goToTop()} className="footer__logo--wrapper">
            <img src={PosterPortalLogo} alt="" className="footer__logo" />
            <h1 className="site-name">
              POSTER<span>PLANET</span>
            </h1>
            <div className="footer__go-up">
              <FontAwesomeIcon icon="fa-angle-up" /> TOP
            </div>
          </a>
          <div className="footer__list">
            <a onClick={() => navigate("/")} className="footer__link">
              Home
            </a>
            <span className="footer__link no-cursor" onClick={notImplemented}>
              About
            </span>
            <span className="footer__link no-cursor" onClick={notImplemented}>
              Policy
            </span>
            <span className="footer__link no-cursor" onClick={notImplemented}>
              Shipping
            </span>
            <span className="footer__link no-cursor" onClick={notImplemented}>
              Integrity
            </span>
            <span className="footer__link no-cursor" onClick={notImplemented}>
              FAQ
            </span>
            <a onClick={() => navigate("/cart")} className="footer__link">
              Cart
            </a>
          </div>
          <span className="footer__copyright">
            Made in Educational Purpose by{" "}
            <a href="https://imnotkev.com">Kevin Widing</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
