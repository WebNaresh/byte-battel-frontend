import { FoodBank } from "@mui/icons-material";
import { Backdrop, Box, Fab, Fade, Modal } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import FoodList from "./components/food-item-list";
import MiniForm from "./components/mini-form";
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

const Providers = () => {
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
      <Fab
        onClick={handleOpen}
        variant="extended"
        color="primary"
        className="!fixed bottom-8 right-8"
      >
        <FoodBank sx={{ mr: 1 }} />
        Supply Food
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="!rounded-lg h-[600px] overflow-y-auto">
            <MiniForm handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Providers;
