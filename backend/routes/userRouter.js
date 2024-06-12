import express from "express";
import {
  activeUser,
  addManyUsers,
  addUser,
  changePassword,
  deleteActiveUser,
  editUser,
  getUserInfo,
  getUsers,
  loginUser,
  removeUser,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/login-user", loginUser);
userRouter.get("/get-users", authenticate, getUsers);
userRouter.get("/get-user-info", authenticate, getUserInfo);
// userRouter.get("/get-user-info",authenticate, getUserInfo);
userRouter.post("/add-user", authenticate, upload.single("image"), addUser);
userRouter.post("/active-user", activeUser);
userRouter.delete("/delete-active-user", deleteActiveUser);
userRouter.post("/add-users", authenticate, addManyUsers);
userRouter.post(
  "/edit-user/:id",
  authenticate,
  upload.single("image"),
  editUser
);
userRouter.post("/change-password/:id", authenticate, changePassword);
userRouter.delete("/remove-user/:id", authenticate, removeUser);

export default userRouter;
