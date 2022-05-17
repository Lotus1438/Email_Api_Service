import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import { createUserModel, getAllUsersModel, getUserByIdModel, updateUserModel, deleteUserModel, filterUserModel } from "../model/users.model.js";
import {  createRethinkClient} from "../lib/rethink.js"

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";

var databaseName = "mydb";
var tableName = "users";

//create
export const createUser = async (req, res) => {
  const insert_params = {
    email: req.body.email,
    password: req.body.password
    }
  await createUserModel(databaseName, tableName, insert_params)

  let data = {
    success: true,
    message: "User successfully added",
  };
  res.json(data);
};

//get all users
export const getAllUsers = async(req, res) => {
   const users = await getAllUsersModel(databaseName,tableName)
   res.json(users)
};

//get user by id
export const getUserById = async(req, res) => {
  let user_id = req.params.user_id;
  const userById = await getUserByIdModel(databaseName, tableName, user_id)
  res.json(userById)
      
};

//update
export const updateUser = async(req, res) => {
  let user_id = req.params.user_id;
  const update_user = await updateUserModel(databaseName, tableName, user_id, req.body)
    let data = {
      success: true,
      message: "User successfully updated",
    };
    res.json(data);
};

//delete user
export const deleteUser = async (req, res) => {
  let user_id = req.params.user_id;
  const delete_user = await deleteUserModel(databaseName, tableName, user_id)
    let data = {
      success: true,
      message: "User successfully deleted",
    };
    res.json(data);
};

//filter
export const filterUser = async (req, res) => {
  const filter = await filterUserModel(databaseName, tableName, req.body)
  let data = {
    filter,
    success: true,
    message: "Filtered!",
  };
  res.json(data);
}
