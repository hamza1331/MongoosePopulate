const mongoose = require('mongoose')

const Schema = mongoose.Schema


const postSchema = new mongoose.Schema({
    text:String,
    username:String,
    comments:[{type:Schema.Types.ObjectId,ref:"comments"}]
})
module.exports = mongoose.model('posts',postSchema)
