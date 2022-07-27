import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "./Featured";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_KEY from "../keys";

const Landing = () => {
  const [search, setSearch] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [background, setBackground] = React.useState("");
  const navigate = useNavigate();

  const dataFetch = (search, e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* DYNAMIC BACKGROUND FETCHED FROM UNSPLASH */
  async function fetchBackground() {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/random?&query=landscape&orientation=landscape&client_id=${API_KEY}`
    );
    setBackground(data.urls.full);
    setAuthor(data.user);
    console.log(data.user);
  }

  /* PASTE THIS IN INLINE-STYLE OF HEADER */
  // `url(${background})`

  React.useEffect(() => {
    fetchBackground();
  }, []);

  return (
    <header id="landing" style={{ backgroundImage: `url(${background})` }}>
      <div className="header__container">
        <div className="header__description">
          <p className="header__para">
            Your <b>favorite</b> source for posters on the Internet,
          </p>
          <form
            onSubmit={(e) => dataFetch(search, e)}
            className="header__search--wrapper"
          >
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="header__search"
              placeholder="Search for your new poster here"
              required
            />
            <button type="submit" className="header__search--btn">
              <FontAwesomeIcon icon="fa-magnifying-glass" />
            </button>
          </form>
          <p className="header__para">
            Start browsing <span>now!</span>
          </p>
        </div>
      </div>
      {author && (
        <span className="header__img--author">
          Photo by{" "}
          <a href={author.links.html} target="_blank">
            {author.name || "X"}
          </a>
        </span>
      )}
    </header>
  );
};

export default Landing;
