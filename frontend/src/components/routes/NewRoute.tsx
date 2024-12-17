import { FC, useEffect } from "react";
import CloseButton from "../reusable/CloseButton";

import { Form, Formik } from "formik";
import LabeledInput from "../reusable/LabeledInput";
import Dropdown from "../reusable/Dropdown";
import { useGetAllControllers } from "../../hooks/controllerHooks";
import Loader from "../reusable/Loader";
import { useCreateRoute } from "../../hooks/routeHooks";
import { useGlobalData } from "../../stores/global";

const NewRoute: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { data, loading: loadingControllers } = useGetAllControllers();
  const { loading, success, createRoute } = useCreateRoute();
  const reloadPage = useGlobalData((state) => state.reloadCurrentPage);

  useEffect(() => {
    if (!loading && success) {
      reloadPage();
      onClose();
    }
  }, [loading, success]);

  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">New Route</h1>
        <CloseButton onClick={onClose} />
      </div>
      <p className="text-sm text-sh-3 font-normal">Add a new service Route</p>

      <Formik
        initialValues={{
          name: "",
          description: "",
          controller: "",
          controllerID: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "The name of the route is required";
          }

          if (!values.controller) {
            errors.controller = "The controller is required";
          }

          return errors;
        }}
        onSubmit={(values) => {
          createRoute(values);
        }}
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
              label="Route Name"
              name="name"
              className="px-4"
              error={errors.name}
            />

            <LabeledInput
              value={values.description}
              onChange={handleChange}
              label="Route Description (Optional)"
              name="description"
              className="px-4"
              error={errors.description}
            />

            <Dropdown
              label="Controller"
              hint="Select a controller"
              menus={data.map((controller, i) => {
                return {
                  name: controller.name,
                  onClick: () => {
                    setFieldValue("controller", controller.name);
                    setFieldValue("controllerID", controller.id);
                  },
                };
              })}
              value={values.controller}
              error={errors.controller}
              loading={loadingControllers}
            />

            <button
              type="submit"
              className={`bg-route-yellow ${
                !isValid && "bg-opacity-50"
              }  mt-5 rounded text-monokai text-sm grid place-content-center font-normal w-[100px] py-2`}
            >
              {loading ? <Loader color="#101010" /> : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewRoute;
