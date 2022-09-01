import React from "react";
import GalleryImage from "./ui/Gallery-Image";
import FEATURED_DATA from "./ui/Featured-Data";

const Featured = () => {
  const data = FEATURED_DATA;

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    shuffle(data);
  }, []);

  return (
    <section id="featured">
      <div className="container">
        <div className="row">
          <div className="section__header">
            <h2 className="section__title section__title--featured">
              Looking for Inspiration?
              <br />
              <span>
                Browse by images featured by: <br />
                The <b>POSTER</b>PLANET-team
              </span>
            </h2>
          </div>
          <div className="img__gallery">
            {data.map((featured) => (
              <GalleryImage
                url={featured.url}
                text={featured.text}
                key={featured.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
