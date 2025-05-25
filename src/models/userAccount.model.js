const mongoose = require('mongoose')
const userAccountSchema = mongoose.Schema({
    accountName:{
        type:String,
       
       },
       userId:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    }   
},{timestamps:true})

module.exports = mongoose.model('User_Account', userAccountSchema)