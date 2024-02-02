import React from "react";
import MiniForm from "./components/mini-form";
const Signup = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid w-[-webkit-fill-available] grid-cols-2 mt-4 m-8 mx-24 border-gray-300 border-[0.2px] rounded-md shadow-lg">
        <div className="flex justify-center flex-col p-8">
          <img src="/loginImage.svg" className="h-[300px]" />
          <div className="!text-center !text-primary">
            Sign-up to सहाय्य भोजन
          </div>
        </div>
        <div className="grid h-auto my-14 border-l-primary border-l px-4">
          <div className="font-bold">
            Welcome to <span className=" text-primary"> सहाय्य भोजन </span>
          </div>
          <MiniForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
