import express from "express"
import { getUserDetails, loginUser,registerUser, updateUserProfile } from "../controllers/userComtroller.js"
import authMiddleware from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile", getUserDetails);
userRouter.put("/update", authMiddleware, updateUserProfile); 

export default userRouter