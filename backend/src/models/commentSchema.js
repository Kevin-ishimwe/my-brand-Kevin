const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blog' },
  name:{type:String},
  comment:{type:String,required:true},
  date:{type:Date,default:Date()}

});
const commentModel=mongoose.model('comment',commentSchema)
export default commentModel;