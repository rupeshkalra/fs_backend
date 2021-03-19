const mongoose = require("mongoose");
const crypto =require("crypto");
const uuidv1 =require("uuid/v1");

var userSchema = new mongoose.Schema({
     name : {
         type : String,
         required:true,
         maxlength:32,
         trim: true
     },
     lastname : {
         type:String,
         maxlength:32,
         trim:true
     },
     email : {
         type: String,
         maxlength: 32,
         required: true,
         unique: true,
         trim: true
     },
     encrypted_password: {
         type: String,
         required: true
     },
     salt: String,
     role: {
         type: Number,
         default:0
     },
     purchases: {
         type: Array,
         default: []
     }
},
{timestamps:true}
);

userSchema.virtual("password")
.set(function(password){
    this._password=password;
    this.salt=uuidv1();
    this.encrypted_password= this.securepassword(password);
})
.get(function()
{
    return this._password;
})


userSchema.methods =
{    authenticate: function(plainpassword)
    {
          return this.securepassword(plainpassword) === this.encrypted_password;
    },
    
    securepassword: function(plainpassword)
    {
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256',this.salt)
            .update(plainpassword).digest('hex');
        } catch (error) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema );