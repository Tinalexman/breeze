import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CreateProject,
  GetRecentProjects,
  LoadProject,
} from "../../wailsjs/go/core/App";
import { project } from "../../wailsjs/go/models";

export const useCreateNewProject = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const createProject = async (payload: project.CreateNewProjectPayload) => {
    if (loading) return;
    setLoading(true);

    try {
      await CreateProject(payload);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }
    setLoading(false);
  };

  return {
    createProject,
    loading,
    success,
  };
};

export const useOpenProject = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const openProject = async (projectName: string) => {
    if (loading) return;
    setLoading(true);

    try {
      await LoadProject(projectName);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }
    setLoading(false);
  };

  return {
    openProject,
    loading,
    success,
  };
};

export const useGetRecentProjects = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  const getProjects = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const p = await GetRecentProjects();
      setData(p);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(`${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return {
    getProjects,
    data,
    loading,
    success,
  };
};
