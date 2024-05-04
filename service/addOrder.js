const { Order } = require("../module/order")

module.exports.AddOrder=async(req,res)=>{
try {
    const {data}=req.body
    const NewOrders=await Order.insertOnce(data)
    res.json(NewOrders)
} catch (error) {
    res.status(400).json(error)
}
}
