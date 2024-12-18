import { FC, useEffect, useState } from "react";
import { model as m, controller as c } from "../../../wailsjs/go/models";
import CloseButton from "../reusable/CloseButton";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import HoverIcon from "../reusable/HoverIcon";
import { IoTrash } from "react-icons/io5";
import {
  useDeleteControllerByID,
  useUpdateController,
} from "../../hooks/controllerHooks";
import { useGlobalData } from "../../stores/global";
import { IoIosAdd } from "react-icons/io";

const ViewController: FC<{
  breezeController?: c.Controller;
  onExit: () => void;
}> = ({ breezeController, onExit }) => {
  if (breezeController === undefined) return null;
  const [controller, setController] = useState<c.Controller>(breezeController);
  const reload = useGlobalData((state) => state.reloadCurrentPage);

  const {
    deleteController,
    loading: loadingDelete,
    success: deleteSuccess,
  } = useDeleteControllerByID();

  const {
    loading: loadingUpdate,
    success: updateSuccess,
    updateController,
  } = useUpdateController(false);

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

  const { getIconForId } = useGetUniqueIcon();
  const Icon = getIconForId(breezeController.id);

  const update = (c: c.Controller) => {
    setController(c);
    updateController(c);
  };

  let hasMetaData: boolean = true;

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
          <h2 className="text-lg font-medium text-opacity-80">Handlers</h2>
          <IoIosAdd
            className="cursor-pointer"
            title="Add a new handler"
            size={24}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewController;
