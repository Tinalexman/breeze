import { FC, useEffect } from "react";

import { Form, Formik } from "formik";
import CloseButton from "../reusable/CloseButton";
import { useGetRecentProjects, useOpenProject } from "../../hooks/appHooks";
import Loader from "../reusable/Loader";
import Dropdown from "../reusable/input/Dropdown";

const OpenProject: FC<{ onOpen: () => void; onClose: () => void }> = ({
  onOpen,
  onClose,
}) => {
  const { loading, success, openProject } = useOpenProject();
  const { loading: loadingProjects, data } = useGetRecentProjects();

  useEffect(() => {
    if (!loading && success) {
      onOpen();
    }
  }, [loading, success]);

  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">Open Project</h1>
        <CloseButton onClick={onClose} />
      </div>
      <p className="text-sm text-sh-3 font-normal">
        Open an existing Breeze project
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
        onSubmit={(values) => openProject(values.name)}
      >
        {({ values, errors, handleSubmit, isValid, setFieldValue }) => (
          <Form
            method="POST"
            className="w-full flex flex-col gap-5 items-center mt-5"
            onSubmit={handleSubmit}
          >
            <Dropdown
              label="Project"
              hint="Select a project"
              menus={data.map((p, i) => {
                return {
                  name: p,
                  onClick: () => {
                    setFieldValue("name", p);
                  },
                };
              })}
              value={values.name}
              error={errors.name}
              loading={loadingProjects}
            />

            <button
              type="submit"
              className={`bg-sh-4 ${
                !isValid && "bg-opacity-50"
              } mt-5 rounded text-white text-sm grid place-content-center font-normal w-[100px] py-2`}
            >
              {loading ? <Loader /> : "Open"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OpenProject;
