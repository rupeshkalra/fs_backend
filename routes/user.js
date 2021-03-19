const express =require("express");

const router = express.Router();

const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const {getUser,getUserById} = require("../controllers/user");

router.param("userId",getUserById);
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);

module.exports = router;