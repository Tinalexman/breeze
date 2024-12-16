import { useState, useEffect } from "react";
import {
  GetAllControllers,
  CreateController,
  GetControllerByID,
  DeleteControllerByID,
} from "../../wailsjs/go/core/App";
import { controller } from "../../wailsjs/go/models";
import toast from "react-hot-toast";

export const useGetAllControllers = () => {
  const [data, setData] = useState<controller.Controller[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const getControllers = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetAllControllers();
      setData(c);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error("An error occurred while retrieving the controllers");
    }

    setLoading(false);
  };

  useEffect(() => {
    getControllers();
  }, []);

  return {
    loading,
    success,
    data,
    getControllers,
  };
};

export const useGetControllerByID = () => {
  const [data, setData] = useState<controller.Controller>({
    description: "",
    id: "",
    modelID: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const getController = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetControllerByID(id);
      setData(c);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error("An error occurred while retrieving the controller");
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    data,
    getController,
  };
};

export const useDeleteControllerByID = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteController = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      await DeleteControllerByID(id);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error("An error occurred while deleting the controller");
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    deleteController,
  };
};

export const useCreateController = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const createController = async (
    payload: controller.CreateControllerPayload
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await CreateController(payload);
      setSuccess(true);
      toast.success("A new controller was created successfully");
    } catch (error) {
      setSuccess(false);
      toast.error("An error occurred while creating the controller");
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    createController,
  };
};
