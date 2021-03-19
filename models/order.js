const mongoose =require("mongoose");

const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
 product:{
     type: ObjectId,
     ref: "Product"
 },
 name:{
     type:String
 },
 count:Number,
 price:Number
});

const ProductCart =mongoose.model("ProductCart",ProductCartSchema);

const OrderSchema = new mongoose.Schema({
  
    products:[ProductCartSchema],
    transaction_id: {},
    amount:{type:Number},
    address:{
        type:String,
        maxlength:200
    },
    updated:{
        type:Date
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
},
{timestamps:true}
);

const Order =mongoose.model("Order",OrderSchema);
module.exports = {Order , ProductCart};