import { FC, useEffect, useState } from "react";
import { controller as c } from "../../../wailsjs/go/models";
import CloseButton from "../reusable/CloseButton";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import HoverIcon from "../reusable/HoverIcon";
import { IoTrash } from "react-icons/io5";
import {
  useDeleteControllerByID,
  useGetControllerByID,
  useModifyControllerMethod,
  useUpdateController,
} from "../../hooks/controllerHooks";
import { useGlobalData } from "../../stores/global";
import { IoIosAdd } from "react-icons/io";
import AddNewComponent from "../reusable/AddNewComponent";
import AddMethod from "./AddMethod";

const ViewController: FC<{
  initial?: c.Controller;
  onExit: () => void;
}> = ({ initial, onExit }) => {
  if (initial === undefined) return null;
  const [controller, setController] = useState<c.Controller>(initial);
  const reload = useGlobalData((state) => state.reloadCurrentPage);

  const {
    deleteController,
    loading: loadingDelete,
    success: deleteSuccess,
  } = useDeleteControllerByID();

  const {
    data,
    getController,
    loading: loadingGet,
    success: getSuccess,
  } = useGetControllerByID();

  const {
    loading: loadingUpdate,
    success: updateSuccess,
    updateController,
  } = useUpdateController(false);

  const {
    loading: loadingModify,
    success: modifySuccess,
    modifyMethod,
  } = useModifyControllerMethod();

  useEffect(() => {
    if (!loadingDelete && deleteSuccess) {
      reload();
      onExit();
    }
  }, [loadingDelete, deleteSuccess]);

  useEffect(() => {
    if (!loadingUpdate && updateSuccess) {
      reload();
    }
  }, [loadingUpdate, updateSuccess]);

  useEffect(() => {
    if (!loadingModify && modifySuccess) {
      getController(controller.id);
      reload();
    }
  }, [loadingModify, modifySuccess]);

  useEffect(() => {
    if (!loadingGet && getSuccess) {
      setController(data);
    }
  }, [loadingGet, getSuccess]);

  const { getIconForId } = useGetUniqueIcon();
  const Icon = getIconForId(controller.id);

  let hasMethods: boolean = controller.methods.length > 0;

  return (
    <div className="w-full flex flex-col gap-10 bg-sh-1 rounded-2xl p-5">
      <div className="space-y-5">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit flex items-center gap-2">
            <h1 className="text-2xl text-white font-bold">{controller.name}</h1>
            <Icon className="text-sh-5" size={36} />
          </div>
          <div className="w-fit flex items-center gap-4">
            <HoverIcon
              icon={<IoTrash size={20} />}
              iconColor="text-white"
              backgroundColor="bg-red-500"
              onClick={() => deleteController(controller.id)}
            />
            <CloseButton color="text-white" onClick={onExit} />
          </div>
        </div>
        <p className="text-sh-4 font-light text-sm inline-flex items-end">
          {controller.description}
          {/* <span>
            <MdModeEdit
              className="inline-block align-middle ml-2 cursor-pointer"
              size={16}
            />
          </span> */}
        </p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-fit items-center flex gap-2 text-white">
          <h2 className="text-lg font-medium text-opacity-80">Methods</h2>
          {hasMethods && (
            <IoIosAdd
              className="cursor-pointer"
              title="Add a new method"
              size={24}
              onClick={() =>
                modifyMethod(
                  {
                    id: controller.id,
                    method: "New Method",
                  },
                  "add"
                )
              }
            />
          )}
        </div>
        {!hasMethods && (
          <AddNewComponent
            text="Add methods to your controller"
            onClick={() =>
              modifyMethod(
                {
                  id: controller.id,
                  method: "New Method",
                },
                "add"
              )
            }
          />
        )}
        {hasMethods && (
          <div className="w-full grid grid-cols-4 gap-4">
            {controller.methods.map((v, i) => {
              return (
                <AddMethod
                  key={i}
                  initial={v}
                  index={i + 1}
                  placeholder="Enter Method Name"
                  onRemove={() =>
                    modifyMethod(
                      {
                        id: controller.id,
                        method: v,
                      },
                      "remove"
                    )
                  }
                  onChange={(res) => {
                    modifyMethod(
                      {
                        id: controller.id,
                        method: res,
                      },
                      "rename"
                    );
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewController;
