import React from "react";

const Routes = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl text-white font-bold">Routes</h1>
      <p className="text-sm text-sh-2 font-normal">
        Define and manage all your routes all in one place
      </p>
      <div className="mt-5 flex w-full">
        <button className="bg-route-yellow rounded text-monokai font-normal px-4 py-1.5">
          New Route
        </button>
      </div>
    </div>
  );
};

export default Routes;
