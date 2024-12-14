import React from "react";

const Middlewares = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl text-white font-bold">Middlewares</h1>
      <p className="text-sm text-sh-2 font-normal">
        Define and manage all your models all in one place
      </p>
      <div className="mt-5 flex w-full">
        <button className="bg-middleware-purple rounded text-white font-normal px-4 py-1.5">
          New Middleware
        </button>
      </div>
    </div>
  );
};

export default Middlewares;
