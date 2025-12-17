const express=require("express");
const { connectdb } = require("./connect");
const { requestStripe, createPaymentIntent } = require("./stripeConnect");
const { AddOrder } = require("./service/addOrder");
const userRouter = require("./router/user.router");
const { auth } = require("./util/auth");

const app=express()
require('dotenv').config();
app.use(express.json())
connectdb()
app.post("/payment-sheet",requestStripe)
app.post("/create-payment-intent",createPaymentIntent)
app.post("/order",auth(),AddOrder)
app.use("/user", userRouter)

app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(3500,()=>{
    console.log("app listen")
})
