const {Order , ProductCart} =require("../models/order");

exports.getOrderById=(req,res,next,id)=>{
    Order.find(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"not able to retrieve your order"
            })
        }
        req.order=order;
        next();
    });
}