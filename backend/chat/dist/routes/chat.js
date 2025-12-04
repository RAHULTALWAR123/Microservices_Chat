import express from "express";
import { createNewChat, getAllChats } from "../controllers/chat.js";
import { authMiddleware } from "../middleware/isAuth.js";
const router = express.Router();
router.get("/chat/all", authMiddleware, getAllChats);
router.post("/chat/new", authMiddleware, createNewChat);
export default router;
//# sourceMappingURL=chat.js.map