import { User } from "../types/user";// user type
import {v4 as uuidv4} from "uuid" // unique id
import bcrypt from "bcrypt"// hash passwords

// In memory db
class userModel{
    private users: User[] =[]

    // find by username
    findUser(username: string){
        // look for the index in the db
        const user = this.users.findIndex(u => u.username === username)
        // if no result found
        if(user === -1){
            return false
        }
        // return the user
        return this.users[user]
    }

    //create new user
    async createUser(newUser: Omit<User, 'id'>){
        const {username, password, firstname, lastname} = newUser // destructure the values
        
        //check for th username
        const foundIndex = this.users.findIndex(u => u.username === username)

        // if there is a match
        if(foundIndex !== -1){
            return false
        }

        //add user
        //hash password
        let hashPassword = await bcrypt.hash(password,12)

        const createUser: User ={
            id: uuidv4(),
            username,
            password,
            firstname,
            lastname
        }

        // add the user to the db
        this.users.push(createUser)

        return{
            createUser
        }
    
    }

    // login

    async loginUser(username: string, password: string){
        // check for the username
        const user = this.users.findIndex(u => u.username === username)

        // if there is no match
        if(user === -1){
            return false
        }

        // get user password
        const userPassword = this.users[user].password

        // check passwords
        const isMatch = await bcrypt.compare(userPassword,password)

        if(!isMatch){
            return false
        }

        return this.users[user]
    }
}

export default new userModel

