import { FC } from "react";
import { IoIosClose } from "react-icons/io";

const CloseButton: FC<{
  onClick: () => void;
  background?: string;
  color?: string;
}> = ({ onClick, background = "bg-sh-1", color = "text-monokai" }) => {
  return (
    <div
      className={`size-9 grid place-content-center ${background} rounded hover:bg-sh-2 cursor-pointer duration-300 ease-out transition-all`}
      onClick={onClick}
    >
      <IoIosClose className={color} size={32} />
    </div>
  );
};

export default CloseButton;
