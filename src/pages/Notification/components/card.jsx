import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const NotificationCard = ({ doc }) => {
  return (
    <Card variant="outlined" className="shadow-lg">
      <>
        <CardContent className="flex flex-col !gap-2">
          <Typography
            variant="h5"
            component="div"
            className="flex justify-between"
          >
            <div>You have order from {doc?.creator.name}</div>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {" "}
            Date order creation:{" "}
            {new Date(doc?.createdAt)?.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {" "}
            His Email Id is {doc?.creator?.email}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {" "}
            His Phone number {doc?.creator?.phoneNo}
          </Typography>
          <div className="font-medium text-sm">
            Person to be served is &nbsp;{doc?.quantity || 0}
          </div>
        </CardContent>
      </>
    </Card>
  );
};

export default NotificationCard;
