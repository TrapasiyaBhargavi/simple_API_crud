const mongoose=require("mongoose");

const path=require("path");
const imagespath="/Uploads";
const multer=require("multer");
const { type } = require("os");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const imagestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,".."+imagespath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
})

userSchema.statics.Uploadimag=multer({storage:imagestorage}).single("images");
userSchema.statics.imgpath=imagespath;

const User=mongoose.model("User",userSchema);

module.exports=User;