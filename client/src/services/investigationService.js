import api from "./api";

// Start a new cloud investigation
export const runInvestigation = async () => {
  const response = await api.post("/investigations/run");
  return response.data;
};

// Fetch previous investigations
export const getInvestigationHistory = async () => {
  const response = await api.get("/investigations/history");
  return response.data;
};
