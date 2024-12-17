import { FC, useState } from "react";
import { model } from "../../../wailsjs/go/models";
import { IoClose } from "react-icons/io5";
import FieldDropdown from "./FieldDropdown";

const AddModelDataField: FC<{
  initial: model.ModelData;
  allTypes: string[];
  onRemove: () => void;
  onChange: (name: string, modelType: string, defaultValue: string) => void;
}> = ({ initial, allTypes, onChange, onRemove }) => {
  const [name, setName] = useState<string>(initial.name);
  const [type, setType] = useState<string>(initial.type);
  const [def, setDefault] = useState<any>(initial.default);

  return (
    <div className="w-full flex flex-col gap-2 bg-sh-2 rounded-md px-2 pt-4 pb-2 relative">
      <IoClose
        className="cursor-pointer text-white absolute right-2 top-2 hover:scale-125 scale-100 transition-all duration-300 ease-out"
        size={14}
        onClick={onRemove}
      />
      <div className="w-full flex flex-col items-start gap-0.5">
        <p className="text-xs text-sh-4">Field Name</p>
        <input
          type="text"
          className="outline-none w-full rounded text-sm p-2 focus:outline-none focus:bg-sh-3 bg-sh-1 bg-opacity-60 text-white transition-all ease-out duration-200"
          value={name}
          placeholder="Enter Field Name"
          onChange={(e) => {
            const res = e.target.value;
            setName(res);
            onChange(res, type, def);
          }}
        />
      </div>
      <FieldDropdown
        hint="Select Model Type"
        menus={allTypes.map((t, _) => {
          return {
            name: t,
            onClick: () => {
              setType(t);
              onChange(name, t, def);
            },
          };
        })}
        value={type}
        label="Field Type"
      />
    </div>
  );
};

export default AddModelDataField;
