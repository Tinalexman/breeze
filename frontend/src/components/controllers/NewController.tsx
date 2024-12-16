import { FC, useEffect } from "react";
import CloseButton from "../reusable/CloseButton";

import { Form, Formik } from "formik";
import LabeledInput from "../reusable/LabeledInput";
import Dropdown from "../reusable/Dropdown";
import { useGetAllModels } from "../../hooks/modelHooks";
import Loader from "../reusable/Loader";
import { useCreateController } from "../../hooks/controllerHooks";
import { useGlobalData } from "../../stores/global";

const NewController: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { data, loading: loadingModels } = useGetAllModels();
  const { loading, success, createController } = useCreateController();
  const reloadPage = useGlobalData((state) => state.reloadCurrentPage);

  useEffect(() => {
    if (loading && success) {
      reloadPage();
      onClose();
    }
  }, [loading, success]);

  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">New Controller</h1>
        <CloseButton onClick={onClose} />
      </div>
      <p className="text-sm text-sh-3 font-normal">
        Add a new service controller
      </p>

      <Formik
        initialValues={{
          name: "",
          description: "",
          model: "",
          modelID: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "The name of the controller is required";
          }

          if (!values.model) {
            errors.model = "The model is required";
          }

          return errors;
        }}
        onSubmit={(values) => {}}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          isValid,
        }) => (
          <Form
            method="POST"
            className="w-full flex flex-col gap-5 items-center mt-5"
            onSubmit={handleSubmit}
          >
            <LabeledInput
              value={values.name}
              onChange={handleChange}
              label="Controller Name"
              name="name"
              className="px-4"
              error={errors.name}
            />

            <LabeledInput
              value={values.description}
              onChange={handleChange}
              label="Controller Description (Optional)"
              name="description"
              className="px-4"
              error={errors.description}
            />

            <Dropdown
              label="Model"
              hint="Select a model"
              menus={data.map((model, i) => {
                return {
                  name: model.name,
                  onClick: () => {
                    setFieldValue("model", model.name);
                    setFieldValue("modelID", model.id);
                  },
                };
              })}
              value={values.model}
              error={errors.model}
              loading={loadingModels}
            />

            <button
              type="submit"
              className={`bg-controller-red ${
                !isValid && "bg-opacity-50"
              }  mt-5 rounded text-white text-sm grid place-content-center font-normal w-[100px] py-2`}
            >
              {loading ? <Loader /> : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewController;
