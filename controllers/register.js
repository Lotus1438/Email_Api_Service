import { createRethinkClient } from "../lib/rethink.js";

var databaseName = "mydb";
var tableName = "users";
const r = createRethinkClient();

export const registerUser = (req, res) => {
  let user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };

  r.db(databaseName).table(tableName).insert(user).run(req._rdb);

  let data = {
    success: true,
    message: `User '${user.first_name}' is registered successfully!`,
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

//delete user
export const deleteUser = (req, res) => {
  let user_id = req.params.user_id;

  r.db(databaseName)
    .table(tableName)
    .get(user_id)
    .delete()
    .run(req._rdb)

  let data = {
    success: true,
    message: "User successfully deleted",
  };
  res.json(data);
};
