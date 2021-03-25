const mongoose =require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
       name :{
           type: String,
           required: true,
           trim: true, 
           maxlength: 32
       },
       description:
       {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
       },
       price:
       {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32
       },
       category:
       {
           type: ObjectId,
           required:true,
           ref:"Category"
       },
       stock:
       {
           type:Number
       },
       sold:{
           default: 0,
           type: Number
       },
       photo:
       {
           data: Buffer,
           contentType: String
       }
    },
    {timestamps:true}
    );

    module.exports = mongoose.model("Product",productSchema);