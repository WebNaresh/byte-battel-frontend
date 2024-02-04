import { Button, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

export function AppCarousel(props) {
  var items = [
    {
      description: "We are just  सहाय्य भोजन",
      url: "/child-one.png",
    },
    {
      description: "Lets Start the Movement",
      url: "/child-two.png",
    },
  ];

  return (
    <Carousel cycleNavigation={true}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <div
        style={{
          background: `url(${props.item.url})`,
          height: 600,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div className="top-1/2 absolute ml-16 flex flex-col gap-8">
          <p className="px-2 text-2xl text-primary">{props.item.description}</p>

          <Link to={"/signup"}>
            {" "}
            <Button
              variant="contained"
              className="!rounded-full !p-2 !px-4 !text-white w-fit bg-primary"
            >
              Donate now!
            </Button>
          </Link>
        </div>
      </div>
    </Paper>
  );
}
