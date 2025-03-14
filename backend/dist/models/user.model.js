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
const uuid_1 = require("uuid"); // unique id
const bcrypt_1 = __importDefault(require("bcrypt")); // hash passwords
// In memory db
class userModel {
    constructor() {
        this.users = [];
    }
    // find by username
    findUser(username) {
        // look for the index in the db
        const user = this.users.findIndex(u => u.username === username);
        // if no result found
        if (user === -1) {
            return false;
        }
        // return the user
        return this.users[user];
    }
    //create new user
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, firstname, lastname } = newUser; // destructure the values
            //check for th username
            const foundIndex = this.users.findIndex(u => u.username === username);
            // if there is a match
            if (foundIndex !== -1) {
                return false;
            }
            //add user
            //hash password
            let hashPassword = yield bcrypt_1.default.hash(password, 12);
            const createUser = {
                id: (0, uuid_1.v4)(),
                username,
                password,
                firstname,
                lastname
            };
            // add the user to the db
            this.users.push(createUser);
            return {
                createUser
            };
        });
    }
    // login
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // check for the username
            const user = this.users.findIndex(u => u.username === username);
            // if there is no match
            if (user === -1) {
                return false;
            }
            // get user password
            const userPassword = this.users[user].password;
            // check passwords
            const isMatch = yield bcrypt_1.default.compare(userPassword, password);
            if (!isMatch) {
                return false;
            }
            return this.users[user];
        });
    }
}
exports.default = new userModel;
