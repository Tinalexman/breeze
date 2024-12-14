import React from "react";
import { IoIosAdd } from "react-icons/io";

const Models = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl text-white font-bold">Models</h1>
      <p className="text-sm text-sh-3 font-normal">
        Define and manage all your models all in one place
      </p>
      <div className="mt-5 flex w-full justify-between">
        <input
          type="text"
          placeholder="Search model"
          className="placeholder:text-sh-2"
        />
        <button className="bg-model-green rounded text-white text-sm items-center font-normal px-4 py-1.5 flex gap-1">
          <IoIosAdd className="text-xl" />
          New Model
        </button>
      </div>
    </div>
  );
};

export default Models;
