import Review from "../models/reviews.model.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
export const createReview = async(req,res,next)=>{
    try {
        const{review,userRef}=req.body;
        const listingid = req.params.lst;
        const userNameob = await User.findById(userRef);
        const userName = userNameob.username;
        const rev = await Review.create({
            review,
            userRef,
            userName,
            listingid
        });
        res.status(201).json("review uploaded");
    } catch (error) {
        next(errorHandler(500,'not able too post review'));
    }
};
export const getReview = async(req,res,next)=>{
    try {
        console.log(req.params.lst);
        const rest = await Review.find({listingid:req.params.lst}).populate('_id');
        res.status(200).json(rest);
    } catch (error) {
        console.log(error);
    }
}