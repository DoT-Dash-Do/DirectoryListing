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
        res.cookie('access_granted',token,{httpOnly:true,SameSite:'None',expiresIn:30*60*1000})
        .status(200)
        .json(rest);
    }
    catch(error){
        next(error);
    }
}

export const googlesign = async(req,res,next) =>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest} = user._doc;
            res
            .cookie('access_token',token,{httpOnly:true,SameSite:'None',expiresIn:30*60*1000})
            .status(200)
            .json(rest);
        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hasshedPassword = bcrypt.hashSync(generatedPassword,10);
            const userN = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            const newUser = new User({username:userN,email:req.body.email,password:hasshedPassword,avatar:req.body.photo});
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest} = newUser._doc;
            res.cookie('access_granted',token,{httpOnly:true,SameSite:'None',expiresIn:30*60*1000})
            .status(200)
            .json(rest);
        }
    } catch (error) {
        next(error);
    }
}