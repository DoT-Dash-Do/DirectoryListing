import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,

    },
    // phone:{
    //     type:String,
    //     unique:true,
    //     required:true
    // },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;