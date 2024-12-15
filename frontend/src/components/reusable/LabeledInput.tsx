import { FC, ChangeEvent } from "react";

const LabeledInput: FC<{
  value: string;
  label: string;
  error?: string;
  placeholder?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = ({ label, error, placeholder, value, name, onChange, className }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="text-xs text-sh-3">{label}</p>
      <div className="w-full relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={`placeholder:text-sh-2 w-full ${className ?? ""}`}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default LabeledInput;
