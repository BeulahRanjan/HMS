import express from "express";
import userController from "../controller/user.js";

const route = express.Router();

route.post("/signup", userController.signup);
route.post("/login", userController.login);
route.get("/getUserByEmail/:email", userController.getUserByEmail);
route.get("/getAllUsers", userController.getAllUsers);
route.delete("/deleteUser/:id", userController.deleteUser);
export default route;
