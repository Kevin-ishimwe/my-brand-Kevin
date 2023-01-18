const mongoose =require('mongoose')
//message model schema
const messageSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    content:{type:String,required:true}
})
 
const messageModel = mongoose.model("message",messageSchema)

module.exports=messageModel