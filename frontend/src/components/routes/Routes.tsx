import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useGetAllRoutes } from "../../hooks/routeHooks";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import { SearchNormal } from "iconsax-react";
import EmptyState from "../reusable/EmptyState";
import ItemContainer from "../reusable/ItemContainer";
import Modal from "../reusable/Modal";
import NewRoute from "./NewRoute";
import Reveal from "../reusable/Reveal";
import GroupRevealer from "../reusable/GroupRevealer";

const Routes = () => {
  const [addRoute, showAddRoute] = useState<boolean>(false);
  const { loading, data, getRoutes } = useGetAllRoutes();
  const [indexOfSelectedRoute, setIndexOfSelectedRoute] = useState<number>(-1);
  const [searching, isSearching] = useState<boolean>(false);
  const { getIconForId } = useGetUniqueIcon();

  return (
    <>
      <div className="w-full flex flex-col gap-5 sticky top-0 z-5 pt-5 bg-background">
        <div className="h-[7.5rem] flex flex-col w-full gap-5">
          <div>
            <h1 className="text-4xl text-white font-bold">Routes</h1>
            <p className="text-sm text-sh-2 font-normal">
              Define and manage all your routes all in one place
            </p>
          </div>
          <Reveal
            visible={indexOfSelectedRoute === -1}
            transition={{
              y: ["50%", "0%"],
            }}
          >
            <div className="mt-5 flex w-full justify-between">
              <div className="w-[250px] relative">
                <input
                  type="text"
                  placeholder="Search route"
                  className="placeholder:text-sh-2 pl-8 pr-4 w-full global-input"
                  onChange={(e) => {
                    const res = e.target.value.trim();
                    isSearching(res.length > 0);
                    getRoutes(res);
                  }}
                />
                <SearchNormal
                  className="text-sh-2 absolute top-1/2 left-2 -translate-y-1/2"
                  size={16}
                />
              </div>
              <button
                onClick={() => showAddRoute(true)}
                className="bg-route-yellow rounded text-monokai text-sm items-center font-normal px-4 py-1.5 flex gap-1"
              >
                <IoIosAdd className="text-xl" />
                New Route
              </button>
            </div>
          </Reveal>
        </div>
      </div>
      <GroupRevealer
        initialCondition={indexOfSelectedRoute === -1}
        firstChild={
          <>
            <div className="w-full grid grid-cols-4 gap-5 mt-10">
              {!loading &&
                data.map((route, i) => {
                  return (
                    <ItemContainer
                      key={i}
                      name={route.name}
                      description={route.description}
                      icon={getIconForId(route.id)}
                    />
                  );
                })}
            </div>
            {!loading && data.length === 0 && (
              <EmptyState
                content={
                  searching
                    ? "No routes match your search"
                    : "You have not created any routes yet"
                }
                height="70vh"
              />
            )}
          </>
        }
        secondChild={<> </>}
      />
      <Modal
        visible={addRoute}
        onClose={() => showAddRoute(false)}
        width="400px"
        height="auto"
        closeOnClickOutside={false}
      >
        <NewRoute onClose={() => showAddRoute(false)} />
      </Modal>
    </>
  );
};

export default Routes;
