import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Modal from "../reusable/Modal";
import { SearchNormal } from "iconsax-react";
import NewModel from "./NewModel";
import { useGetAllModels } from "../../hooks/modelHooks";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import EmptyState from "../reusable/EmptyState";
import ItemContainer from "../reusable/ItemContainer";

const Models = () => {
  const [addModel, showAddModel] = useState<boolean>(false);
  const [searching, isSearching] = useState<boolean>(false);
  const { data, loading, getModels } = useGetAllModels();
  const { getIconForId } = useGetUniqueIcon();

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
              onChange={(e) => {
                const res = e.target.value.trim();
                isSearching(res.length > 0);
                getModels(res);
              }}
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
        <div className="w-full grid grid-cols-4 gap-5 mt-10">
          {!loading &&
            data.map((model, i) => {
              return (
                <ItemContainer
                  key={i}
                  name={model.name}
                  description={model.description}
                  icon={getIconForId(model.id)}
                />
              );
            })}
        </div>
        {!loading && data.length === 0 && (
          <EmptyState
            content={
              searching
                ? "No models match your search"
                : "You have not created any models yet"
            }
            height="70vh"
          />
        )}
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
