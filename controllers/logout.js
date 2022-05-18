import cookieParser from "cookie-parser";
import express from "express";

const app = express();
app.use(cookieParser());

export const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  res.send("Logout Successfully");
};
