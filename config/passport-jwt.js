const passport=require("passport");

const jwtstrategy=require("passport-jwt").Strategy;

const extractstrategy=require("passport-jwt").ExtractJwt;

let opts={
    jwtFromRequest :extractstrategy.fromAuthHeaderAsBearerToken(),
    secretOrKey:"RNW"
};

let signup=require("../model/usersignup")
passport.use(new jwtstrategy(opts,async(payload,done) =>{
    let checkemail=await signup.findOne({email:payload.userdata.email});
    if(checkemail){
        return done(null,checkemail)
    }
    else{
        return done(null,false)
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let userdata=await signup.findById(id);
    if(userdata){
        return done(null,userdata);
    }
    else{
        return done(null,false)
    }
})

module.exports=passport;