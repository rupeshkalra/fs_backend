const express =require("express");
const router=express.Router();

const {getCategoryById,getCategory,createCategory,getAllCategories} =require("../controllers/category");
const {getUserById} =require("../controllers/user");
const {isAdmin,isSignedIn,isAuthenticated} =require("../controllers/auth");

//Params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//Routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);
router.get("/category/:categoryId",getCategory);
router.get("/categories", getAllCategories);


module.exports=router;
