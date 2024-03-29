const Product=require("../models/product");
const formidable=require("formidable");
const _ =require("lodash");
const fs=require("fs");
const { sortBy } = require("lodash");


exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){      
            return res.status(400).json({
                error:'NOt able to get the product'
            })
        }
        req.product=product;
        next();
    })
}

exports.createProduct=(req,res)=>{
    let form =formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image!"
            })
        };

        const {name,category,description,stock,price} = fields;

        if(!name||!category||!description||!stock||!price){
            return res.status(400).json({
                error:"Please include all fields"
            })
        }

        let product=new Product(fields);

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    message:"Image size too large"
                })
            };
            product.photo.data=fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
        }

        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"unable to create product" 
                })
            };
            res.json(product);
        })
    })
}

exports.getProduct=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product);
}


exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct=(req,res)=>{
    let product=req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to delete"
            })
        }
        res.json({
            message:"Product deleted",
            deletedProduct
        })
    })
}


exports.updateProduct=(req,res)=>{
    let form =formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem encountered while updating"
            })
        };

        let product=req.product;
        product=_.extend(product,fields);

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    message:"Image size too large"
                })
            };
            product.photo.data=fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
        }

        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"updation failed!" 
                })
            };
            res.json(product);
        })
    })
}

exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit) : 8 ;
    let sortBy=req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("Category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(404).json({
                error:"NOt able to get products..."
            })
        }
        res.json(products);
    });
}

exports.updateStock=(req,res,next)=>{
    let myOperations =req.body.order.products.map(prod=>{
        return{
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock: -prod.count,sold: +prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"error in bulk operation!"
            })
        }
    });
    next();
}

exports.getAllCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"not able to fetch categories"
            })
        }
        res.json(category);
    })
}