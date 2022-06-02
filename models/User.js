//require mongoose
const mongoose=require('mongoose')
const { stringify } = require('nodemon/lib/utils')

//Require Schema from mongoose
const Schema=mongoose.Schema

//Create the Schema
const userSchema=new  Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
    type:String,
    required:true

    }
})
module.exports=User=mongoose.model("User",userSchema)