const mongoose = require('mongoose')
mongoose.connect('mongodb://username:password@ds347467.mlab.com:47467/artisanpractice')
const Post = require('./models/Posts')
const Comment = require('./models/Comments')
const express = require('express')
var http = require('http');
const process = require('process')
const bodyParser = require('body-parser')
const app = express()
var server = http.createServer(app);
const port = process.env.PORT || 5000
app.use(bodyParser.json()) 
const cors = require('cors')

 //Body Parser MiddleWare
app.use(express.json())
app.use(cors())
app.use(bodyParser())

app.get('/addPost',(req,res)=>{
    let data = {
        text:"New Post",
        username:"Joy"
    }
    Post.create(data,(err,doc)=>{
        if(err)console.log(err)
        else{
            console.log(doc)
        }
    })
})
app.get('/addComment:id',(req,res)=>{
    if(req.params.id){
        let data = {
            text:"New comment",
            username:"Joy"
        }
        Comment.create(data,(err,doc)=>{
            if(err)console.log(err)
            else{
                Post.findByIdAndUpdate(req.params.id,{$push:{comments:doc._id}},{new:true},(error,data)=>{
                    if(error)console.log(error)
                    else{
                        console.log(data)
                    }
                })

            }
        })
    }
})


app.get('/getPosts',(req,res)=>{
    Post.find({}).populate('comments').exec((err,docs)=>{
        if(err)return res.json({err,message:"Failed"})
        else{
            return res.json({
                message:"Success",
                docs
            })
        }
    })
})
// const Schema = mongoose.Schema

// const commentsSchema = new mongoose.Schema({
//     text:String,
//     username:String
// })


// const CommentModel =  mongoose.model('comment',commentsSchema)

// const postSchema = new mongoose.Schema({
//     text:String,
//     username:String,
//     comments:[{type:Schema.Types.ObjectId,ref:"comment"}]
// })

// const PostModel =  mongoose.model('post',postSchema)


// const aPost = new PostModel({text:"New Post",username:"Joy"})

// const aComment = new CommentModel({text:"New comment",username:"Joy"})

// aComment.save()

// aPost.comments.push(aComment)
// aPost.save()


server.listen(port,()=>{
    console.log('Server started on port ',port)
})