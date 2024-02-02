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
import useAppCookies from "../../../hooks/useAppCookies";
import useAppState from "../../../hooks/useAppState";
import Loader from "../../../utils/Loader/page";

const MiniForm = () => {
  const { setCookie } = useAppCookies();
  const { setUser } = useAppState();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(4, { message: "Password is minimum of 4 length" }),
  });
  const { formState, control, getValues, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const loginFunction = async (data) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const result = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/route/login`,
      data,
      config
    );
    return result.data;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: loginFunction,
    onSuccess: async (data) => {
      setCookie("app-cookie", data.token);
      setUser(data.user);
      toast.success("You are logged in successfully");
      if (data.user.type === "Provider") {
        navigate("/providers");
      } else {
        navigate("/consumers");
      }
    },
    onError: async (data) => {
      console.error(`🚀 ~ file: mini-form.jsx:48 ~ data:`, data);
      toast.error(
        data.response.data.message || "You are logged in successfully"
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
        name="password"
        icon={Person}
        control={control}
        type="password"
        placeholder="Your password"
        label="Your password *"
        errors={errors}
        error={errors.password}
      />
      <Button
        variant="contained"
        type="submit"
        className="flex mx-auto !text-white"
      >
        Submit
      </Button>
    </form>
  );
};

export default MiniForm;
