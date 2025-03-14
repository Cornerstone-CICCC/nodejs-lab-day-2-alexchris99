"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model")); //model for the users
// get user by username
const getUserByUsername = (req, res) => {
    const { username } = req.body; // destrcuture the body to get the username
    const user = user_model_1.default.findUser(username); // use the function to loook for the username
    // if there is not user
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    // send the user information in case it exist
    res.status(200).json(user);
};
// add user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // desctruture the params from the body
    const { username, password, firstname, lastname } = req.body;
    // verify the params
    if (!username || !password || !firstname || !lastname) {
        res.status(409).json({ message: "All fields are required" });
        return;
    }
    const user = yield user_model_1.default.createUser({ username, password, firstname, lastname }); // user the usermodel to try to cretate a new user
    // if username exist
    if (!user) {
        res.status(409).json({ message: "Username is taken" });
        return;
    }
    // in case the user creation was succesfull
    res.status(201).json(user);
});
// login a user
const loginUser = (req, res) => {
    // get the values by destructuring the request body
    const { username, password } = req.body;
    // chech that the values exist
    if (!password || !username) {
        res.status(500).json({ message: "Username or Password are missing" });
        return;
    }
    const user = user_model_1.default.loginUser(username, password);
    if (!user) {
        res.status(500).json({ message: "Login details are incorrect" });
    }
    // generate cookies for the user
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = username;
    }
    res.status(200).json({ message: "Login succesfull" });
};
//logout
const logoutUser = (req, res) => {
    // clear the cookie session
    req.session = null;
    res.status(200).json({ message: "Logout Succesfully" });
};
exports.default = {
    getUserByUsername,
    loginUser,
    logoutUser,
    addUser
};
