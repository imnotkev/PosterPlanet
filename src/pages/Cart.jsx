import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import CartContext from "../CartContext";
import Price from "../components/ui/Price";
import Size from "../components/ui/Size";
import EmptyCart from "../assets/undraw_empty_street_re_atjq.svg";
import useDocumentTitle from "../components/ui/dynamic-title";

const Cart = () => {
  useDocumentTitle("PosterPlanet > Cart");

  const { removeFromCart, items } = React.useContext(CartContext);
  const navigate = useNavigate();

  const total = () => {
    let price = 0;
    items.forEach((poster) => {
      price += +(Math.round((poster.height + poster.width) / 300) + 0.99);
    });
    return price;
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="Cart">
      <div className="container">
        <div className="row">
          <div className="section__header">
            <h2 className="section__title">
              Your shopping-cart {items.length === 0 && "is empty!"}
            </h2>
          </div>
          <div className="cart">
            <div className="cart__header">
              <span className="cart__poster">Poster(s)</span>
              <span className="cart__size">Size</span>
              <span className="cart__total">Price</span>
            </div>
            <div className="cart__body">
              {items.length === 0 && (
                <div
                  className="results__empty cart__empty"
                  onClick={() => navigate("/")}
                >
                  <h3 className="section__title empty__title">
                    Your shopping-cart is empty!
                  </h3>
                  <figure className="empty__img--figure">
                    <img src={EmptyCart} className="empty__img" />
                  </figure>
                  <h3 className="section__title empty__title">
                    Click here to go back to start!
                  </h3>
                </div>
              )}
              {items.map((poster) => {
                return (
                  <div className="cart__item" key={poster.id}>
                    <div className="cart__poster">
                      <figure
                        className="cart__poster--img--wrapper"
                        onClick={() => navigate(`/poster/${poster.id}`)}
                      >
                        <img
                          src={poster.url}
                          alt=""
                          className="cart__poster--img"
                        />
                      </figure>
                      <div className="cart__poster--info">
                        <span className="cart__poster--title">
                          {poster.title && poster.title.length > 50
                            ? poster.altTitle
                            : poster.title || poster.altTitle || "Unnamed Art"}
                        </span>
                        <p className="result__credit">{poster.user}</p>
                        <button
                          onClick={() => removeFromCart(poster.id)}
                          className="cart__poster--remove remove--desktop"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => removeFromCart(poster.id)}
                          className="cart__poster--remove remove--mobile"
                        >
                          <FontAwesomeIcon icon="xmark" />
                        </button>
                      </div>
                    </div>
                    <div className="cart__size">
                      <span className="cart__poster--size">
                        <Size height={poster.height} width={poster.width} />
                      </span>
                    </div>
                    <div className="cart__total">
                      <Price height={poster.height} width={poster.width} />
                    </div>
                  </div>
                );
              })}
            </div>
            {items.length > 0 && (
              <>
                <div className="cart__footer">
                  <span className="cart__poster">Amount ({items.length})</span>
                  <span className="cart__size"></span>
                  <span className="cart__total">${total().toFixed(2)}</span>
                </div>
                <div className="checkout__btn--wrapper">
                  <button
                    className="checkout__btn"
                    onClick={() => alert("Thanks for testing my site!:-)")}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
