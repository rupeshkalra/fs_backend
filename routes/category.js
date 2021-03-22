const express =require("express");
const router=express.Router();

const {getCategoryById,createCategory} =require("../controllers/category");
const {getUserById} =require("../controllers/user");
const {isAdmin,isSignedIn,isAuthenticated} =require("../controllers/auth");

//Params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//Routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

module.exports=router;
