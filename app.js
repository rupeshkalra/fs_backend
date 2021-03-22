require("dotenv").config();

const mongoose =require("mongoose");
const express =require("express");
const app= express();

const bodyParser =require("body-parser");
const cors =require("cors");
const cookieParser = require("cookie-parser");

const authRoutes =require("./routes/auth");
const userRoutes =require("./routes/user");
const categoryRoutes=require("./routes/category");

//DB CONNECTION
mongoose.connect(process.env.DATABASE,
{useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true})
.then( ()=>{
    console.log("DB CONNECTED")
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);

//PORT
const port = process.env.port || 8000;


app.listen(port, ()=> {
console.log(`app is running at ${port}`);
});