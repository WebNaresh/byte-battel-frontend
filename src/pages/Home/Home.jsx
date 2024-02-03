import React from "react";
import HomeCard from "./components/Card";
import { AppCarousel } from "./components/Carousel";

const Home = () => {
  return (
    <div>
      <AppCarousel />
      <HomeCard />
      Home
    </div>
  );
};

export default Home;
