import React from "react";

const Models = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl text-white font-bold">Models</h1>
      <p className="text-sm text-sh-2 font-normal">
        Define and manage all your models all in one place
      </p>
      <div className="mt-5 flex w-full">
        <button className="bg-model-green rounded text-white font-normal px-4 py-1.5">
          New Model
        </button>
      </div>
    </div>
  );
};

export default Models;
