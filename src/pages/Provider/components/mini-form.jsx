import { zodResolver } from "@hookform/resolvers/zod";
import {
  AccessTimeOutlined,
  DriveFileRenameOutlineSharp,
  InfoOutlined,
  PeopleOutline,
  TimerOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthInputFiled from "../../../global/components/inpufield";
import useAppCookies from "../../../hooks/useAppCookies";
import useAppState from "../../../hooks/useAppState";

const MiniForm = ({ handleClose }) => {
  const { cookies } = useAppCookies();
  const { setUser, user } = useAppState();
  const queryClient = useQueryClient();
  console.log(`🚀 ~ file: mini-form.jsx:25 ~ queryClient:`, queryClient);
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string(),
    serving_size: z.string(),
    description: z.string(),
    dateOfCreation: z.string(),
    shelfLife: z.string(),
    items: z.any(),
  });
  const { formState, control, getValues, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      serving_size: undefined,
      description: undefined,
      dateOfCreation: undefined,
      shelfLife: undefined,
      items: [],
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
      `${import.meta.env.VITE_APP_BACKEND}/route/create-food-item`,
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
      await queryClient.invalidateQueries({
        queryKey: [`food-item-provider`],
      });
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="font-bold">
        Add <span className=" text-primary"> Food Details </span>
      </div>
      <AuthInputFiled
        name="name"
        icon={DriveFileRenameOutlineSharp}
        control={control}
        type="text"
        placeholder="Rice Plate"
        label="Add food Name *"
        errors={errors}
        error={errors.name}
      />
      <AuthInputFiled
        name="serving_size"
        icon={PeopleOutline}
        control={control}
        type="number"
        placeholder="eg 4"
        label="Enter how many people can be served *"
        errors={errors}
        error={errors.serving_size}
      />
      <AuthInputFiled
        name="description"
        icon={InfoOutlined}
        control={control}
        type="text"
        placeholder="eg recently cooked"
        label="Enter Description*"
        errors={errors}
        error={errors.description}
      />
      <AuthInputFiled
        name="dateOfCreation"
        icon={AccessTimeOutlined}
        control={control}
        type="date"
        placeholder="Enter date of cooking"
        label="Enter date of cooking*"
        errors={errors}
        error={errors.dateOfCreation}
      />
      <AuthInputFiled
        name="shelfLife"
        icon={TimerOutlined}
        control={control}
        type="number"
        placeholder="eg. 2"
        label="Enter how many days the food be shelfed*"
        errors={errors}
        error={errors.shelfLife}
      />
      <AuthInputFiled
        name="items"
        control={control}
        type="autocomplete"
        placeholder="eg. Chapati, Bhaji"
        label="Item name*"
        errors={errors}
        error={errors.items}
      />

      <Button variant="contained" type="submit" className="flex mx-auto">
        Submit
      </Button>
    </form>
  );
};

export default MiniForm;
