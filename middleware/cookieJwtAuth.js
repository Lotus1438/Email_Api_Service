import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { getByFilter, getById } from "../model/index.js";

const app = express();
app.use(cookieParser());
const accessTokenSecret = "youraccesstokensecret";

var databaseName = "mydb";
var tableName = "users";

export const cookieJwtAuth = async (req, res, next) => {
  res.cookie("access_token", req.cookies.access_token);

  const access_token = req.cookies.access_token;

  if (access_token) {
    const decoded_token = jwt.decode(access_token);
    let user = {
      email: decoded_token.email,
      password: req.body.password,
    };
    const method = req.method;
    jwt.verify(
      access_token,
      { email: user.email, password: user.password },
      accessTokenSecret,
      (err) => {
        return err;
      }
    );

    const [result] = await getByFilter(databaseName, tableName, {
      email: user.email,
    });

    const user_role = await getById(databaseName, "user_roles", result.role_id);

    const {
      has_read_access,
      has_add_access,
      has_delete_access,
      has_edit_access,
    } = user_role.priviledges;

    switch (method) {
      case "GET":
        if (!has_read_access) {
          return res.status(403).send("Forbidden");
        }
        next();
        break;
      case "POST":
        if (!has_add_access) {
          return res.status(403).send("Forbidden");
        }
        next();
        break;
      case "PUT":
        if (!has_edit_access) {
          return res.status(403).send("Forbidden");
        }
        next();
        break;
      case "DELETE":
        if (!has_delete_access) {
          return res.status(403).send("Forbidden");
        }
        next();
        break;
      default:
        break;
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};
