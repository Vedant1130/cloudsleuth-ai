import api from "./api";

export const getCloudResources = async () => {
  const response = await api.get("/resources");
  return response.data;
};

export const createCloudResource = async (resourceData) => {
  const response = await api.post("/resources", resourceData);
  return response.data;
};
