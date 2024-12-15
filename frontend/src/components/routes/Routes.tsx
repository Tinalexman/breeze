import React from "react";
import { IoIosAdd } from "react-icons/io";

const Routes = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl text-white font-bold">Routes</h1>
      <p className="text-sm text-sh-2 font-normal">
        Define and manage all your routes all in one place
      </p>
      <div className="mt-5 flex w-full justify-between">
        <button className="bg-route-yellow rounded text-monokai text-sm items-center font-normal px-4 py-1.5 flex gap-1">
          <IoIosAdd className="text-xl" />
          New Route
        </button>
      </div>
    </div>
  );
};

export default Routes;
