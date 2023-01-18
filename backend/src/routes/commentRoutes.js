import express from 'express';
import {
  addComment,
  getComments,
  deleteComments,
} from '../controllers/commentControllers';
const commentRoutes = express.Router();

commentRoutes.post('/addcomment/:id',addComment);
commentRoutes.get('/getcomments',getComments);
commentRoutes.delete('/deletecomment/:id', deleteComments);

export default commentRoutes;
