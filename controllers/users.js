import {  createRethinkClient} from "../lib/rethink.js"
import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
// import { Users } from "../model/users.model.js";

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";


var databaseName = "mydb";
var tableName = "users";
const r = createRethinkClient()

//create
export const createUser = (req, res) => {
        r.db(databaseName)
    .table(tableName)
    .insert(user)
    .run(req._rdb)

  let data = {
    success: true,
    message: "User successfully added",
  };
  res.json(data);
};

//get all users
export const getAllUsers = (req, res) => {
      r.db(databaseName)
      .table(tableName)
      .orderBy(r.desc("id"))
      .run(req._rdb)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => console.log(error));
};

//get user by id
export const getUserById = (req, res) => {
  let user_id = req.params.user_id;

      r.db(databaseName)
      .table(tableName)
      .get(user_id)
      .run(req._rdb)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => console.log(error));
};

//update
export const updateUser = (req, res) => {
  let user_id = req.params.user_id;

      r.db(databaseName)
      .table(tableName)
      .get(user_id)
      .update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      })
      .run()
  
    let data = {
      success: true,
      message: "User successfully updated",
    };
    res.json(data);
};

//delete user
export const deleteUser = (req, res) => {
  let user_id = req.params.user_id;

      r.db(databaseName)
      .table(tableName)
      .get(user_id)
      .delete()
      .run(req._rdb)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => console.log(error));
  
    let data = {
      success: true,
      message: "User successfully deleted",
    };
    res.json(data);
};
