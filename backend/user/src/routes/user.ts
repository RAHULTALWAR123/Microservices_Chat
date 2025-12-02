import express from "express";
import { getAllUsers, getAUser, loginUser, profile, updateUser, verifyUser } from "../controllers/user.js";
import { authMiddleware } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/login",loginUser);
router.post("/verify",verifyUser);
router.post("/update",authMiddleware,updateUser);
router.get("/profile",authMiddleware,profile);
router.get("/all-users",getAllUsers);
router.get("/user/:id",authMiddleware,getAUser);

export default router;