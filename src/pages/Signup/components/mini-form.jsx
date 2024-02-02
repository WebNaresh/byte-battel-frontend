import { zodResolver } from "@hookform/resolvers/zod";
import { Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthInputFiled from "../../../global/components/inpufield";
import Loader from "../../../utils/Loader/page";

const MiniForm = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(4, { message: "Password is minimum of 4 length" }),
    phoneNo: z
      .string()
      .min(10, { message: "phone is minimum of 10 length" })
      .max(10, { message: "phone is minimum of 10 length" }),
    type: z.enum(["Provider", "Consumer"]),
    address: z.string(),
  });
  console.log(`🚀 ~ file: mini-form.jsx:27 ~ formSchema:`, formSchema);
  const { formState, control, getValues, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      phoneNo: undefined,
      type: undefined,
      address: undefined,
      email: undefined,
      password: undefined,
    },
  });

  const signupFunction = async (data) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const result = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/route/register`,
      data,
      config
    );
    return result.data;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: signupFunction,
    onSuccess: async (data) => {
      toast.success("You are Signup Successfully now you can login");
      navigate("/login");
    },
    onError: async (data) => {
      console.error(`🚀 ~  file: mini-form.jsx:48 ~ data:`, data);

      toast.error(
        data?.response?.data?.message ||
          data?.response?.data?.error ||
          "Something went wrong"
      );
    },
  });
  if (isPending) {
    return <Loader />;
  }
  const onSubmit = (data) => {
    mutate(data);
  };
  const { errors } = formState;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <AuthInputFiled
        name="name"
        icon={Person}
        control={control}
        type="text"
        placeholder="Your Name"
        label="Your Name *"
        errors={errors}
        error={errors.name}
      />
      <AuthInputFiled
        name="email"
        icon={Person}
        control={control}
        type="email"
        placeholder="Your Email"
        label="Your Email *"
        errors={errors}
        error={errors.email}
      />
      <AuthInputFiled
        name="phoneNo"
        icon={Person}
        control={control}
        type="number"
        placeholder="Your Phone Number"
        label="Your Phone Number *"
        errors={errors}
        error={errors.phoneNo}
      />
      <AuthInputFiled
        name="address"
        icon={Person}
        control={control}
        type="text"
        placeholder="Your address"
        label="Your address *"
        errors={errors}
        error={errors.address}
      />
      <AuthInputFiled
        name="password"
        icon={Person}
        control={control}
        type="password"
        placeholder="Your password"
        label="Your password *"
        errors={errors}
        error={errors.password}
      />
      <AuthInputFiled
        name="type"
        icon={Person}
        control={control}
        type="select"
        placeholder="Your type"
        label="Your type *"
        errors={errors}
        error={errors.type}
      />
      <Button variant="contained" type="submit" className="flex mx-auto">
        Submit
      </Button>
    </form>
  );
};

export default MiniForm;
