import { FC } from "react";

import { IoIosAdd } from "react-icons/io";

const AddNewComponent: FC<{ text: string; onClick?: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-40 hover:border-0 hover:bg-sh-2 rounded-2xl flex flex-col justify-center items-center border-2 border-dashed border-sh-2 ease-out transition-colors duration-300 cursor-pointer"
    >
      <IoIosAdd className="text-sh-5" size={48} />
      <p className="text-xl text-sh-5 font-normal">{text}</p>
    </div>
  );
};

export default AddNewComponent;
