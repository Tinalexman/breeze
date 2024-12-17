import { FC, useEffect, useState } from "react";
import { model } from "../../../wailsjs/go/models";
import CloseButton from "../reusable/CloseButton";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import HoverIcon from "../reusable/HoverIcon";
import { IoTrash } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { useDeleteModelByID } from "../../hooks/modelHooks";
import { useGlobalData } from "../../stores/global";
import AddNewComponent from "../reusable/AddNewComponent";

const ViewModel: FC<{ model?: model.Model; onExit: () => void }> = ({
  model,
  onExit,
}) => {
  if (model === undefined) return null;

  const reload = useGlobalData((state) => state.reloadCurrentPage);

  const {
    deleteModel,
    loading: loadingDelete,
    success: deleteSuccess,
  } = useDeleteModelByID();

  const { getIconForId } = useGetUniqueIcon();
  const Icon = getIconForId(model.id);
  const [metadata, setMetadata] = useState<{
    [key: string]: model.ModelData;
  } | null>(model.metadata);

  useEffect(() => {
    if (!loadingDelete && deleteSuccess) {
      reload();
      onExit();
    }
  }, [loadingDelete, deleteSuccess]);

  return (
    <div className="w-full max-h-[calc(100vh-10.5rem)] flex flex-col gap-10 overflow-y-auto scrollbar-thin scrollbar-webkit bg-sh-1 rounded-2xl p-5">
      <div className="space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit flex items-center gap-2">
            <h1 className="text-2xl text-white font-bold">{model.name}</h1>
            <Icon className="text-sh-5" size={36} />
          </div>
          <div className="w-fit flex items-center gap-4">
            <HoverIcon
              icon={<IoTrash size={20} />}
              iconColor="text-white"
              backgroundColor="bg-red-500"
              onClick={() => deleteModel(model.id)}
            />
            <CloseButton color="text-white" onClick={onExit} />
          </div>
        </div>
        <p className="text-sh-4 font-light text-sm">
          {model.description.length > 0
            ? model.description
            : "No description provided"}
          <span>
            <MdModeEdit className="cursor-pointer" size={16} />
          </span>
        </p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-lg font-medium text-white text-opacity-80">
          Metadata
        </h2>

        {metadata === null && (
          <AddNewComponent text="Add new fields to your model" />
        )}
      </div>
    </div>
  );
};

export default ViewModel;
