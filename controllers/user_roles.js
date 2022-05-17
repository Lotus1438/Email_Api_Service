import {  createRethinkClient} from "../lib/rethink.js"
import cookieParser from "cookie-parser";
import express from "express";

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";


var databaseName = "mydb";
var tableName = "user_roles";
const r = createRethinkClient()

//create
export const createUserRole = (req, res) => {
    let role = {
        role: req.body.role,
        priviledges: {
            has_add_access: req.body.has_add_access,
            has_edit_access: req.body.has_edit_access,
            has_delete_access: req.body.has_delete_access,
        }
    }
        r.db(databaseName)
    .table(tableName)
    .insert(role)
    .run(req._rdb)

  let data = {
    success: true,
    message: "User Role successfully added",
  };
  res.json(data);
};