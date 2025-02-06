const express=require("express");

const port=8001;

const app=express();

const db=require("./config/mongoose")

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


