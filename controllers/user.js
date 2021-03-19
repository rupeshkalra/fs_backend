const User =require("../models/user");


exports.getUserById =(req,res,next,id)=>
{
    User.findById(id).exec((err,user)=>
    {
          if(err)
          {
              return res.status(400).json({
                  error: "user not found!!"
              });
          };
          req.profile =user;
          next();
    });
};

exports.getUser = (req,res)=>
{    
    req.profile.salt= undefined;
    req.profile.encrypted_password= undefined;
    req.profile.createdAt= undefined;
    req.profile.updatedAt= undefined;
    
    return res.json(req.profile);
};