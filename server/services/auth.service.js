const User = require("../models/user.model");
const passwordRestToken = require("../models/passwordRestToekn.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const bcrypt = require("bcryptjs");
const generateTokens = require("../utils/generateTokens").default;

const signUpService = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    const error = new Error("User with given email already exists");
    error.statusCode = 400;
    throw error;
  }
  const salt = await bcrypt.genSalt(10);
  const hassPassword = await bcrypt.hash(data.password, salt);
  const NewUser = await new User({
    name: data.name,
    password: hassPassword,
    email: data.email,
    location: data.location,
    role: data.role,
  }).save();
  const { accessToken, refreshToken } = await generateTokens(NewUser);
  return {
    user: NewUser,
    accessToken,
    refreshToken,
  };
};

const loginService = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const verifiedPassword = await bcrypt.compare(data.password, user.password);

  if (!verifiedPassword) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const tokens = await generateTokens(user);

  return { user, tokens };
};

const resetPasswordLinkService = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    const error = new Error("User with given email doesn't exist");
    error.statusCode = 400;
    throw error;
  }
  let token = await passwordRestToken.findOne({ userId: user._id });
  if (!token) {
    token = await new passwordRestToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }
  const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token.token}`;
  await sendEmail(user.email, "Password reset", link);

  return {
    message: "Password reset link sent to your email account",
  };
};

const passwordRestService = async (data) => {
  const user = await User.findById(data.userId);
  if (!user) {
    const error = new Error("Invalid link or expired");
    error.statusCode = 400;
    throw error;
  }

  const token = await passwordRestToken.findOne({
    userId: user._id,
    token: data.token,
  });
  if (!token) {
    const error = new Error("Invalid link or expired");
    error.statusCode = 400;
    throw error;
  }
  const salt = await bcrypt.genSalt(10);
  const hassPassword = await bcrypt.hash(data.password, salt);
  user.password = hassPassword;
  await user.save();
  await passwordRestToken.deleteOne({ userId: user._id });
  return {
    message: "Password reset successfully",
  };
};

const changeCurrentPasswordService = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    // console.log("Error herer", email);
    const error = new Error("User with given email doesn't exist");
    error.statusCode = 400;
    throw error;
  }
  const verifiedPassword = await bcrypt.compare(
    data.oldPassword,
    user.password,
  );
  if (!verifiedPassword) {
    const error = new Error("password does not match");
    error.statusCode(401);
    throw error;
  }
  const salt = await bcrypt.genSalt(10);
  const hassPassword = await bcrypt.hash(data.password, salt);
  user.password = hassPassword;
  await user.save();
  return {
    message: "Password update sucessfully.",
  };
};
module.exports = {
  loginService,
  signUpService,
  resetPasswordLinkService,
  passwordRestService,
  changeCurrentPasswordService,
};
