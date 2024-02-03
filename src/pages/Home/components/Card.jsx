import { Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../../../utils/Loader/page";

const HomeCard = () => {
  const getMonthData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/route/get-month-foodItem`,
      config
    );
    return data.data;
  };
  const { data, isFetching } = useQuery({
    queryKey: ["food-item-consumer"],
    queryFn: getMonthData,
  });
  const getWeekData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/route/get-week-foodItem`,
      config
    );
    return data.data;
  };
  const { data: data2, isFetching: isFetching2 } = useQuery({
    queryKey: ["food-item-consumer"],
    queryFn: getWeekData,
  });
  console.log(data2, "data");
  if (isFetching) {
    return <Loader />;
  }
  if (isFetching2) {
    return <Loader />;
  }
  return (
    <div className="px-8 flex flex-col gap-8">
      <div className="font-bold">
        Welcome to <span className=" text-primary"> सहाय्य भोजन </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card sx={{ minWidth: 275 }} className="!bg-primary !text-white">
          <CardContent className="!gap-4 flex flex-col">
            <Typography
              sx={{ fontSize: 14 }}
              gutterBottom
              className="!text-white !font-bold !text-xl"
            >
              Current month Donation
            </Typography>

            <Typography variant="body2">{data?.totalQuantity}</Typography>
          </CardContent>
        </Card>
        <Card className="!bg-primary !text-white">
          <CardContent className="!gap-4 flex flex-col">
            <Typography
              className="!text-white !font-bold !text-xl"
              gutterBottom
            >
              Current week Donation
            </Typography>

            <Typography variant="body2">{data2?.totalQuantity}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeCard;
