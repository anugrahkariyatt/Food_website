const Joi = require("joi");

const {
  loginService,
  signUpService,
  resetPasswordLinkService,
  passwordRestService,
  changeCurrentPasswordService,
} = require("../services/auth.service");

require("dotenv").config();
const {
  signUpBodyValidation,
  logInBodyValidation,
} = require("../utils/validationSchema");

const bcrypt = require("bcryptjs");

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
};
exports.registerNewUser = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      console.log("Here is the problme", error);

      return res.status(400).json({ errors: true, message: error.details[0] });
    }

    const result = await signUpService(req.body);
    setRefreshTokenCookie(res, result.refreshToken);
    res.status(201).json({
      error: false,
      message: "Account created successfully",
      accessToken: result.accessToken,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = logInBodyValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    const { user, tokens } = await loginService(req.body);

    setRefreshTokenCookie(res, tokens.refreshToken);

    res.status(200).json({
      error: false,
      accessToken: tokens.accessToken,
      message: "Logged in successfully",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};
exports.sendRestPassLink = async (req, res) => {
  try {
    const Schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = Schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const result = await resetPasswordLinkService(req.body);

    res.status(200).json({
      error: false,
      message: result.message,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};

exports.passwordRest = async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const data = {
      userId: req.params.userId,
      token: req.params.token,
      password: req.body.password,
    };

    const result = await passwordRestService(data);

    res.status(200).json({
      error: false,
      message: result.message,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};

exports.changeCurrentpassword = async (req, res) => {
  try {
    const schema = Joi.object({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = await changeCurrentPasswordService(req.body);

    res.status(200).json({
      error: false,
      message: result.message,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: true,
      message: err.message || "Internal Server Error",
    });
  }
};
