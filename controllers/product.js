const Product=require("../models/product");
const formidable=require("formidable");
const _ =require("lodash");
const fs=require("fs");


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

