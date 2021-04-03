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

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile;
    const order=new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to create order!"
            })
        }
        res.json(order);
    })
}

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                erro:"not able to get orders"
            })
        }
        res.json(order);
    })

}