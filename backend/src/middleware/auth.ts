import {Request, Response, NextFunction} from "express"

export const checkAuth = (req: Request, res: Response, next: NextFunction)=>{

    if(req.session && req.session.isLoggedIn){
        res.status(503).send("Already login")
        return
    }
    
    next()
}