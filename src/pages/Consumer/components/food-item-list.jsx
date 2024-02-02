import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppCookies from "../../../hooks/useAppCookies";
import useAppState from "../../../hooks/useAppState";
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
  const { data } = useQuery({
    queryKey: ["food-item-consumer"],
    queryFn: fetchFormDetails,
  });
  if (user === null) {
    return navigate("/login");
  }
  console.log(`🚀 ~ file: food-item-list.jsx:41 ~ data:`, data);
  return (
    <div className=" flex flex-col gap-4">
      {data?.foodItems.map((doc) => {
        return <FoodCard doc={doc} />;
      })}
    </div>
  );
};

export default FoodList;
