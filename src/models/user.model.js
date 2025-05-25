const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        // required: true,
       },
    dob:{
        type:String,
        // required:true
    },
    phoneNo:{
        type:String,
        // required:true
    },
    state:{
        type:String,
        // required:true
    },
    zipCode:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    gender:{
        type:String,
        // required:true
    },
    userType:{
        type:String,
        // required:true
    }   
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)