import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import FieldInput from "../reusable/input/FieldInput";

const AddMethod: FC<{
  initial: string;
  placeholder: string;
  index: number;
  onRemove: () => void;
  onChange: (name: string) => void;
}> = ({ initial, placeholder, index, onChange, onRemove }) => {
  const [name, setName] = useState<string>(initial);

  return (
    <div className="w-full flex flex-col gap-2 bg-sh-2 rounded-md px-2 pt-4 pb-2 relative">
      <IoClose
        className="cursor-pointer text-white absolute right-2 top-2 hover:scale-125 scale-100 transition-all duration-300 ease-out"
        size={14}
        onClick={onRemove}
      />
      <FieldInput
        label={`${index}.`}
        placeholder={placeholder}
        value={name}
        onChange={(e) => {
          const res = e.target.value;
          setName(res);
          onChange(res);
        }}
      />
    </div>
  );
};

export default AddMethod;
