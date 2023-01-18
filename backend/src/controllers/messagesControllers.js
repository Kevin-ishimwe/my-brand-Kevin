import express from 'express';
import messageModel from '../models/messsageSchema';

function getMessages (req, res) {
  messageModel.find({}, (err, data) => {
    err ? console.log(err) : res.json(data);
  })
}

async function addMessages(req, res){
const { name, email, content } = req.body;
  const message = new messageModel({
    name: name,
    email: email,
    content: content,
  });
  console.log(req.body);
  try {
    await message.save();
    res.json({status:"success"});
  } catch (err) {
    res.json(err);
  }
}
async function deleteMessage (req, res){
  await messageModel.findById({ _id: req.params.id }).deleteOne();
  res.json({message: `${req.params.id} has been delete`,status:"sucess"});
}







module.exports = {
  getMessages: getMessages,
  addMessages: addMessages,
  deleteMessage: deleteMessage
};