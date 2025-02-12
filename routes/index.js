const express=require("express");

const routes=express.Router();

const userctl=require("../controller/usercontroller");

const User=require("../model/usermodel");

const passport=require("passport")

routes.get("/",passport.authenticate('jwt',{failureRedirect:"/unauth"}),userctl.insertdata);

routes.get("/unauth",async(req,res)=>{
    return res.status(400).json({'msg':"your api authenticate"})
})

routes.post("/adddata",passport.authenticate('jwt',{failureRedirect:"/unauth"}),User.Uploadimag,userctl.adddata);

routes.delete("/deletedata/:id",passport.authenticate('jwt',{failureRedirect:"/unauth"}),userctl.deletedata);

routes.get("/getsingledata",passport.authenticate('jwt',{failureRedirect:"/unauth"}),userctl.getsingledata);

routes.patch("/editdata/:id",passport.authenticate('jwt',{failureRedirect:"/unauth"}),User.Uploadimag,userctl.editdata);

routes.get("/statuschange",passport.authenticate('jwt',{failureRedirect:"/unauth"}),userctl.statuschange)

routes.post("/multipledelete",passport.authenticate('jwt',{failureRedirect:"/unauth"}),userctl.multipledelete)

routes.use("/auth",require("./authroutes"));



module.exports=routes;

