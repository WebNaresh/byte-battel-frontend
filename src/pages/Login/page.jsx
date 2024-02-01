import React from "react";
import { TextField } from "@mui/material";
const Login = () => {
  return (
    <body className="m-25 p-25 border border-solid border-red-500 flex mx-20 mt-10">
      <div className="left-container flex flex-col  w-1/2 m-10">
        {/* <div className="left-container-image "> */}
        <img src="./public/loginImage.svg" className="w-300 h-300"></img>
        {/* </div> */}
        <div>
          <h3 className="flex items-center justify-center text-orange-500 underline font-extrabold">
            Join the plate saver movement
          </h3>
          <h2 className="flex items-center justify-center text-orange-500 u ">
            Stop waste, Start Taste
          </h2>
        </div>
      </div>
     
      <div className="right-container flex flex-col  justify-center w-1/2  border-l-2 my-20 px-5 border-orange-500">
        <div className="mb-3">
          Welcome to{" "}
          <span className="text-orange-500 font-extrabold mb-3">
            Sahayy-Bhojan
          </span>
        </div>

        <input
          type="email"
          placeholder="email"
          className=" p-1 border border-orange-500 mb-3 rounded-md mr-5 ml-2"
        />
        <input
          type="passward"
          placeholder="passward"
          className="p-1 border border-orange-500 rounded-md mr-5 ml-2"
        />

        <button className="mt-3 pd-2 bg-orange-500 w-20 text-white rounded-full ">
          Sign Up
        </button>
      </div>
    </body>
  );
};

export default Login;
