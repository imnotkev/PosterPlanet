import React from "react";
import Landing from "../components/Landing";
import Featured from "../components/Featured";
import useDocumentTitle from "../components/ui/dynamic-title";

const Home = () => {
  useDocumentTitle("PosterPlanet > Home");
  return (
    <>
      <Landing />
      <Featured />
    </>
  );
};

export default Home;
