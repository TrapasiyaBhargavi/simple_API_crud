const User=require("../model/usermodel")

const path=require("path");

const fs=require("fs");

module.exports.insertdata=async(req,res)=>{
    try{

        var search='';
        if(req.query.search){
            search=req.query.search
        }

        let page=0;
        let per_page=2;
        if(req.query.page){
            page=req.query.page
        }
        let userdata=await User.find({status:true,$or:[
            {username:{$regex:search}}
        ]}).sort({username:1}).skip(page*per_page).limit(per_page);

        let totalusercount=await User.find({status:true,$or:[
            {username:{$regex:search}}
        ]}).countDocuments();

        let totalrecord=Math.ceil(totalusercount/per_page);

        let userdatafalse=await User.find({status:false});

        if(userdata){
            return res.status(200).json({'msg':"data view data sucefully",data:userdata,userdeactive:userdatafalse,totalrecord,page})
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
       
        let Images='';
        if(req.file){
            Images=await User.imgpath+"/"+req.file.filename;
        }
        req.body.images=Images;

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

        let finddata=await User.findById(req.params.id);
        if(finddata){
           try{
            let deletimg=path.join(__dirname,"..",finddata.images);
            await fs.unlinkSync(deletimg)
           }catch{
            return res.status(200).json({'msg':"images not found"})
           }
           let deldata=await User.findByIdAndDelete(req.params.id)
           if(deldata){
               return res.status(200).json({'msg':"data  delete sucefully",data:deldata})
           }
           else{
               return res.status(200).json({'msg':"data not delet sucefully"})
           }
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
       if(req.file){
        let checkuserdata=await User.findById(req.params.id);
        try{
            let deletimg=path.join(__dirname,"..",checkuserdata.images);
            await fs.unlinkSync(deletimg)
           }catch{
            return res.status(200).json({'msg':"images not found"})
           }

           req.body.images=await User.imgpath+"/"+req.file.filename
           if(checkuserdata){
            let edituserdata=await User.findByIdAndUpdate(req.params.id,req.body);
            if(edituserdata){
                let findid=await User.findById(edituserdata._id)
                return res.status(200).json({'msg':"data edit sucefully",data:findid})
            }
            else{
                return res.status(200).json({'msg':"data edit not sucefully"})
            }
        }
        else{
            return res.status(200).json({'msg':"data not found"})
        }
       }
       else{
          let checkuserdata=await User.findById(req.params.id);
          req.body.images=checkuserdata.images;
          if(checkuserdata){
            let edituserdata=await User.findByIdAndUpdate(req.params.id,req.body);
            if(edituserdata){
                let findid=await User.findById(edituserdata._id)
                return res.status(200).json({'msg':"data edit sucefully",data:findid})
            }
            else{
                return res.status(200).json({'msg':"data edit not sucefully"})
            }
        }
        else{
            return res.status(200).json({'msg':"data not found"})
        }
       }
        
       
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}

module.exports.statuschange=async(req,res)=>{
    try{
        let checkuser=await User.findById(req.query.userid);
        if(checkuser){
            if(req.query.status=='true'){
                let checkstatusdata=await User.findByIdAndUpdate(req.query.userid,{status:false});
                if(checkstatusdata){
                    return res.status(200).json({'msg':"data Deactive"})
                }
                else{
                    return res.status(200).json({'msg':"data not Deactive"})
                }
            }
            else{
                let checkstatusdata=await User.findByIdAndUpdate(req.query.userid,{status:true});
                if(checkstatusdata){
                    return res.status(200).json({'msg':"data active"})
                }
                else{
                    return res.status(200).json({'msg':"data not active"})
                }
            }
        }
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}

module.exports.multipledelete=async(req,res)=>{
    try{
        let deleteuserdata=await User.deleteMany({_id:{$in:req.body.Ids}});
        if(deleteuserdata){
            return res.status(200).json({'msg':"data delete"})
        }
        else{
            return res.status(200).json({'msg':"data not delete"})
        }
    }
    catch(err){
        return res.status(400).json({'msg':"somthing is wrong",error:err})
    }
}