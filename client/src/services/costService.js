import api from "./api";

export const getCostOverview = async () => {
  const response = await api.get("/costs/overview");
  return response.data;
};
