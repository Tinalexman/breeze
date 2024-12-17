import { FC, useEffect, useState } from "react";
import { model as m } from "../../../wailsjs/go/models";
import CloseButton from "../reusable/CloseButton";
import { useGetUniqueIcon } from "../../hooks/miscHooks";
import HoverIcon from "../reusable/HoverIcon";
import { IoTrash } from "react-icons/io5";
import {
  useDeleteModelByID,
  useGetModelTypes,
  useUpdateModel,
} from "../../hooks/modelHooks";
import { useGlobalData } from "../../stores/global";
import AddNewComponent from "../reusable/AddNewComponent";
import AddModelDataField from "../reusable/AddModelDataField";
import { IoIosAdd } from "react-icons/io";

const ViewModel: FC<{ breezeModel?: m.Model; onExit: () => void }> = ({
  breezeModel,
  onExit,
}) => {
  if (breezeModel === undefined) return null;
  const [model, setModel] = useState<m.Model>(breezeModel);
  const reload = useGlobalData((state) => state.reloadCurrentPage);

  const {
    deleteModel,
    loading: loadingDelete,
    success: deleteSuccess,
  } = useDeleteModelByID();

  const {
    loading: loadingUpdate,
    success: updateSuccess,
    updateModel,
  } = useUpdateModel(false);

  const { data: modelTypes } = useGetModelTypes();

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
  const Icon = getIconForId(breezeModel.id);

  const update = (m: m.Model) => {
    setModel(m);
    updateModel(m);
  };

  let hasMetaData: boolean = model.metadata.length > 0;

  return (
    <div className="w-full flex flex-col gap-10 bg-sh-1 rounded-2xl p-5">
      <div className="space-y-5">
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
        <p className="text-sh-4 font-light text-sm inline-flex items-end">
          {model.description}
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
          {hasMetaData && (
            <IoIosAdd
              className="cursor-pointer"
              title="Add a new metadata"
              size={24}
              onClick={() => {
                const total = model.metadata.length + 1;

                updateModel(
                  m.Model.createFrom({
                    id: model.id,
                    name: model.name,
                    description: model.description,
                    metadata: [
                      m.ModelData.createFrom({
                        name: `Field ${total}`,
                        type: "String",
                        default: "",
                      }),
                      ...model.metadata,
                    ],
                  })
                );
              }}
            />
          )}
        </div>

        {!hasMetaData && (
          <AddNewComponent
            text="Add new fields to your model"
            onClick={() => {
              update(
                m.Model.createFrom({
                  id: model.id,
                  name: model.name,
                  description: model.description,
                  metadata: [
                    m.ModelData.createFrom({
                      name: "Field 1",
                      type: "String",
                      default: "",
                    }),
                  ],
                })
              );
            }}
          />
        )}

        {hasMetaData && (
          <div className="w-full grid grid-cols-4 gap-4">
            {model.metadata.map((v, i) => {
              return (
                <AddModelDataField
                  key={i}
                  initial={v}
                  allTypes={modelTypes}
                  onRemove={() => {
                    update(
                      m.Model.createFrom({
                        id: model.id,
                        name: model.name,
                        description: model.description,
                        metadata: model.metadata.filter(
                          (_, index) => index !== i
                        ),
                      })
                    );
                  }}
                  onChange={(name, modelType, defaultValue) => {
                    update(
                      m.Model.createFrom({
                        id: model.id,
                        name: model.name,
                        description: model.description,
                        metadata: [
                          ...model.metadata.slice(0, i),
                          m.ModelData.createFrom({
                            name: name,
                            type: modelType,
                            default: defaultValue,
                          }),
                          ...model.metadata.slice(i + 1),
                        ],
                      })
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

export default ViewModel;
