import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import API_KEY from "../keys";
import Price from "../components/ui/Price";
import Size from "../components/ui/Size";
import noResults from "../assets/undraw_no_data_re_kwbl.svg";
import CartContext from "../CartContext";
import Aos from "aos";
import "aos/dist/aos.css";
import useDocumentTitle from "../components/ui/dynamic-title";

const Search = () => {
  useDocumentTitle("PosterPlanet > Search");

  const { term } = useParams();
  const { addToCart, items, removeFromCart } = useContext(CartContext);
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchId, setSearchId] = React.useState(term);
  const [liked, setLiked] = React.useState([]);
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    navigate(`/search/${searchId}`);
    setSearchId("");
  }

  function likePoster(id) {
    setLiked((prevState) => [...prevState, id]);
  }

  function removeLikePoster(id) {
    setLiked(liked.filter((e) => e !== id));
  }

  function posterLiked(id) {
    return liked.find((e) => e === id);
  }

  function posterInCart(id) {
    return items.find((poster) => poster.id === id);
  }

  function goToPoster(id) {
    navigate(`/poster/${id}`);
  }

  function filterPosters(filter) {
    if (filter === "LOW_TO_HIGH") {
      setResults(
        results
          .slice()
          .sort((a, b) => a.width + a.height - (b.height + b.width))
      );
    }
    if (filter === "HIGH_TO_LOW") {
      setResults(
        results
          .slice()
          .sort((a, b) => b.width + b.height - (a.height + a.width))
      );
    }
    if (filter === "POPULARITY") {
      setResults(results.slice().sort((a, b) => b.likes - a.likes));
    }
  }

  async function fetchResults() {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.unsplash.com/search/photos?&per_page=28&query=${term}&orientation=portrait&client_id=${API_KEY}`
    );
    setTimeout(() => {
      setResults(data.results);
      setLoading(false);
    }, 150);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchResults();
    Aos.init({ duration: 400, once: true });
  }, [term]);

  return (
    <section id="search">
      <div className="container">
        <div className="row">
          <div className="section__header">
            <div className="section__title--content">
              <h2 className="section__title section__title--search-page">
                Search results for: <span>{term}</span>
              </h2>
              <h4 className="search-page__results">{results.length} Results</h4>
            </div>
            <div className="section__header--filters">
              <form
                className="search-page__search--wrapper search--mobile"
                onSubmit={(e) => onSearch(e)}
              >
                <input
                  type="text"
                  onChange={(e) => setSearchId(e.target.value)}
                  className="search-page__search"
                  placeholder="Search"
                  required
                  value={searchId}
                />
                <button type="submit" className="search-page__search--btn">
                  <FontAwesomeIcon icon="fa-magnifying-glass" />
                </button>
              </form>
              <select
                id="filter"
                className="search-page__filter"
                defaultValue="DEFAULT"
                onChange={(event) => filterPosters(event.target.value)}
              >
                <option value="DEFAULT" disabled>
                  Sort
                </option>
                <option value="POPULARITY">Popularity</option>
                <option value="LOW_TO_HIGH">Price, ascending</option>
                <option value="HIGH_TO_LOW">Price, descending</option>
              </select>
            </div>
          </div>
          <div className="results__container">
            {loading === false && results.length === 0 && (
              <div className="results__empty">
                <figure className="empty__img--figure">
                  <img src={noResults} className="empty__img" />
                </figure>
                <h3 className="section__title empty__title">
                  No results found for: <span>{term}</span>
                </h3>
              </div>
            )}
            {loading
              ? new Array(20).fill(0).map((_, index) => (
                  <div className="result__skeleton" key={index}>
                    <div className="skeleton result__img--skeleton"></div>
                    <div className="skeleton result__credit--skeleton"></div>
                    <div className="skeleton result__title--skeleton"></div>
                    <div className="skeleton result__para--skeleton"></div>
                  </div>
                ))
              : results.map((poster) => (
                  <div className="result" key={poster.id} data-aos="fade-up">
                    <figure
                      className="result__img--wrapper"
                      onClick={() => goToPoster(poster.id)}
                    >
                      <img src={poster.urls.small} className="result__img" />
                    </figure>
                    <div className="result__desc">
                      <div
                        className="result__desc--left"
                        onClick={() => goToPoster(poster.id)}
                      >
                        <p className="result__credit">{poster.user.name}</p>
                        <h3 className="result__title">
                          {poster.description && poster.description.length > 50
                            ? poster.alt_description
                            : poster.description ||
                              poster.alt_description ||
                              term}
                        </h3>
                        <span className="result__info">
                          <Price height={poster.height} width={poster.width} />
                          <Size height={poster.height} width={poster.width} />
                        </span>
                      </div>
                      <div className="result__desc--right">
                        {posterInCart(poster.id) ? (
                          <>
                            <button
                              onClick={() => removeFromCart(poster.id)}
                              className="result__btn result__add-to-cart"
                            >
                              <FontAwesomeIcon
                                className="result__desc--icon"
                                icon="xmark"
                              />
                            </button>
                            <button
                              onClick={() => navigate("/cart")}
                              className="result__btn result__add-to-cart"
                            >
                              <FontAwesomeIcon
                                className="result__desc--icon"
                                icon="shopping-basket"
                              />
                            </button>
                          </>
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
                            className="result__btn result__add-to-cart"
                          >
                            <FontAwesomeIcon
                              className="result__desc--icon"
                              icon="plus"
                            />
                          </button>
                        )}
                        {posterLiked(poster.id) ? (
                          <button
                            style={{ color: "#F2668B" }}
                            onClick={() => removeLikePoster(poster.id)}
                            className="result__btn result__favorites"
                          >
                            <FontAwesomeIcon
                              className="result__desc--icon"
                              icon="heart"
                            />
                            <span className="favorite__count">
                              {poster.likes + 1}
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={() => likePoster(poster.id)}
                            className="result__btn result__favorites"
                          >
                            <FontAwesomeIcon
                              className="result__desc--icon"
                              icon="heart"
                            />
                            <span className="favorite__count">
                              {poster.likes}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <form
            className="search-page__search--wrapper search--desktop"
            onSubmit={(e) => onSearch(e)}
          >
            <input
              type="text"
              onChange={(e) => setSearchId(e.target.value)}
              className="search-page__search"
              placeholder="Search"
              required
              value={searchId}
            />
            <button type="submit" className="search-page__search--btn">
              <FontAwesomeIcon icon="fa-magnifying-glass" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Search;
