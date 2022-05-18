import cookieParser from "cookie-parser";
import express from "express";
import { create } from "../model/index.js";

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";


var databaseName = "mydb";
var tableName = "user_roles";

//create
export const createUserRole = async (req, res) => {
    let insert_role = {
        role: req.body.role,
        priviledges: {
          has_read_access: req.body.has_read_access,
            has_add_access: req.body.has_add_access,
            has_edit_access: req.body.has_edit_access,
            has_delete_access: req.body.has_delete_access,
        }
    }

    await create(databaseName, tableName, insert_role)

  let data = {
    success: true,
    message: "User Role successfully added",
  };
  res.json(data);
};