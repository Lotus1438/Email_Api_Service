import { createRethinkClient } from "../lib/rethink.js";
import cookieParser from "cookie-parser";
import express from "express";
import {
  create,
  getAll,
  deleteById,
  updateById,
  getById,
} from "../model/index.js";

const app = express();
app.use(cookieParser());

var databaseName = "mydb";
var tableName = "messages";
const r = createRethinkClient();

//create
export const createMessage = async (req, res) => {
  res.cookie("access_token", req.cookies.access_token);
  let message = {
    recipient: req.body.recipient,
    sender: req.body.sender,
    subject: req.body.subject,
    message: req.body.message,
  };
  const { inserted } = await create(databaseName, tableName, message);
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

//inbox
// export const getInbox = async (req, res) => {
//   let inboxes = {
//     recipient: req.body.recipient,
//     sender: req.body.sender,
//     subject: req.body.subject,
//     message: req.body.message,
//   };
//   const inbox_messages = await inbox(databaseName, tableName, inboxes);
//   console.log(inbox_messages);
// };

//get all messages
export const getAllMessages = async (req, res) => {
  const messages = await getAll(databaseName, tableName);
  res.json(messages);
};

//get user by id
export const getMessageById = async (req, res) => {
  let message_id = req.params.id;
  const message = await getById(databaseName, tableName, message_id);
  res.json(
    message ?? {
      success: false,
      message: "No message exist",
    }
  );
};

//update
export const updateMessage = async (req, res) => {
  let message_id = req.params.id;
  const { replaced } = await updateById(
    databaseName,
    tableName,
    message_id,
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
export const deleteMessage = async (req, res) => {
  let message_id = req.params.id;
  const { deleted } = await deleteById(databaseName, tableName, message_id);

  res.json(
    deleted
      ? {
          success: true,
          message: "Message successfully deleted",
        }
      : {
          success: true,
          message: "No message to delete",
        }
  );
};
