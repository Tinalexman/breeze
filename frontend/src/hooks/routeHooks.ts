import { useState, useEffect } from "react";
import {
  GetAllRoutes,
  CreateRoute,
  GetRouteByID,
  DeleteRouteByID,
  AddRouteData,
  RemoveRouteData,
  UpdateRouteData,
} from "../../wailsjs/go/core/App";
import { route } from "../../wailsjs/go/models";
import toast from "react-hot-toast";
import { useGlobalData } from "../stores/global";

export const useGetAllRoutes = () => {
  const [data, setData] = useState<route.Route[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const reload = useGlobalData((state) => state.reload);

  const getRoutes = async (search?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetAllRoutes(search ?? "");
      setData(c);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getRoutes();
  }, [reload]);

  return {
    loading,
    success,
    data,
    getRoutes,
  };
};

export const useGetRouteByID = () => {
  const [data, setData] = useState<route.Route>(
    route.Route.createFrom({
      controllerID: "",
      data: [],
      description: "",
      id: "",
      name: "",
    })
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const getRoute = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      let c = await GetRouteByID(id);
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
    getRoute,
  };
};

export const useDeleteRouteByID = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteRoute = async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      await DeleteRouteByID(id);
      setSuccess(true);
      toast.success("Route Deleted");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    deleteRoute,
  };
};

export const useCreateRoute = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const createRoute = async (payload: route.CreateRoutePayload) => {
    if (loading) return;
    setLoading(true);

    try {
      await CreateRoute(payload);
      setSuccess(true);
      toast.success("Route Created");
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }

    setLoading(false);
  };

  return {
    loading,
    success,
    createRoute,
  };
};

export const useModifyRouteData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const modifyMethod = async (
    payload: route.ModifyRouteDataPayload,
    mode: "add" | "remove" | "rename"
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      if (mode === "add") {
        await AddRouteData(payload);
      } else if (mode === "remove") {
        await RemoveRouteData(payload);
      } else if (mode === "rename") {
        await UpdateRouteData(payload);
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
