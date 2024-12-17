import { FC } from "react";
import { model } from "../../../wailsjs/go/models";
import { IconType } from "react-icons";

const ModelContainer: FC<{ model: model.Model; icon: IconType }> = ({
  model,
  icon,
}) => {
  const Icon = icon;
  return (
    <div className="w-full flex items-center gap-4 bg-sh-1 rounded-md p-4 shadow-custom cursor-pointer">
      <Icon className="text-sh-5" size={40} />
      <div className="flex flex-col w-[calc(100%-1rem-40px)]">
        <h2 className="text-white font-medium">{model.name}</h2>
        <p className="text-sh-4 font-light text-xs line-clamp-2">
          {model.description.length > 0
            ? model.description
            : "No description provided"}
        </p>
      </div>
    </div>
  );
};

export default ModelContainer;
