import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config()
const app =express();

app.get("/products",(req,res)=>{
    res.send("server is ready");
})
 
console.log(process.env.MONGO_URI);

app.listen(5001,()=>{
    connectDB();
    console.log("server startkfkfed atkd 5001");
}); 
