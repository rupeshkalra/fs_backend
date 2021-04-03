const express=require("express");
const router =express.Router();

const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth");
const {getUserById,pushOrderinPurchaseList}=require("../controllers/user");
const {updateStock}=require("../controllers/product");
const {getOrderById,createOrder}=require("../controllers/order");

//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

//actual routes
router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderinPurchaseList,updateStock,createOrder);


module.exports=router;