import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAppCookies from "../../hooks/useAppCookies";
import Loader from "../../utils/Loader/page";
import NotificationCard from "./components/card";

const NotificationConsumer = () => {
  const { cookies } = useAppCookies();
  const getNotification = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies["app-cookie"],
      },
    };
    let data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/route/get-notification-consumer`,
      config
    );
    return data.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["notifications-consumer"],
    queryFn: getNotification,
  });
  if (isLoading) {
    return <Loader />;
  }
  console.log(`🚀 ~ file: page.jsx:31 ~ data:`, data);
  return (
    <div className="p-8 flex flex-col gap-4">
      <span className=" text-primary">
        {" "}
        You have total {data?.approverNotification?.length} Entries{" "}
      </span>
      <div className="font-bold gap-4 grid grid-cols-2">
        {data?.approverNotification?.map((doc, i) => {
          return <NotificationCard key={i} doc={doc} />;
        })}
      </div>
    </div>
  );
};

export default NotificationConsumer;
