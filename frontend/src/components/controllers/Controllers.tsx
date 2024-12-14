import React from "react";

const Controllers = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-4xl text-white font-bold">Controllers</h1>
      <p className="text-sm text-sh-2 font-normal">
        Define and manage all your controllers all in one place
      </p>
      <div className="mt-5 flex w-full">
        <button className="bg-controller-red rounded text-white font-normal px-4 py-1.5">
          New Controller
        </button>
      </div>
    </div>
  );
};

export default Controllers;
