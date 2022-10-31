import { json } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../model/User.js";
import statusCode from "http-status-codes";
import nodemailer from "nodemailer";

const statusCodes = statusCode.StatusCodes;
import {
  badRequestError,
  notFoundError,
  unAuthorized,
} from "../error/index.js";

const register = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    throw new badRequestError("please provide all Details");
  }

  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new badRequestError("email already exist");
  }
  const user = await User.create({ name, password, email });
  const token = user.createJWT();
  res.status(statusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new badRequestError("fill all the fields");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new notFoundError("Email not found");
  }
  console.log(user);
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new badRequestError("Password dont match");
  } else {
    const token = await user.createJWT();
    res.status(statusCodes.OK).json({
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
      },
      token,
      location: user.location,
    });
  }
};
const update = async (req, res) => {
  try {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location)
      throw new badRequestError("fill all the fields");
    const user = await User.findOne({ _id: req.user.userID });
    if (!user) throw new notFoundError("Email not found");
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;
    await user.save();
    const token = await user.createJWT();

    res.status(statusCode.OK).json({
      user,
      token,
      location: user.location,
    });
  } catch (err) {
    throw new badRequestError(err);
  }
};
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new badRequestError("fill all the fields");
    const user = await User.findOne({ email });
    if (!user) throw new notFoundError("Email not found");
    const token = await jsonwebtoken.sign(
      { userID: user._id },
      process.env.SCRETE_KEY,
      {
        expiresIn: process.env.RESET_TOKEN_EXPIRES_IN,
      }
    );

    const link = `localhost:3000/reset-password/${token}/${String(user._id)}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "su0000676@gmail.com",
        pass: `rotubjsqrwqyizpn`,
      },
    });

    var mailOptions = {
      from: "su0000676@gmail.com",
      to: `${email}`,
      subject: "Sending Reset Email using Node.js",
      html: `
      <div>
      <h1>Hey ${user.name}</h1>
      <button type="button" class="btn btn-block">
      <a href=${link}>RESET YOUR PASSWORD</a>
      </button>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(statusCode.OK).json({ link });
  } catch (err) {
    throw new badRequestError(err);
  }
};
const resetPasswordAuth = async (req, res) => {
  try {
    const { token, id } = req.params;
    const verify = jsonwebtoken.verify(token, process.env.SCRETE_KEY);
    res.status(statusCode.OK).json({ verify });
  } catch (error) {
    throw new badRequestError(error);
  }
};
const resetPasswordSuccess = async (req, res) => {
  try {
    const { password } = req.body;

    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select("+password");
    user.password = password;
    user.save();
    res.status(statusCode.OK).json({
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
      },
      location: user.location,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  login,
  update,
  forgetPassword,
  resetPasswordAuth,
  resetPasswordSuccess,
};
