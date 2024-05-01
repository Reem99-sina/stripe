const express=require("express");
const { connectdb } = require("./connect");
const { requestStripe } = require("./stripeConnect");
const app=express()
require('dotenv').config();
app.use(express.json())
connectdb()
app.post("/payment-sheet",requestStripe)
app.listen(3400,()=>{
    console.log("app listen")
})
