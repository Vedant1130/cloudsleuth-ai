
import CloudResource from "../models/CloudResource.js";

export const getResources = async (req, res) => {
  try {
    const resources = await CloudResource.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cloud resources",
    });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = await CloudResource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 400
          ? error.message
          : "Failed to create cloud resource",
    });
  }
};
