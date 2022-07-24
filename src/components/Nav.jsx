import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PosterPortalLogo from "../assets/poster-portal-logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../CartContext";

const Nav = () => {
  const [navbar, setNavbar] = useState(false);
  const [search, setSearch] = useState("");
  const { items } = useContext(CartContext);
  const ref = React.useRef(null);
  const navigate = useNavigate();

  const dataFetch = (search, e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  };

  function notImplemented() {
    alert("This function is not implemented yet");
  }

  function showCart() {
    console.log(items);
  }

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const changeBackground = () => {
    if (window.scrollY >= 110) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <nav className={navbar ? "nav-scrolling" : ""}>
      <div className="nav__container">
        <div className="nav__logo--wrapper" onClick={() => goHome()}>
          <img src={PosterPortalLogo} alt="" className="nav__logo" />
          <h1 className="site-name">
            POSTER<span>PLANET</span>
          </h1>
        </div>
        <form
          onSubmit={(e) => dataFetch(search, e)}
          className="nav__search--wrapper"
        >
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="nav__search"
            placeholder="Search for your new poster here"
            required
            ref={ref}
            value={search}
          />
          <button type="submit" className="nav__search--btn">
            <FontAwesomeIcon icon="fa-magnifying-glass" />
          </button>
        </form>
        <ul className="nav__links">
          <li className="nav__list nav__list--hidden">
            <a onClick={() => goHome()} className="nav__link">
              Home
            </a>
          </li>
          <li className="nav__list nav__list--hidden  nav__list--search">
            <a onClick={() => ref.current.focus()} className="nav__link">
              Search
            </a>
          </li>
          <li className="nav__list">
            <a onClick={() => navigate("/cart")} className="nav__icon">
              <FontAwesomeIcon icon="basket-shopping" />
              {items.length > 0 && (
                <span className="cart__length">{items.length}</span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
