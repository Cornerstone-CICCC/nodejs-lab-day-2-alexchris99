import { Router } from "express"; // router
import userController from "../controllers/user.controller"; // user controler for the responses

// create the Router
const userRouter = Router()

//singUp- create a new user
userRouter.post("/singup", userController.addUser)

//login
userRouter.post("/login", userController.loginUser)

//logout
userRouter.get("/logout",userController.logoutUser)

//check-auth
userRouter.get("/check-auth",userController.getUserByUsername)


export default userRouter