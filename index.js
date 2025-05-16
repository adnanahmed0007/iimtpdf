import dotenv from 'dotenv'; dotenv.config();
import express from "express";
import mongoose from "mongoose";
 import router from "./routes/Authentuicationroutes.js"
 import router1 from "./routes/Userpdfroutes.js";
 import cookieParser from "cookie-parser";
 import cors from "cors";
const app=express();
const port=80;

console.log(process.env.DATABASE_URL);
const url1 = `${process.env.DATABASE_URL}`;

 app.use(cors(
     {
        origin:'http://localhost:5173',  // Your React frontend URL
    credentials: true,
     }
     
)) 
 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/authenttication",router)
app.use("/user/pdf",router1);
app.use(express.static('public'))

app.use(async (req, res, next ) => {
  console.log(req.path);
  res.redirect("/");
  next()
})

 
 
const connect=mongoose.connect(url1)
.then(()=>
{
    app.listen(port,()=>
        {
            console.log(`we are on the port ${port}`)
            console.log(url1) 
        })

})
.catch((e)=>
{
    console.log(e)
})
 