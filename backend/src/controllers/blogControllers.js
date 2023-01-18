import express from 'express';
import blogModel from '../models/blogSchema';
import cloudinary from '../utils/cloudnary';
import upload from '../utils/multer';
import { authenticateToken } from '../controllers/userController';

function getBlogs(req, res) {
  blogModel.find({}, (err, data) => {
    err ? res.json({error:err.message}) : res.json(data);
  
  }).populate("comments")



}

async function addBlogs(req, res) {
  if (req.user) {
    const { blogTitle, blogDescription, blogContent } = req.body;
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const blog = new blogModel({
        blogTitle: blogTitle,
        blogDescription: blogDescription,
        blogImg: result.url,
        blogContent: blogContent,
        blogImgId: result.public_id,
      });
      await blog.save();
      res.json({message:"blog added",status:"success"});
    } catch (err) {
      res.json(blog);
    }
  }
}
async function deleteBlogs(req, res) {
  try {
    let blog = await blogModel.findById({ _id: req.params.id });
    await cloudinary.uploader.destroy(blog.blogImgId);

    await blogModel.findById({ _id: req.params.id }).deleteOne();
    res.json({message: `${req.params.id} has been delete`,status:"success"});
  } catch (err) {
    res.json({
      message:err
    }).status(401)
  }
}

async function updateBlog(req, res) {
  if (req.user) {
    let blog = await blogModel.findById({ _id: req.params.id });
    //delet the first image
    await cloudinary.uploader.destroy(blog.blogImgId);
    //add new image
    const result = await cloudinary.uploader.upload(req.file.path);
    //save with new document
    const { blogTitle, blogDescription, blogContent } = req.body;
    const data = {
      blogTitle: blogTitle,
      blogDescription: blogDescription,
      blogImg: result.url,
      blogContent: blogContent,
      blogImgId: result.public_id,
    };

    blog = await blogModel
      .updateOne({ _id: req.params.id }, data, (err, npd) => {})
      .clone();
    res.json(blog);
  }
}


module.exports = {
  getBlogs: getBlogs,
  addBlogs: addBlogs,
  deleteBlogs: deleteBlogs,
  updateBlog: updateBlog,
};
