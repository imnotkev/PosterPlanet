import React, { useContext } from "react";
import API_KEY from "../keys";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Price from "../components/ui/Price";
import Size from "../components/ui/Size";
import CartContext from "../CartContext";

const Poster = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { items } = useContext(CartContext);
  const [poster, setPoster] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  function posterInCart() {
    return items.find((poster) => poster.id === id);
  }

  async function fetchPoster() {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/${id}?&client_id=${API_KEY}`
    );
    setTimeout(() => {
      setPoster(data);
      setLoading(false);
    }, 150);
  }

  React.useEffect(() => {
    fetchPoster();
  }, []);

  return (
    <section id="poster">
      <div className="container">
        <div className="row">
          <div className="section__header section__header--poster">
            <div className="poster__return" onClick={() => navigate(-1)}>
              <FontAwesomeIcon
                icon="arrow-left"
                className="poster__return--icon"
              />
              <h2 className="poster__selected--title--top">Back</h2>
            </div>
          </div>
          <div className="poster-row">
            {loading ? (
              <div className="poster__container">
                <div className="poster__img--wrapper">
                  <div className="poster__img--skeleton skeleton"></div>
                </div>
                <div className="poster__desc">
                  <div className="poster__title--skeleton skeleton"></div>
                  <div className="poster__price--skeleton skeleton"></div>
                  <div className="poster__btn--skeleton skeleton"></div>
                  <div className="poster__para--skeleton skeleton"></div>
                  <div className="poster__user--skeleton skeleton"></div>
                </div>
              </div>
            ) : (
              <div className="poster__container">
                <figure className="poster__img--wrapper">
                  <img src={poster.urls.regular} className="poster__img" />
                </figure>
                <div className="poster__desc">
                  <h3 className="poster__title">
                    {poster.description && poster.description.length > 50
                      ? poster.alt_description
                      : poster.description ||
                        poster.alt_description ||
                        "Unnamed Art"}
                  </h3>
                  <h4 className="poster__price">
                    <Price height={poster.height} width={poster.width} />{" "}
                  </h4>
                  <h4 className="poster__size">
                    Size: <Size height={poster.height} width={poster.width} />
                  </h4>
                  {posterInCart() ? (
                    <button
                      onClick={() => navigate("/cart")}
                      className="poster__btn"
                    >
                      CHECKOUT
                      <FontAwesomeIcon
                        icon="shopping-cart"
                        className="poster__btn--icon"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        addToCart(
                          poster.id,
                          poster.description,
                          poster.alt_description,
                          poster.height,
                          poster.width,
                          poster.urls.regular,
                          poster.user.name
                        )
                      }
                      className="poster__btn"
                    >
                      ADD TO
                      <FontAwesomeIcon
                        icon="basket-shopping"
                        className="poster__btn--icon"
                      />
                    </button>
                  )}

                  <p className="poster__para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Recusandae rem autem perferendis neque fuga necessitatibus
                    nobis nulla qui error vel.
                  </p>
                  <p className="poster__para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Neque quia accusamus cum itaque laboriosam eveniet, quisquam
                    laborum unde dolor laudantium recusandae aliquid sit cumque
                    ipsa delectus consequatur enim eos necessitatibus.
                  </p>
                  <a
                    href={poster.user.links.html}
                    target="_blank"
                    className="poster__user"
                  >
                    <figure className="user__img--wrapper">
                      <img
                        src={poster.user.profile_image.medium}
                        className="user__img"
                      />
                    </figure>
                    <div className="user__info">
                      <p className="user__info--name">{poster.user.name}</p>
                      <p className="user__info--origin">
                        {poster.user.location}
                      </p>
                    </div>
                    <FontAwesomeIcon icon="link" className="user__info--link" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Poster;
