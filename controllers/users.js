import cookieParser from "cookie-parser";
import express from "express";
import {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  getByFilter,
} from "../model/index.js";

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";

var databaseName = "mydb";
var tableName = "users";

//create
export const createUser = async (req, res) => {
  const insert_user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { inserted } = await create(databaseName, tableName, insert_user);
  res.json(
    inserted
      ? {
          success: true,
          message: "User successfully added",
        }
      : {
          success: false,
          message: "No User created",
        }
  );
};

//get all users
export const getAllUsers = async (req, res) => {
  const users = await getAll(databaseName, tableName);
  res.json(users);
};

//get user by id
export const getUserById = async (req, res) => {
  let user_id = req.params.user_id;
  const user = await getById(databaseName, tableName, user_id);
  res.json(
    user ?? {
      success: false,
      message: "User does not exist",
    }
  );
};

//update
export const updateUser = async (req, res) => {
  let user_id = req.params.user_id;
  const { replaced } = await updateById(
    databaseName,
    tableName,
    user_id,
    req.body
  );
  res.json(
    replaced
      ? {
          success: true,
          message: "User successfully updated",
        }
      : {
          success: false,
          message: "No User to update",
        }
  );
};

//delete user
export const deleteUser = async (req, res) => {
  let user_id = req.params.user_id;
  const { deleted } = await deleteById(databaseName, tableName, user_id);
  res.json(
    deleted
      ? {
          success: true,
          message: "User successfully deleted",
        }
      : {
          success: false,
          message: "No user to deleted",
        }
  );
};

//filter
export const filterUser = async (req, res) => {
  const filter = await getByFilter(databaseName, tableName, req.body);
  let data = {
    filter,
    success: true,
    message: "Filtered!",
  };
  res.json(data);
};
