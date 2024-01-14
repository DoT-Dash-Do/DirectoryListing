import { errorHandler } from "./error.js";
import Jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_granted;
    if(!token) return next(errorHandler(401,'unAuthenticated'));
    Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err)
            return next(errorHandler(403,'forbidden'));
        req.user = user;
        next();
    });
};