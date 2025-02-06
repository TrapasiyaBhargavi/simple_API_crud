const Usersignup=require("../model/usersignup");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
module.exports.signup=async(req,res)=>{
    try{
        let checkemail=await Usersignup.find({email:req.body.email}).countDocuments();
        if(checkemail==0){
            if(req.body.password==req.body.confirmpassword){
                req.body.password=await bcrypt.hash(req.body.password,10)
                let signupuser=await Usersignup.create(req.body)
                if(signupuser){
                    return res.status(200).json({'msg':"signup sucefuully",data:signupuser});
                }
                else{
                    return res.status(200).json({'msg':"signup not sucefuully"});
                }

            }
            else{
                return res.status(200).json({'msg':"confirm and password are not match"})
            }
        }
        else{
            return res.status(200).json({'msg':"email is already exit"})
        }
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}

module.exports.signin=async(req,res)=>{
    try{
        let checkuseremail=await Usersignup.findOne({email:req.body.email});
        if(checkuseremail){
            let checkuserpassword=await bcrypt.compare(req.body.password,checkuseremail.password);
            if(checkuserpassword){
              let token=await jwt.sign({userdata:checkuseremail},"RNW")
              return res.status(200).json({'msg':"signin sucefully",data:token})
              
            }
            else{
                return res.status(200).json({'msg':"password is invalid"})
            }
        }
        else{
            return res.status(200).json({'msg':"email is invalid"})
        }
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}

