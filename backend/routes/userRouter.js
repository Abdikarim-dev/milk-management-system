import express from "express";
import {
  addManyUsers,
  addUser,
  changePassword,
  editUser,
  getUserInfo,
  getUsers,
  loginUser,
  removeUser,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login-user", loginUser);
userRouter.get("/get-users",authenticate, getUsers);
userRouter.get("/get-user-info",authenticate, getUserInfo);
// userRouter.get("/get-user-info",authenticate, getUserInfo);
userRouter.post("/add-user",authenticate, addUser);
userRouter.post("/add-users",authenticate, addManyUsers);
userRouter.post("/edit-user/:id",authenticate, editUser);
userRouter.post("/change-password/:id",authenticate, changePassword);
userRouter.delete("/remove-user/:id",authenticate, removeUser);

export default userRouter;
