const User =require("../models/user");
const {check ,validationResult} =require("express-validator");
const jwt =require('jsonwebtoken');
const expressJwt=require('express-jwt');
const user = require("../models/user");

exports.signup =(req,res)=>{   
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    };
    const user =new User(req.body);
    user.save((err,user) =>{
         if(err)
         {
             return res.status(400).json({
                err:  "NOT able to signup"
             });
         }
         res.json({
             "name":user.name,
             "email":user.email
         });
    })
}
exports.signin=(req,res)=>{
       
    const{email,password}=req.body;
    const errors =validationResult(req);
    if(!errors.isEmpty())
    { 
         return res.status(422).json(
             {
                 error: errors.array()[0].msg
             });
    };
    User.findOne({email},(err,user)=>
    {
        if(err || !user)
        {
            return res.status(422).json({
               error : "User does not exists!"
            });
        };

        if(!user.authenticate(password))
        {
          return res.status(401).json({
              error : "Email and Password didn't match"
          });
        };

        //creating token
        const token =jwt.sign({_id : user._id},process.env.SECRET);

        //adding token to cookie
        res.cookie("token",token,{expire: new Date()+9999});
        

        //response to frontend

        const {_id,name,email,role}=user;
        return res.json({token , user:{_id ,name,email,role}});

    })

}
exports.signout=(req,res)=>
{  res.clearCookie("token");
   res.json({message:" User signout success "});
};

//protected route
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth"
});

//custom middleware

exports.isAuthenticated=(req,res,next)=>{
    const check= req.profile && req.auth && req.profile._id == req.auth._id;
    if(!check)
    {
        return res.status(403).json({
            error: "Access Denied"
        });
    };
    next();
};

exports.isAdmin=(req,res,next)=>
{
    if(req.profile.role===0)
    {
        return res.status(403).json({
            error: "Not Admin!"
        });
    };
    next();
};
