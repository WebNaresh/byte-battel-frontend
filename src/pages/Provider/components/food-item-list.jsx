import { Card, CardContent, Chip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppCookies from "../../../hooks/useAppCookies";
import useAppState from "../../../hooks/useAppState";
import Loader from "../../../utils/Loader/page";

const FoodList = () => {
  const { user } = useAppState();
  const { cookies } = useAppCookies();
  const navigate = useNavigate();
  const fetchFormDetails = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies["app-cookie"],
      },
    };
    let data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/route/get-food-item`,
      config
    );
    return data.data;
  };
  const { data, isFetching } = useQuery({
    queryKey: ["food-item-provider"],
    queryFn: fetchFormDetails,
  });
  if (user === null) {
    return navigate("/login");
  }
  if (isFetching) {
    return <Loader />;
  }
  return (
    <div className="gap-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {data?.foodItems.map((doc, i) => {
        return (
          <Card key={i} variant="outlined" className="shadow-lg">
            <>
              <CardContent className="flex flex-col !gap-2">
                <Typography
                  variant="h5"
                  component="div"
                  className="flex justify-between"
                >
                  <div>{doc?.name}</div>
                  <div className=" text-sm">
                    expires after &nbsp;
                    {Math.ceil(
                      (new Date(doc?.shelfLife) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </div>
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {" "}
                  Date of Creation:{" "}
                  {new Date(doc?.dateOfCreation)?.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {doc?.description}
                </Typography>
                <div className="flex gap-4">
                  {doc?.items?.map((doc2, i) => {
                    return (
                      <Chip
                        key={i}
                        label={doc2}
                        variant="contained"
                        color="primary"
                      />
                    );
                  })}
                </div>
                <div className="font-medium text-sm">
                  {doc?.serving_size} peoples can be served
                </div>
              </CardContent>
              {/* <CardActions></CardActions> */}
            </>
          </Card>
        );
      })}
    </div>
  );
};

export default FoodList;
