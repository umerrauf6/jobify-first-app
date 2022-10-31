import {
  register,
  login,
  update,
  forgetPassword,
  resetPasswordAuth,
  resetPasswordSuccess,
} from "../controller/authController.js";
import auth from "../middleware/auth.js";
import express from "express";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 0, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many Request from same IP.Please try after 15 mins",
});

const controllerRouter = express.Router();
controllerRouter.route("/register").post(limiter, register);
controllerRouter.route("/login").post(limiter, login);
controllerRouter.route("/forget-password").post(forgetPassword);
controllerRouter.route("/reset-password/:token/:id").get(resetPasswordAuth);
controllerRouter
  .route("/reset-password-success/:id")
  .patch(resetPasswordSuccess);

controllerRouter.route("/update").patch(auth, update);

export default controllerRouter;
