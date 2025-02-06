const mongoose=require("mongoose");

const UsersignupSchema=mongoose.Schema({
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
    }
})

const Usersignup=mongoose.model("Usersignup",UsersignupSchema);

module.exports=Usersignup;