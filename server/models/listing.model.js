import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required: true,
    },
    ListingType:{
        type:String,
        required: true
    },
    AuthorizedBiz:{
        type:Boolean,
        required:true
    },
    pincode:{
       type:Number,
       required:true 
    },
    imageUrls:{
        type:Array,
        required: true,
    },
    mapUrl:{
        type:String,
        required:true
    },userRef:{
        type: String,
        required: true,
    }
},{timeStamps:true});

const listing = mongoose.model('listing',listingSchema);
export default listing;