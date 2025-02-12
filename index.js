const express=require("express");

const port=8001;

const app=express();

// const db=require("./config/mongoose")

const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://bhargavitrapasiya12:OTUnLTQlfQAxcUJ2@cluster0.djlmy.mongodb.net/apidata",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("db is connected");
})
.catch((err)=>{
    console.log("db is not connected")
})

const passport=require("passport");
const jwtstrategy=require("./config/passport-jwt");
const session=require("express-session")



app.use(express.urlencoded());

app.use(session({
    name:"rnw",
    secret:"rnw",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/",require("./routes"))





app.listen(port,(err)=>{
    if(err){
        console.log("error")
    }
    console.log("server is start:"+port)
})


