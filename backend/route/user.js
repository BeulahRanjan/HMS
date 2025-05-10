import express from "express";
import userController from "../controller/user.js";

const route = express.Router();

route.post("/signup", userController.signup);
route.post("/login", userController.login);

export default route;
