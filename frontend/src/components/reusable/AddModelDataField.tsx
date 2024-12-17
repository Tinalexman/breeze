import React, { FC, useState } from "react";
import Dropdown from "./Dropdown";

const AddModelDataField: FC<{
  name: string;
  modelType: string;
  allTypes: string[];
  onChange: (target: string, val: string) => void;
}> = ({ name, modelType, allTypes, onChange }) => {
  const [intialName, setInitialName] = useState<string>(name);
  const [initialType, setInitialType] = useState<string>(modelType);

  return (
    <div className="w-full h-20 bg-sh-2 rounded-md">
      <input
        type="text"
        className="field-input"
        value={intialName}
        onChange={(e) => {
          const res = e.target.value;
          setInitialName(res);
          onChange("name", res);
        }}
      />
      <Dropdown
        hint="Select Model Type"
        menus={allTypes.map((t, i) => {
          return {
            name: t,
            onClick: () => {
              setInitialType(t);
              onChange("type", t);
            },
          };
        })}
        value={initialType}
        label="Type"
      />
      <h2>{modelType}</h2>
    </div>
  );
};

export default AddModelDataField;
