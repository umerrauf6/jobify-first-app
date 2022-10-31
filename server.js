import express from "express";

import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

// Route

import controllerRouter from "./route/authRoute.js";
import jobRouter from "./route/jobRouter.js";

// send response

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", controllerRouter);
app.use("/api/v1/job", jobRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
// middleware

import notFound from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";
app.use(notFound);
app.use(errorHandlerMiddleWare);

// DB

import connectDb from "./db/connect.js";

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("DB connected");
      console.log("Server Running on " + port);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
