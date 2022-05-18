import express from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
} from "../controllers/messages.js";
import { cookieJwtAuth } from "../middleware/cookieJwtAuth.js";

const router = express.Router();

router.post("/", cookieJwtAuth, createMessage);
router.get("/", cookieJwtAuth, getAllMessages);
router.get("/:id", cookieJwtAuth, getMessageById);
router.delete("/:id", cookieJwtAuth, deleteMessage);
router.put("/:id", cookieJwtAuth, updateMessage);

export default router;
