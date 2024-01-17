import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import reviewsRouter from './routes/reviews.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO_URI,{
    dbName:'ListingProj'
}).then(()=>{
    console.log('connected to mongo');
})
.catch((err)=>{
    console.log(err)
});



const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);
app.use('/api/reviews',reviewsRouter);
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});
app.listen(3431,()=>{
    console.log('server running on port 3431');
});