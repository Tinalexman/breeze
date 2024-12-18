import { useState, useEffect } from "react";
import {
  GetAllControllers,
  CreateController,
  GetControllerByID,
  DeleteControllerByID,
  UpdateController,
  AddControllerMethod,
  RemoveControllerMethod,
  RenameControllerMethod,
} from "../../wailsjs/go/core/App";
import { controller } from "../../wailsjs/go/models";
import toast from "react-hot-toast";
import { useGlobalData } from "../stores/global";

export const useGetAllControllers = () => {
  const [data, setData] = useState<controller.Controller[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const reload = useGlobalData((state) => state.reload);

  const getControllers = async (search?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetAllControllers(search ?? "");
      setData(c);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getControllers();
  }, [reload]);

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
    methods: [],
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
      toast.error(`${error}`);
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
      toast.success("Controller Deleted");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
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
      toast.success("Controller Created");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    createController,
  };
};

export const useUpdateController = (showToast?: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const updateController = async (
    payload: controller.UpdateControllerPayload
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      await UpdateController(payload);
      setSuccess(true);
      if (showToast && showToast) {
        toast.success("Controller Updated");
      }
    } catch (error) {
      setSuccess(false);
      if (showToast && showToast) {
        toast.error(`${error}`);
      }
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    updateController,
  };
};

export const useModifyControllerMethod = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const modifyMethod = async (
    payload: controller.ModifyControllerMethodPayload,
    mode: "add" | "remove" | "rename"
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      if (mode === "add") {
        await AddControllerMethod(payload);
      } else if (mode === "remove") {
        await RemoveControllerMethod(payload);
      } else if (mode === "rename") {
        await RenameControllerMethod(payload);
      }

      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    modifyMethod,
  };
};
