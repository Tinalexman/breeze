import { FC, ChangeEventHandler } from "react";

const FieldInput: FC<{
  value: string;
  placeholder: string;
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ value, label, placeholder, onChange }) => {
  return (
    <div className="w-full flex flex-col items-start gap-0.5">
      {label && <p className="text-xs text-sh-4">{label}</p>}
      <input
        type="text"
        className="outline-none w-full rounded text-sm p-2 focus:outline-none focus:bg-sh-3 bg-sh-1 bg-opacity-60 text-white transition-all ease-out duration-200"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FieldInput;
