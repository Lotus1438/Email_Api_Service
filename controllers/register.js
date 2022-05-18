import { createRethinkClient } from "../lib/rethink.js";
import { create, getAll, getById, deleteById, getByFilter } from "../model/index.js";

var databaseName = "mydb";
var tableName = "users";
const r = createRethinkClient();

//register
export const registerUser = async (req, res) => {
  let user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_number: req.body.contacr_number,
    birthdate: req.body.birthdate,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    role_id: req.body.role_id,
  };

  await create(databaseName, tableName, user)

  let data = {
    success: true,
    message: `User '${user.email}' is registered successfully!`,
  };
  res.json(data);
};

//get all users
export const getAllUsers = async (req, res) => {
  const users = await getAll(databaseName, tableName)
  res.json(users)
};

//get user by id
export const getUserById = async (req, res) => {
  let user_id = req.params.user_id;
  const userById = await getById(databaseName, tableName, user_id)
  res.json(userById)
};

//delete user
export const deleteUser = async (req, res) => {
  let user_id = req.params.user_id;
  const delete_user = await deleteById(databaseName, tableName, user_id)
  let data = {
    success: true,
    message: "User successfully deleted",
  };
  res.json(data);
};

//filter
export const filterUser = async (req, res) => {
  const filter = await getByFilter(databaseName, tableName, req.body)
  let data = {
    filter,
    success: true,
    message: "Filtered!",
  };
  res.json(data);
}
