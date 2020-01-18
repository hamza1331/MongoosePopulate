const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new mongoose.Schema({
    text:String,
    username:String
})

module.exports = mongoose.model('comments', commentsSchema);

