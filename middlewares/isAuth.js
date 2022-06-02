//require jwt 
const res = require("express/lib/response");
const jwt= require ("jsonwebtoken")

//require the use Schema
const User=require('../models/User')

const isAuth=async(req,res,next)=>{
    try{
        const token=req.headers['x-auth-token'];  
    
    //check for token
    if(!token)
        return res.send({msg:'No token,authorization denied '});

    //Verify token
    const decoded=await jwt.verify(token,'sggggghh')
    
    
    const user=await User.findById(decoded.id)

    //check for user 
    if(!user){
        return res.send({msg:"authorization denied"})
    }

    //create user
    req.user=user
  next()
    }
    catch(error){
        return res.send({msg:"Token is not valid "})
    }
    
}
module.exports=isAuth