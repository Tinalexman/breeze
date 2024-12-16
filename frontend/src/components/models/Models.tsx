import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Modal from "../reusable/Modal";
import { SearchNormal } from "iconsax-react";
import NewModel from "./NewModel";
import { useGetAllModels } from "../../hooks/modelHooks";
import ModelContainer from "./ModelContainer";
// import nf from "../../assets/images/not_found.svg";

const Models = () => {
  const [addModel, showAddModel] = useState<boolean>(false);
  const { data, loading, success, getModels } = useGetAllModels();

  return (
    <>
      <div className="w-full flex flex-col">
        <h1 className="text-4xl text-white font-bold">Models</h1>
        <p className="text-sm text-sh-3 font-normal">
          Define and manage all your models all in one place
        </p>
        <div className="mt-5 flex w-full justify-between">
          <div className="w-[250px] relative">
            <input
              type="text"
              placeholder="Search model"
              className="placeholder:text-sh-2 pl-8 pr-4 w-full"
            />
            <SearchNormal
              className="text-sh-2 absolute top-1/2 left-2 -translate-y-1/2"
              size={16}
            />
          </div>
          <button
            onClick={() => {
              showAddModel(true);
            }}
            className="bg-model-green rounded text-white text-sm items-center font-normal px-4 py-1.5 flex gap-1"
          >
            <IoIosAdd className="text-xl" />
            New Model
          </button>
        </div>
        <div className="w-full grid grid-cols-4">
          {data.map((model, i) => {
            return <ModelContainer key={i} model={model} />;
          })}
        </div>
      </div>
      <Modal
        visible={addModel}
        onClose={() => showAddModel(false)}
        width="400px"
        height="auto"
        closeOnClickOutside={false}
      >
        <NewModel onClose={() => showAddModel(false)} />
      </Modal>
    </>
  );
};

export default Models;
