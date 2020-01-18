const mongoose = require('mongoose')
mongoose.connect('mongodb://username:password@ds347467.mlab.com:47467/artisanpractice')


const lectureSchema = new mongoose.Schema({
    title:String,
    description:{
        type:String,
        default:"sfusidfshfo hsddh sdiof sdj o"
    },
    courseID:String
})

const courseSchema = new mongoose.Schema({
    title:String,
    lectures:[lectureSchema]
})

const LectureModel = mongoose.model('lecture',lectureSchema)
const CourseModel = mongoose.model('course',courseSchema)
const aLecture = new LectureModel()
const aCourse = new CourseModel({title:"sdihovhdvsdzxc"})
let data = {
    title:"sdfhiosd fjsd",
    courseID:" sjdoijd123"
}
aCourse.lectures.push(data)

aCourse.save((err,data)=>{
    if(err)console.log(err)
    else
    {
        aCourse.lectures.push(data,(error,doc)=>{
            if(error)console.log(error)
            else{
                console.log(data)
            }
        })
    }
})
LectureModel.create(data,(err,doc)=>{
    if(err)console.log(err)
    else{
        console.log('Lecture => ',data)
    }
})
