import userModel from "../models/user.model"; //model for the users
import { Request, Response } from "express";
import { User } from "../types/user"; // user type


// get user by username
const getUserByUsername = (req: Request<{},{},{username:string}>, res: Response)=>{
    if(req.session && !req.session.username){
        res.status(404).json({message: "Login First"})
        return
    }

    const username = req.session?.username// destrcuture the body to get the username

    const user = userModel.findUser(username)// use the function to loook for the username

    // if there is not user
    if(!user){
        res.status(404).json({message: "User not found"})
        return 
    }

    // send the user information in case it exist
    res.status(200).json(user)
}

// add user singIn
const addUser = async(req: Request<{},{},Omit<User,"id">>, res: Response) =>{
    // desctruture the params from the body
    const {username, password, firstname, lastname} = req.body

    // verify the params
    if(!username || !password || !firstname|| !lastname){
        res.status(500).json({message: "All fields are required"})
        return
    }
    const user = await userModel.createUser({username,password,firstname,lastname}) // user the usermodel to try to cretate a new user
    
    // if username exist
    if(!user){
        res.status(409).json({message: "Username is taken"})
        return
    }

    // in case the user creation was succesfull
    res.status(201).json(user)
}

//singin get 
const singInUser = (req: Request, res:Response )=>{
    res.status(200).json({mesage: true})
}

//logIn get
const logInUser = (req:Request, res:Response)=>{
    res.status(200).json({message: true})
}

// login a user
const loginUser = (req: Request<{},{},{username: string, password: string}>, res: Response)=>{
    // get the values by destructuring the request body
    const {username, password}=req.body


    // chech that the values exist
    if(!password || !username){
        res.status(500).json({message: "Username or Password are missing"})
        return
    }

    const user = userModel.loginUser(username, password)

    if(!user){
        res.status(500).json({message: "Login details are incorrect"})
    }

    // generate cookies for the user
    if(req.session){
        req.session.isLoggedIn = true
        req.session.username = username
    }

    res.status(200).json({message: "Login succesfull"})
}

//logout
const logoutUser =(req: Request, res:Response)=>{
    // clear the cookie session
    req.session = null

    res.status(200).json({message: "Logout Succesfully"})
}



export default{
    getUserByUsername,
    loginUser,
    logoutUser,
    addUser,
    singInUser,
    logInUser,
}