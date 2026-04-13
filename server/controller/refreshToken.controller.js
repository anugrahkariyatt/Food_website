const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken.model");
const verifyRefreshToken = require("../utils/verifyRefreshToken").default;
require("dotenv").config();

exports.refreshAccessToken = async (req, res) => {
  // console.log("It calling here");
  const refreshToken = req.cookies.refreshToken;
  // console.log("Token",refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      error: true,
      message: "Authentication required (No Refresh Token found)",
    });
  }

  verifyRefreshToken(refreshToken)
    .then(({ tokenDetails }) => {
      // console.log("EmailId", tokenDetails.email);
      const payload = {
        _id: tokenDetails._id,
        role: tokenDetails.role,
        email: tokenDetails.email,
      };

      const newAccessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "15m" },
      );

      res.status(200).json({
        error: false,
        accessToken: newAccessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: err.message || "Invalid Refresh Token. Please log in again.",
      });
    });
};

exports.logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // clear cookie (always)
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    // delete token from DB if exists
    if (refreshToken) {
      await UserToken.deleteOne({ token: refreshToken });
    }

    res.status(200).json({
      error: false,
      message: "Logged Out Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
