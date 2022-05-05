import {  createRethinkClient} from "../lib/rethink.js"

var databaseName = "mydb";
var tableName = "normal_users";
const r = createRethinkClient()

//create
export const createUser = (req, res) => {
  let user = {
    email: req.body.email,
    password: req.body.password,
  };

  r.db(databaseName)
    .table(tableName)
    .insert(user)
    .run(req._rdb)
    // .then((cursor) => cursor.toArray())
    // .then((result) => {})
    // .catch((error) => console.log(error));

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
    // .orderBy(desc("id"))
    .run(req._rdb)
    // .then((cursor) => cursor.toArray())
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
      email: req.body.email,
      password: req.body.password,
    })
    .run(req._rdb)
    // .then((cursor) => cursor.toArray())
    .then((result) => {
      res.send(result);
    })
    .catch((error) => console.log(error));

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
    // .then((cursor) => cursor.toArray())
    // .then((result) => {
    //   res.send(result);
    // })
    // .catch((error) => console.log(error));

  let data = {
    success: true,
    message: "User successfully deleted",
  };
  res.json(data);
};
