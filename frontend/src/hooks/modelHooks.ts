import { useState, useEffect } from "react";
import {
  CreateModel,
  DeleteModelByID,
  GetAllModels,
  GetModelByID,
} from "../../wailsjs/go/core/App";
import { model } from "../../wailsjs/go/models";
import toast from "react-hot-toast";

export const useGetAllModels = () => {
  const [data, setData] = useState<model.Model[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const getModels = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetAllModels();
      setData(c);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error("An error occurred while retrieving the models");
    }

    setLoading(false);
  };

  useEffect(() => {
    getModels();
  }, []);

  return {
    loading,
    success,
    data,
    getModels,
  };
};

export const useGetControllerByID = () => {
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
      toast.error("An error occurred while retrieving the model");
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
    } catch (error) {
      setSuccess(false);
      toast.error("An error occurred while deleting the model");
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
      toast.success("A new model was created successfully");
    } catch (error) {
      setSuccess(false);
      toast.error("An error occurred while creating the model");
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    createModel,
  };
};
