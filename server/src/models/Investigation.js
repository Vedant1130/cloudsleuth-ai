import mongoose from "mongoose";

const findingSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recommendation: {
      type: String,
      required: true,
    },
    resourceId: {
      type: String,
      required: true,
    },
    resourceName: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const investigationSchema = new mongoose.Schema(
  {
    summary: {
      totalResources: {
        type: Number,
        default: 0,
      },
      totalFindings: {
        type: Number,
        default: 0,
      },
      high: {
        type: Number,
        default: 0,
      },
      medium: {
        type: Number,
        default: 0,
      },
      low: {
        type: Number,
        default: 0,
      },
    },
    findings: {
      type: [findingSchema],
      default: [],
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Investigation = mongoose.model("Investigation", investigationSchema);

export default Investigation;
