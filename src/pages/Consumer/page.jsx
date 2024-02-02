import React from "react";
import { useNavigate } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import FoodList from "./components/food-item-list";
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

const Consumer = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useAppState();
  if (user === null) {
    return navigate("/login");
  }
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="">
        Welcome to{" "}
        <span className=" text-primary font-bold"> सहाय्य भोजन </span>
        {user?.name}
      </div>
      <FoodList />
    </div>
  );
};

export default Consumer;
