import {  createRethinkClient} from "../lib/rethink.js"
import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken"

const app = express();
app.use(cookieParser());

var databaseName = "mydb";
var tableName = "messages";
const r = createRethinkClient()

//create
export const createMessage = (req, res) => {
    res.cookie("access_token", req.cookies.access_token);
        let message = {
                recipient: req.body.recipient,
                subject: req.body.subject,
                message: req.body.message,
        }
        r.db(databaseName)
    .table(tableName)
    .insert(req.body)
    .run(req._rdb)

  let data = {
    success: true,
    message: "Message successfully created",
  };
  res.json(data);
};

//get all messages
export const getAllMessages = (req, res) => {
        r.db(databaseName)
          .table(tableName)
          .orderBy(r.desc("id"))
          .run(req._rdb)
          .then((result) => {
            res.json(result);
          })
          .catch((error) => console.log(error));
      };
      
