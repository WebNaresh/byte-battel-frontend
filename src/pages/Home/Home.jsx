import React from "react";
import HomeCard from "./components/Card";
import { AppCarousel } from "./components/Carousel";
import Tagline from "./components/Tagline";

const Home = () => {
  return (
    <div>
      <AppCarousel />
      <HomeCard />
      <Tagline />
    </div>
  );
};

export default Home;
