const express=require("express");
const router =express.Router();

const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {getProductById,createProduct}=require("../controllers/product");

//params
router.param("userId",getUserById);
router.param("productId",getProductById);

//routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

module.exports=router;