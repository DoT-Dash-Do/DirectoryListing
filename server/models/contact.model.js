import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{timestamps:true});

const contact = mongoose.model('Contact',contactSchema);

export default contact;