import { FC } from "react";
import CloseButton from "../reusable/CloseButton";

import { Form, Formik } from "formik";
import LabeledInput from "../reusable/LabeledInput";
import Dropdown from "../reusable/Dropdown";

const NewController: FC<{ onClose: () => void }> = ({ onClose }) => {
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
          model: "",
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
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
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

            <Dropdown
              label="Model"
              hint="Select a model"
              menus={[
                {
                  name: "Model 1",
                  onClick: () => {
                    setFieldValue("model", "Model 1");
                  },
                },
                {
                  name: "Model 2",
                  onClick: () => {
                    setFieldValue("model", "Model 2");
                  },
                },
              ]}
              value={values.model}
              error={errors.model}
            />

            <button
              type="submit"
              className="bg-controller-red mt-5 rounded text-white text-sm items-center font-normal w-[100px] py-2"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewController;
