const express=require("express");
const { connectdb } = require("./connect");
const { requestStripe, createPaymentIntent } = require("./stripeConnect");
const app=express()
require('dotenv').config();
app.use(express.json())
// connectdb()
app.post("/payment-sheet",requestStripe)
app.post("/create-payment-intent",createPaymentIntent)
app.listen(3500,()=>{
    console.log("app listen")
})
