import { useState, useEffect } from "react";
import {
  CreateModel,
  DeleteModelByID,
  GetAllModels,
  GetModelTypes,
  GetModelByID,
  UpdateModel,
} from "../../wailsjs/go/core/App";
import { model } from "../../wailsjs/go/models";
import toast from "react-hot-toast";
import { useGlobalData } from "../stores/global";

export const useGetAllModels = () => {
  const [data, setData] = useState<model.Model[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const reload = useGlobalData((state) => state.reload);

  const getModels = async (search?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetAllModels(search ?? "");
      setData(c);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getModels();
  }, [reload]);

  return {
    loading,
    success,
    data,
    getModels,
  };
};

export const useGetModelTypes = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const reload = useGlobalData((state) => state.reload);

  const getTypes = async (search?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let t = await GetModelTypes();
      setData(t);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getTypes();
  }, [reload]);

  return {
    loading,
    success,
    data,
    getTypes,
  };
};

export const useGetModelByID = () => {
  const [data, setData] = useState<model.Model>(
    model.Model.createFrom({
      description: "",
      name: "",
      id: "",
      metadata: {},
    })
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const getModel = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetModelByID(id);
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
    getModel,
  };
};

export const useDeleteModelByID = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteModel = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      await DeleteModelByID(id);
      setSuccess(true);
      toast.success("Model Deleted");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    deleteModel,
  };
};

export const useCreateModel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const createModel = async (payload: model.CreateModelPayload) => {
    if (loading) return;
    setLoading(true);

    try {
      await CreateModel(payload);
      setSuccess(true);
      toast.success("Model Created");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    createModel,
  };
};

export const useUpdateModel = (showToast?: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const updateModel = async (payload: model.UpdateModelPayload) => {
    if (loading) return;
    setLoading(true);

    try {
      await UpdateModel(payload);
      setSuccess(true);
      if (showToast && showToast) {
        toast.success("Model Updated");
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
    updateModel,
  };
};
