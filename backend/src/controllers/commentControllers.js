import express from 'express';
import commentModel from '../models/commentSchema';
import blogModel from '../models/blogSchema';

async function addComment(req, res) {
  const { comment, name } = req.body;
  console.log(req.params.id);
  const newComment = new commentModel({
    blog: req.params.id,
    name: name,
    comment: comment,
  });
    await newComment.save();

    await blogModel
      .find({ _id: req.params.id })
      .updateOne(
        { _id: req.params.id },
        { $addToSet: { comments: newComment } },
        (err, data) => {
          err
            ? res.json(err)
            : res.json({ message: 'comment added', status: 'sucess' });
        }
      )
      .clone();
}
async function getComments(req, res) {
  commentModel.find({}, (err, data) => {
    err ? res.json({ message: 'failed',status:"failed" }) : res.json(data);
  });
}

async function deleteComments(req,res){
    await commentModel.find({_id:req.params.id}).deleteOne()
    res.json({message:"comment deleted"})
}




module.exports = {
  addComment: addComment,
  getComments: getComments,
  deleteComments: deleteComments,
};
