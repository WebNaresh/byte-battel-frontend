import { zodResolver } from "@hookform/resolvers/zod";
import { PeopleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthInputFiled from "../../../global/components/inpufield";
import useAppCookies from "../../../hooks/useAppCookies";
import useAppState from "../../../hooks/useAppState";

const MiniForm = ({ handleClose, id }) => {
  const { cookies } = useAppCookies();
  const { setUser, user } = useAppState();

  const navigate = useNavigate();
  const formSchema = z.object({
    quantity: z.string(),
    time: z.date(),
  });
  const { formState, control, getValues, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: undefined,
      time: new Date(),
    },
  });
  const addFormItem = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies["app-cookie"],
      },
    };
    const result = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/route/get-food/${id}`,
      data,
      config
    );
    return result.data;
  };
  const { mutate } = useMutation({
    mutationFn: addFormItem,
    onSuccess: async (data) => {
      toast.success(data.message);

      handleClose();
    },
    onError: async (data) => {
      console.error(`🚀 ~ file: mini-form.jsx:48 ~ data:`, data);
      toast.error(
        data.response.data.message || "You are logged in successfully"
      );
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  const { errors } = formState;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="items-center flex flex-col"
    >
      <div className="font-bold">
        {" "}
        <span className=" text-primary">
          {" "}
          After this form NGO will contact you{" "}
        </span>
      </div>
      <AuthInputFiled
        name="quantity"
        icon={PeopleOutline}
        control={control}
        type="text"
        placeholder="eg 2"
        label="How many member food you want *"
        errors={errors}
        error={errors.quantity}
      />
      <Button variant="contained" type="submit" className="flex mx-auto">
        Submit
      </Button>
    </form>
  );
};

export default MiniForm;
