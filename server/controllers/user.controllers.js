import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'
export const test = (req,res) =>{
    res.json({
        message:"Hello World!"
    });
};

export const updateU = async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(401,"unauthorized"))
    try {
        if(req.body.password)
        {
            req.body.password = bcrypt.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true})
        const {password,...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteU = async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(401,"unauthorized"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('user has been deleted');
    } catch (error) {
        next(error);
    }
};