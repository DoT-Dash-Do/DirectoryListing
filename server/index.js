import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();



mongoose.connect(process.env.MONGO_URI,{
    dbName:'lmaobmao'
}).then(()=>{
    console.log('connected to mongo');
})
.catch((err)=>{
    console.log(err)
});



const app = express();
app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
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