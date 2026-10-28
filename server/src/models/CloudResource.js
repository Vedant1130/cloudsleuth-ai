
import mongoose from "mongoose";

const cloudResourceSchema = new mongoose.Schema(
  {
    resourceId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      enum: ["AWS", "GCP", "Azure", "Other"],
      default: "Other",
    },
    resourceType: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      default: "unknown",
    },
    monthlyCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["running", "stopped", "warning", "unknown"],
      default: "unknown",
    },
    environment: {
      type: String,
      enum: ["development", "staging", "production"],
      default: "development",
    },
  },
  {
    timestamps: true,
  }
);

cloudResourceSchema.index({ resourceId: 1 }, { unique: true });

const CloudResource = mongoose.model("CloudResource", cloudResourceSchema);

export default CloudResource;
