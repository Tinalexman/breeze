import { useState, useEffect } from "react";
import {
  GetAllServices,
  CreateService,
  GetServiceByID,
  DeleteServiceByID,
  UpdateService,
} from "../../wailsjs/go/core/App";
import { service } from "../../wailsjs/go/models";
import toast from "react-hot-toast";
import { useGlobalData } from "../stores/global";

export const useGetAllServices = () => {
  const [data, setData] = useState<service.Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const reload = useGlobalData((state) => state.reload);

  const getServices = async (search?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let s = await GetAllServices(search ?? "");
      setData(s);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getServices();
  }, [reload]);

  return {
    loading,
    success,
    data,
    getServices,
  };
};

export const useGetServiceByID = () => {
  const [data, setData] = useState<service.Service>(
    service.Service.createFrom({
      description: "",
      id: "",
      name: "",
      data: [],
    })
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const getService = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetServiceByID(id);
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
    getService,
  };
};

export const useDeleteServiceByID = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteService = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      await DeleteServiceByID(id);
      setSuccess(true);
      toast.success("Service Deleted");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    deleteService,
  };
};

export const useCreateService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const createService = async (payload: service.CreateServicePayload) => {
    if (loading) return;
    setLoading(true);

    try {
      await CreateService(payload);
      setSuccess(true);
      toast.success("Service Created");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    createService,
  };
};

export const useUpdateService = (showToast?: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const updateService = async (payload: service.UpdateServicePayload) => {
    if (loading) return;
    setLoading(true);

    try {
      await UpdateService(payload);
      setSuccess(true);
      if (showToast && showToast) {
        toast.success("Service Updated");
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
    updateService,
  };
};
