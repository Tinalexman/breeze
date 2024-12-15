import { FC } from "react";
import { IoIosClose } from "react-icons/io";

const CloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      className="p-0.5 rounded bg-sh-1 hover:bg-sh-2 cursor-pointer duration-300 ease-out transition-all"
      onClick={onClick}
    >
      <IoIosClose className="text-monokai" size={32} />
    </div>
  );
};

export default CloseButton;
