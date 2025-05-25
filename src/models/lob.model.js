const mongoose = require('mongoose')
const lobSchema = mongoose.Schema({
    categoryName:{
        type:String,
        // required: true,
       },
},{timestamps:true})

module.exports = mongoose.model('LOB', lobSchema)