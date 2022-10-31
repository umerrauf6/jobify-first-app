import Job from "../model/Job.js";
import { StatusCodes } from "http-status-codes";
import { badRequestError, notFoundError } from "../error/index.js";
import checkPermission from "../utilis/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position)
    throw new badRequestError("please fill all inputs");
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.OK).json({ job });
};
const getAllJobs = async (req, res) => {
  const { status, jobType, search, sort } = req.query;
  let querySelector = {
    createdBy: req.user.userID,
  };

  if (status != "all") {
    querySelector.status = status;
  }
  if (jobType != "all") {
    querySelector.jobType = jobType;
  }
  if (search) {
    // querySelector.position = { $regex: search, $options: "i" };
    querySelector.company = { $regex: search, $options: "i" };
  }
  console.log(querySelector);
  let result = Job.find(querySelector);
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  if (sort === "latest") {
    result = result.sort("createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("-createdAt");
  }

  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  let totalJob = await Job.countDocuments(querySelector);
  let numOfPages = Math.ceil(totalJob / limit);

  const jobs = await result;
  res.status(StatusCodes.OK).json({ jobs, totalJob, numOfPages });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) throw new notFoundError(`job not found by this id : ${jobId}`);
  checkPermission(job.createdBy, req.user.userID);
  job.remove();
  res.status(StatusCodes.OK).json({ job });
};
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) throw new notFoundError(`job not found by this id : ${jobId}`);

  checkPermission(job.createdBy, req.user.userID);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) },
    },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, cur) => {
    const { _id: title, count } = cur;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    decline: stats.decline || 0,
  };
  var monthlyStats = await Job.aggregate([
    {
      $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    {
      $limit: 6,
    },
  ]);
  monthlyStats = monthlyStats.map((val) => {
    const {
      _id: { year, month },
      count,
    } = val;
    const date = moment().month(month).year(year).format("MMM yy");
    return { date, count };
  });
  res.status(StatusCodes.OK).json({ defaultStats, monthlyStats });
};

export { createJob, getAllJobs, deleteJob, updateJob, showStats };
