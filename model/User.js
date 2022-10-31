import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "must provide password"],
    minLength: 8,
    maxLength: 20,
    select: false,
  },

  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    trim: true,
    default: "last name",
  },
  location: {
    type: String,
    minLength: 6,
    maxLength: 30,
    trim: true,
    default: "los angles",
  },
});

userSchema.pre("save", async function () {
  // c
  if (this.modifiedPaths("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.createJWT = function () {
  return jsonwebtoken.sign({ userID: this._id }, process.env.SCRETE_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};
userSchema.methods.comparePassword = async function (curPassword) {
  try {
    const isMatch = await bcrypt.compare(curPassword, this.password);
    return isMatch;
  } catch (e) {
    console.log(e);
  }
};

export default mongoose.model("User", userSchema);
