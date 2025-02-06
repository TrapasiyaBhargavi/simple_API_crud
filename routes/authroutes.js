const express=require("express");

const routes=express.Router();

const userauthctl=require("../controller/authcontroller")

routes.post("/signup",userauthctl.signup);

routes.post("/signin",userauthctl.signin);

module.exports=routes;