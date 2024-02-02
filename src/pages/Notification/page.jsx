import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useAppCookies from "../../hooks/useAppCookies";
import NotificationCard from "./components/card";

const Notification = () => {
  const { cookies } = useAppCookies();
  const getNotification = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies["app-cookie"],
      },
    };
    let data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/route/get-notification`,
      config
    );
    return data.data;
  };
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotification,
  });
  console.log(`🚀 ~ file: page.jsx:26 ~ data:`, data);
  return (
    <div className="p-8 ">
      <div className="font-bold flex-col gap-4 flex">
        <span className=" text-primary">
          {" "}
          You have {data?.notification?.length} Notification{" "}
        </span>
        {data?.notification?.map((doc, i) => {
          return <NotificationCard key={i} doc={doc} />;
        })}
      </div>
    </div>
  );
};

export default Notification;
