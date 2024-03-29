const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory=(req,res)=>{
  const category=new Category(req.body);
  category.save((err,category)=>{
    if(err){
      return res.status(400).json({
        error:"Not able to create category!"
      });
    }
    res.send({category});
  })
}

exports.getCategory=(req,res)=>{
  return res.json(req.category);
}

exports.getAllCategories=(req,res)=>{
  Category.find().exec((err,categories)=>{
    if(err){
      return res.status(400).json({
        error:"No categories found!"
      });
    }
    res.json(categories);
  });
};

exports.updateCategory=(req,res)=>{
  const category=req.category;
  category.name=req.body.name;

  category.save((err,updatedcategory)=>{
    if(err){
      return res.status(400).json({
        error:"Not able to update category!"
      });
    }
    res.json(updatedcategory);  
  })
}

exports.removeCategory=(req,res)=>{
  const category=req.category;
  category.remove((err,removedcategory)=>{
    if(err){
      return res.status(400).json({
        error:"Not able to delete category"
      });
    }
    res.json({
      message:"category deleted"
    })
  })
}