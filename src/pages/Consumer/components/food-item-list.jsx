import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppCookies from "../../../hooks/useAppCookies";
import useAppState from "../../../hooks/useAppState";
import Loader from "../../../utils/Loader/page";
import FoodCard from "./Card";

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
      `${import.meta.env.VITE_APP_BACKEND}/route/get-food-item-global`,
      config
    );
    return data.data;
  };
  const { data, isFetching } = useQuery({
    queryKey: ["food-item-consumer"],
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
        return <FoodCard key={i} doc={doc} />;
      })}
    </div>
  );
};

export default FoodList;
