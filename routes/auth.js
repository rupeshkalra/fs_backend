const express =require("express");
const router =express.Router();
const {check ,validationResult} =require('express-validator');
const {signout ,signup ,signin,isSignedIn} = require("../controllers/auth");

router.post("/signup",[
check("name","NAME length should be: 3 minimum").isLength({min:3}),
check("email","It should be a mail").isEmail(),
check("password","min length: 3").isLength({min:3}),
], signup);

router.post("/signin",[
    check("email","It should be a mail").isEmail(),
    check("password","password required!").isLength({min:1}),
    ], signin);

router.get("/signout" ,signout);


module.exports =router;