"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // router
const user_controller_1 = __importDefault(require("../controllers/user.controller")); // user controler for the responses
const auth_1 = require("../middleware/auth");
// create the Router
const userRouter = (0, express_1.Router)();
//singup get
userRouter.get("/register", auth_1.checkAuth, user_controller_1.default.singInUser);
//singUp- create a new user
userRouter.post("/register", user_controller_1.default.addUser);
//login Get
userRouter.get("/login", auth_1.checkAuth, user_controller_1.default.logInUser);
//login post 
userRouter.post("/login", user_controller_1.default.loginUser);
//logout
userRouter.get("/logout", user_controller_1.default.logoutUser);
//check-auth
userRouter.get("/check-auth", user_controller_1.default.getUserByUsername);
exports.default = userRouter;
