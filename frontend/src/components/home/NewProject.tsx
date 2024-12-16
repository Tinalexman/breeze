import { FC, useEffect } from "react";

import { Form, Formik } from "formik";
import LabeledInput from "../reusable/LabeledInput";
import CloseButton from "../reusable/CloseButton";
import { useCreateNewProject } from "../../hooks/appHooks";
import Loader from "../reusable/Loader";

const NewProject: FC<{ onCreate: () => void; onClose: () => void }> = ({
  onCreate,
  onClose,
}) => {
  const { loading, success, createProject } = useCreateNewProject();

  useEffect(() => {
    if (!loading && success) {
      onCreate();
    }
  }, [loading, success]);

  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">New Project</h1>
        <CloseButton onClick={onClose} />
      </div>
      <p className="text-sm text-sh-3 font-normal">
        Create a new Breeze project
      </p>

      <Formik
        initialValues={{
          name: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "The name of the project is required";
          }

          return errors;
        }}
        onSubmit={(values) => createProject(values)}
      >
        {({ values, errors, handleChange, handleSubmit, isValid }) => (
          <Form
            method="POST"
            className="w-full flex flex-col gap-5 items-center mt-5"
            onSubmit={handleSubmit}
          >
            <LabeledInput
              value={values.name}
              onChange={handleChange}
              label="Project Name"
              name="name"
              className="px-4"
              error={errors.name}
            />

            <button
              type="submit"
              className={`bg-sh-4 ${
                !isValid && "bg-opacity-50"
              } mt-5 rounded text-white text-sm grid place-content-center font-normal w-[100px] py-2`}
            >
              {loading ? <Loader /> : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProject;
