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
