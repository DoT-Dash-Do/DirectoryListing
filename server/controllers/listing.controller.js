import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
export const createListing = async(req,res,next)=>{
    try {
        console.log("creating data")
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing)
    {
        return next(errorHandler(404,'listing not fond'));
    }
    if(req.user.id !== listing.userRef)
    {
        return next(errorHandler(401,'not your listing'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(201).json("listing has been deleted");
    } catch (error) {
        next(errorHandler(500,'error while deleting'));
    }
}

export const updateListing = async(req,res,rext) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing)
    {
        return next(errorHandler(404,'listing not fond'));
    }
    if(req.user.id !== listing.userRef)
    {
        return next(errorHandler(401,'not your listing'));
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(errorHandler(401,'not your listing'));
    }
}