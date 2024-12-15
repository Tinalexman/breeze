import { FC } from "react";
import CloseButton from "../reusable/CloseButton";

import { Form, Formik } from "formik";
import LabeledInput from "../reusable/LabeledInput";

const NewModel: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">New Model</h1>
        <CloseButton onClick={onClose} />
      </div>
      <p className="text-sm text-sh-3 font-normal">
        Add a new model to your collection
      </p>

      <Formik
        initialValues={{
          name: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "The name of the model is required";
          }

          return errors;
        }}
        onSubmit={(values) => {}}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form
            method="POST"
            className="w-full flex flex-col gap-5 items-center mt-5"
            onSubmit={handleSubmit}
          >
            <LabeledInput
              value={values.name}
              onChange={handleChange}
              label="Model Name"
              name="name"
              className="px-4"
              error={errors.name}
            />

            <button
              type="submit"
              className="bg-model-green mt-5 rounded text-white text-sm items-center font-normal w-[100px] py-2"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewModel;