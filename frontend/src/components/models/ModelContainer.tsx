import React, { FC } from "react";
import { model } from "../../../wailsjs/go/models";

const ModelContainer: FC<{ model: model.Model }> = ({ model }) => {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-white">Name: {model.name}</h2>
    </div>
  );
};

export default ModelContainer;
