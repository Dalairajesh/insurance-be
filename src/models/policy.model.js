const mongoose = require('mongoose')
const policySchema = mongoose.Schema({
    policyNumber:{
        type:String,
        // required: true,
       },
    startDate:{
        type:String,
        // required:true
    },
    endDate:{
        type:String,
        // required:true
    },
    policyCategoryId:{
        type: mongoose.Schema.ObjectId,
        ref:"LOB"
    },
    companyId:{
        type: mongoose.Schema.ObjectId,
        ref:"Carrier"
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    }

},{timestamps:true})

module.exports = mongoose.model('Policy', policySchema)