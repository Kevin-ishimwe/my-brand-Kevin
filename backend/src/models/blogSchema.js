const mongoose =require('mongoose')
const blogSchema= new mongoose.Schema({
    blogTitle:{type:String,required:true},
    blogDescription:{type:String,required:true},
    blogImg:{type:String,
        required:true},
    blogContent:{type:String,required:true},
    blogImgId:{type:String,required:true},
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
})
const blogModel=mongoose.model("blog",blogSchema)
module.exports=blogModel