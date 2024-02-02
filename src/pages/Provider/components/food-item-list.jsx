import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppCookies from "../../../hooks/useAppCookies";
import useAppState from "../../../hooks/useAppState";

const FoodList = () => {
  const { user } = useAppState();
  const { cookies } = useAppCookies();
  const navigate = useNavigate();
  console.log(`🚀 ~ file: page.jsx:23 ~ user:`, user);
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
  const { data } = useQuery({
    queryKey: ["food-item"],
    queryFn: fetchFormDetails,
  });
  if (user === null) {
    return navigate("/login");
  }
  console.log(`🚀 ~ file: page.jsx:44 ~ data:`, data);
  return <div>FoodList</div>;
};

export default FoodList;
