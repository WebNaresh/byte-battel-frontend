import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import MiniForm from "./mini-form";
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
const FoodCard = ({ doc }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["food-item-consumer"],
    });
    setOpen(false);
  };
  return (
    <Card variant="outlined" className="!shadow-lg p-4">
      <>
        <CardContent className="flex flex-col !gap-2 !p-3">
          <Typography
            variant="h5"
            component="div"
            className="flex justify-between"
          >
            <div>{doc?.name}</div>
            <div className=" text-sm">
              expires after &nbsp;
              {Math.ceil(
                (new Date(doc?.shelfLife) - new Date()) / (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </div>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
                  className="!text-white"
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
        <CardActions>
          <Button
            onClick={handleOpen}
            size="small"
            className="!text-white"
            variant="contained"
          >
            Apply for Food
          </Button>
        </CardActions>
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
            <Box
              sx={style}
              className="!rounded-lg h-auto overflow-y-auto flex flex-col"
            >
              <MiniForm id={doc._id} handleClose={handleClose} />
            </Box>
          </Fade>
        </Modal>
      </>
    </Card>
  );
};

export default FoodCard;
