import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
export const signup = async(req,res) => {
    const {username,email,phone,password} = req.body;
    const hasshedPassword = bcrypt.hashSync(password,10);
    const newUser = new User({username,email,phone,password:hasshedPassword});
    try {
       await newUser.save();
        res.status(201).json('user created successfully'); 
    } catch (error) {
        res.status(500).json(error.message)
    }
}