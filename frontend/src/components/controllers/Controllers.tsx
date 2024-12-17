import { useState } from "react";
import { SearchNormal } from "iconsax-react";
import { IoIosAdd } from "react-icons/io";
import Modal from "../reusable/Modal";
import NewController from "./NewController";
import { useGetAllControllers } from "../../hooks/controllerHooks";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import EmptyState from "../reusable/EmptyState";
import ItemContainer from "../reusable/ItemContainer";

const Controllers = () => {
  const [addController, showAddController] = useState<boolean>(false);
  const { loading, data, getControllers } = useGetAllControllers();
  const [searching, isSearching] = useState<boolean>(false);
  const { getIconForId } = useGetUniqueIcon();

  return (
    <>
      <div className="w-full flex flex-col">
        <h1 className="text-4xl text-white font-bold">Controllers</h1>
        <p className="text-sm text-sh-2 font-normal">
          Define and manage all your controllers all in one place
        </p>
        <div className="mt-5 flex w-full justify-between">
          <div className="w-[250px] relative">
            <input
              type="text"
              placeholder="Search controller"
              className="placeholder:text-sh-2 pl-8 pr-4 w-full"
              onChange={(e) => {
                const res = e.target.value.trim();
                isSearching(res.length > 0);
                getControllers(res);
              }}
            />
            <SearchNormal
              className="text-sh-2 absolute top-1/2 left-2 -translate-y-1/2"
              size={16}
            />
          </div>
          <button
            onClick={() => showAddController(true)}
            className="bg-controller-red rounded text-white text-sm items-center font-normal px-4 py-1.5 flex gap-1"
          >
            <IoIosAdd className="text-xl" />
            New Controller
          </button>
        </div>
        <div className="w-full grid grid-cols-4 gap-5 mt-10">
          {!loading &&
            data.map((controller, i) => {
              return (
                <ItemContainer
                  key={i}
                  name={controller.name}
                  description={controller.description}
                  icon={getIconForId(controller.id)}
                />
              );
            })}
        </div>
        {!loading && data.length === 0 && (
          <EmptyState
            content={
              searching
                ? "No controllers match your search"
                : "You have not created any controllers yet"
            }
            height="70vh"
          />
        )}
      </div>
      <Modal
        visible={addController}
        onClose={() => showAddController(false)}
        width="400px"
        height="auto"
        closeOnClickOutside={false}
      >
        <NewController onClose={() => showAddController(false)} />
      </Modal>
    </>
  );
};

export default Controllers;
