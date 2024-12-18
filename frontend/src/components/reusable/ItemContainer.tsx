import { FC } from "react";
import { IconType } from "react-icons";

const ItemContainer: FC<{
  name: string;
  description: string;
  icon: IconType;
  onClick?: () => void;
}> = ({ name, description, icon, onClick }) => {
  const Icon = icon;
  return (
    <div
      onClick={onClick}
      className="w-full flex items-center overflow-hidden gap-4 bg-sh-1 rounded-md p-4 shadow-custom cursor-pointer hover:scale-105 scale-100 duration-300 ease-out transition-transform"
    >
      <Icon className="text-sh-5" size={40} />
      <div className="flex flex-col w-[calc(100%-1rem-40px)]">
        <h2 className="text-white font-medium">{name}</h2>
        <p className="text-sh-4 font-light text-xs line-clamp-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ItemContainer;
