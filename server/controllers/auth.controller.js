import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const signup = async(req,res,next) => {
    const {username,email,password} = req.body;
    const hasshedPassword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,password:hasshedPassword});
    try {
       await newUser.save();
        res.status(201).json({
            success:true,
            message:'user created successfully'
        }); 
    } catch (error) {
        next(errorHandler(550,'user already exists'));
    }
}

export const signin = async(req,res,next) => {
    const {email, password} = req.body;
    try{
        const validU = await User.findOne({email});
        if(!validU)
            return next(errorHandler(404,'wrong credentials'));
        const passCheck = bcrypt.compare(password,validU.password);
        if(!passCheck)
            return next(errorHandler(401,'wrong credentials'))
        
        const token = jwt.sign({id:validU._id},process.env.JWT_SECRET);
        const{password:pass,...rest} = validU._doc;
        res.cookie('access_granted',token,{httpOnly:true,expiresIn:30*60*1000})
        .status(200)
        .json(rest);
    }
    catch(error){
        next(error);
    }
}