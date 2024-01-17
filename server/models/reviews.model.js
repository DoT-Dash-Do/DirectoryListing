import mongoose from "mongoose";

const reviewsschema = new mongoose.Schema({
    review:{
        type: String,
        required: true,
    },
    userRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    userName:{
        type:String,
        required:true
    },
    listingid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'listing',
        required: true,
    },
},{timestamps:true});

const review = mongoose.model('review',reviewsschema);

export default review;