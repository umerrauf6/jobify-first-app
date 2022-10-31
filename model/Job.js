import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "must provide company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "must provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "interview", "decline"],
      },
      default: "pending",
    },
    jobType: {
      type: String,
      enum: { values: ["full time", "part time", "remote", "internship"] },
      default: "part time",
    },
    jobLocation: {
      type: String,
      required: [true, "must provide location"],
      maxlength: 100,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "must provide user"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Job", jobSchema);
