import { createRethinkClient } from "../lib/rethink.js";
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv/config'


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
      accessTokenSecret,
    );
    res.cookie("access_token", accessToken, { httpOnly: true });
    res.send("Logged in successfuly");
    // res.redirect('/users');
  } else {
    res.send("Email or Password is incorrect");
  }
  // return res.redirect('/users')
  // let user = {
  //   email: req.body.email,
  //   password: req.body.password,
  // };
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  // res.json({accessToken: accessToken})
};

//get all users
export const getAllUsers = (req, res) => {
  r.db(databaseName)
    .table(tableName)
    .run(req._rdb)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
};
