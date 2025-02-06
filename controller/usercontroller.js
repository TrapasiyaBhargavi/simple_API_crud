const User=require("../model/usermodel")

module.exports.insertdata=async(req,res)=>{
    try{
        let userdata=await User.find()
        if(userdata){
            return res.status(200).json({'msg':"data view data sucefully",data:userdata})
        }
        else{
            return res.status(200).json({'msg':"not view"})
        }
 }
       
    
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}

module.exports.adddata=async(req,res)=>{
    try{
        let userdata=await User.create(req.body)
        if(userdata){
          return res.status(200).json({'msg':"data add sucefully",data:userdata})
        }
        else{
            return res.status(200).json({'msg':"data not add sucefully"})
        }
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}

module.exports.deletedata=async(req,res)=>{
    try{
        let deldata=await User.findByIdAndDelete(req.params.id)
        if(deldata){
            return res.status(200).json({'msg':"data  delete sucefully",data:deldata})
        }
        else{
            return res.status(200).json({'msg':"data not delet sucefully"})
        }
    }

catch(err){
    return res.status(400).json({'msg':"somthing is wrong",error:err})
}
}

module.exports.getsingledata=async(req,res)=>{
    try{
        console.log(req.query.dataId);
        let checkdata=await User.findById(req.query.dataId);
        if(checkdata){
            return res.status(200).json({'msg':"data get sucefully",data:checkdata})

        }
        else{
            return res.status(200).json({'msg':"data not get sucefully"})
        }
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}

module.exports.editdata=async(req,res)=>{
    try{
        console.log(req.body);
        let checkuserdata=await User.findById(req.params.id)
        if(checkuserdata){
            let edituserdata=await User.findByIdAndUpdate(req.params.id,req.body);
            if(edituserdata){
                return res.status(200).json({'msg':"data edit sucefully",data:edituserdata})
            }
            else{
                return res.status(200).json({'msg':"data edit not sucefully"})
            }
        }
        else{
            return res.status(200).json({'msg':"data not found"})
        }
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}