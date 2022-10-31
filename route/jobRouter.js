import express from "express";
import {
  createJob,
  getAllJobs,
  deleteJob,
  updateJob,
  showStats,
} from "../controller/jobController.js";
import auth from "../middleware/auth.js";

const jobRouter = express.Router();

jobRouter.route("/").get(auth, getAllJobs).post(auth, createJob);
jobRouter.route("/stats").get(auth, showStats);
jobRouter.route("/:id").delete(auth, deleteJob).patch(auth, updateJob);

export default jobRouter;
