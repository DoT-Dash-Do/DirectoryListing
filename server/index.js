import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO_URI,{
    dbName:"UsersData"
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
app.listen(3431,()=>{
    console.log('server running on port 3431');
});