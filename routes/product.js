const express=require("express");
const router =express.Router();

const {isAdmin,isAuthenticated,isSignedIn,}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct}=require("../controllers/product");

//params
router.param("userId",getUserById);
router.param("productId",getProductById);

//routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);
router.delete("/product/:userId/:productId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);
router.put("/product/:userId/:productId",isSignedIn,isAuthenticated,isAdmin,updateProduct);

module.exports=router;