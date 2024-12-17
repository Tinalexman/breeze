import { FC } from "react";
import { IconType } from "react-icons";

const ItemContainer: FC<{
  name: string;
  description: string;
  icon: IconType;
}> = ({ name, description, icon }) => {
  const Icon = icon;
  return (
    <div className="w-full flex items-center gap-4 bg-sh-1 rounded-md p-4 shadow-custom cursor-pointer hover:scale-105 scale-100 duration-300 ease-out transition-transform">
      <Icon className="text-sh-5" size={40} />
      <div className="flex flex-col w-[calc(100%-1rem-40px)]">
        <h2 className="text-white font-medium">{name}</h2>
        <p className="text-sh-4 font-light text-xs line-clamp-1">
          {description.length > 0 ? description : "No description provided"}
        </p>
      </div>
    </div>
  );
};

export default ItemContainer;
