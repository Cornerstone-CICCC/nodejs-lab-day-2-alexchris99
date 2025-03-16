// Create your server
import express, {Request, Response} from "express"
import cookieSession from "cookie-session"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.routes"

// permision to acces the variables in the .env file
dotenv.config()

// create the server
const app = express()

// cookie keys
const cookie_S=process.env.COOKIE_S
const cookie_EN=process.env.COOKIE_EN

// if the cookies do not exits we crash the server
if(!cookie_S || !cookie_EN){
    throw new Error("Keys missing")
}

// Middleware
//cors-conection to astro
app.use(cors({
    origin: "http://localhost:4321",
    credentials: true
}))
//cookies
app.use(cookieSession({
    name: "session",
    maxAge: 60 * 60 * 1000,
    keys:[
        cookie_S,
        cookie_EN
    ]
}))
// allow post request
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/",userRouter)// user routes

// fallback
app.use((req: Request, res: Response)=>{
    res.status(404).json({message: "Page not found!"})
})

//start the server
const PORT = process.env.PORT || 3500
app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`)
})