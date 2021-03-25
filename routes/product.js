const express=require("express");
const router =express.Router();

const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {getProductById}=require("../controllers/product");

//params
router.param("userId",getUserById);
router.param("productId",getProductById);

module.exports=router;