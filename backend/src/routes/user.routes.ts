import { Router } from "express"; // router
import userController from "../controllers/user.controller"; // user controler for the responses
import { checkAuth } from "../middleware/auth";

// create the Router
const userRouter = Router()

//singup get
userRouter.get("/register",checkAuth, userController.singInUser)

//singUp- create a new user
userRouter.post("/register", userController.addUser)

//login Get
userRouter.get("/login",checkAuth,userController.logInUser)

//login post 
userRouter.post("/login", userController.loginUser)

//logout
userRouter.get("/logout",userController.logoutUser)

//check-auth
userRouter.get("/check-auth",userController.getUserByUsername)


export default userRouter