const mongoose =require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    count: Number, 
    description: String,
     image: String, 
     ingredients:mongoose.SchemaTypes.Array, 
     title: String
});
module.exports.Order = mongoose.model('Order', orderSchema);