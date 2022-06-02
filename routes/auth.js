//require router from express
const router=require("express").Router()
const User=require("../models/User")
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const isAuth = require("../middlewares/isAuth");
const {
    validator,
    registerRules,
    LoginRules
}=require("../middlewares/validator")

router.post("/register",registerRules(),validator,async(req,res)=>{
    const{name,lastName,email,password}=req.body
    try{
let user=await User.findOne({email})
if(user){
    return res.send({msg:"user already exist"})
}
//create new user
user=new User({name,lastName,email,password})
//create Salt and hash
const salt=10;
const hashedPassword=await bcrypt.hash(password,salt)
//replace user passwored with hashed password
user.password=hashedPassword

//save the user
await user.save()


//sign the user
const payload={
    id:user._id
}

const token=await jwt.sign(payload,'sggggghh',{
    expiresIn:'7 days'
})


res.send({msg:"User registred with success",user,token})

    }
    catch (error){
    res.send({msg:"server error"})
    }
})
//@ Post api/auth/login
//@desc Login User
//@access Public
router.post("/login",LoginRules(),validator,async(req,res)=>{
    const{email,password}=req.body
    try{
    let user=await User.findOne({email})  
    if(!user){
        return res.send({msg:'Bad credentials ! email'})
    }

    //checkpassword
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.send({msg:'Bad Credentials!password '})
    }
//sign the user
const payload={
    id:user._id
}
//generate token

const token=await jwt.sign(payload,'sggggghh',{
    expiresIn:'7 days'
})
console.log(token)

   res.send({msg:"logged with success",user,token}) 
  }
    catch(error){
        console.log(error)
    }
})
//@route GET api/auth/user
//@desc get authentified user
//@access private
router.get("/user",isAuth,(req,res)=>{
    res.send({user:req.user})
})


module.exports=router