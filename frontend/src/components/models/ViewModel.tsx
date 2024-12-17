import { FC, useEffect, useState } from "react";
import { model } from "../../../wailsjs/go/models";
import CloseButton from "../reusable/CloseButton";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import HoverIcon from "../reusable/HoverIcon";
import { IoTrash } from "react-icons/io5";
import { useDeleteModelByID, useGetModelTypes } from "../../hooks/modelHooks";
import { useGlobalData } from "../../stores/global";
import AddNewComponent from "../reusable/AddNewComponent";
import AddModelDataField from "../reusable/AddModelDataField";
import { IoIosAdd } from "react-icons/io";

const ViewModel: FC<{ breezeModel?: model.Model; onExit: () => void }> = ({
  breezeModel,
  onExit,
}) => {
  if (breezeModel === undefined) return null;

  const reload = useGlobalData((state) => state.reloadCurrentPage);

  const {
    deleteModel,
    loading: loadingDelete,
    success: deleteSuccess,
  } = useDeleteModelByID();

  const { data: modelTypes } = useGetModelTypes();

  const { getIconForId } = useGetUniqueIcon();
  const Icon = getIconForId(breezeModel.id);
  const [metadata, setMetadata] = useState<{
    [key: string]: model.ModelData;
  } | null>(null);

  useEffect(() => {
    if (!loadingDelete && deleteSuccess) {
      reload();
      onExit();
    }
  }, [loadingDelete, deleteSuccess]);

  return (
    <div className="w-full min-h-[calc(100vh-10.5rem)] flex flex-col gap-10 overflow-y-auto scrollbar-thin scrollbar-webkit bg-sh-1 rounded-2xl p-5">
      <div className="space-y-5">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit flex items-center gap-2">
            <h1 className="text-2xl text-white font-bold">
              {breezeModel.name}
            </h1>
            <Icon className="text-sh-5" size={36} />
          </div>
          <div className="w-fit flex items-center gap-4">
            <HoverIcon
              icon={<IoTrash size={20} />}
              iconColor="text-white"
              backgroundColor="bg-red-500"
              onClick={() => deleteModel(breezeModel.id)}
            />
            <CloseButton color="text-white" onClick={onExit} />
          </div>
        </div>
        <p className="text-sh-4 font-light text-sm inline-flex items-end">
          {breezeModel.description.length > 0
            ? breezeModel.description
            : "No description provided"}
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
          <h2 className="text-lg font-medium text-opacity-80">Metadata</h2>
          {metadata !== null && (
            <IoIosAdd
              className="cursor-pointer"
              size={24}
              onClick={() => {
                const total = Object.keys(metadata).length + 1;
                let newData: model.ModelData = model.ModelData.createFrom({
                  type: "String",
                  default: "",
                });
                metadata[`Field ${total}`] = newData;
                setMetadata(metadata);
              }}
            />
          )}
        </div>

        {metadata === null && (
          <AddNewComponent
            text="Add new fields to your model"
            onClick={() => {
              let newData: model.ModelData = model.ModelData.createFrom({
                type: "String",
                default: "",
              });
              setMetadata({
                "Field 1": newData,
              });
            }}
          />
        )}
        {metadata !== null && (
          <div className="w-full grid grid-cols-4 gap-4">
            {Object.keys(metadata).map((v, i) => {
              const value = metadata[v];
              return (
                <AddModelDataField
                  key={i}
                  name={v}
                  modelType={value.type}
                  allTypes={modelTypes}
                  onChange={(target: string, value: string) => {}}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewModel;
