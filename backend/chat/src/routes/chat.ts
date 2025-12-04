import express from "express"
import { createNewChat, getAllChats, sendMessage } from "../controllers/chat.js";
import { authMiddleware } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/chat/all",authMiddleware,getAllChats);
router.post("/chat/new",authMiddleware,createNewChat);
router.post("/chat/message",authMiddleware,sendMessage);

export default router 