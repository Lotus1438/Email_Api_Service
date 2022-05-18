import { createRethinkClient } from "../lib/rethink.js";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const accessTokenSecret = "youraccesstokensecret";
const app = express();
app.use(cookieParser());

var databaseName = "mydb";
var tableName = "users";
const r = createRethinkClient();

//login
export const loginUser = async (req, res) => {
  let user = {
    email: req.body.email,
    password: req.body.password,
  };

  const login = await r
    .db(databaseName)
    .table("users")
    .filter({ email: user.email })
    .run(req._rdb);

  if (Object.keys(login).length > 0) {
    const data = login[0];
    user.password === login[0].password;
    const accessToken = jwt.sign(
      { email: user.email, password: user.password },
      accessTokenSecret
    );
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.send("Logged in successfuly");
  } else {
    res.send("Unauthorized User");
  }
};
