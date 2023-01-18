import express from 'express';
const MessageRoutes = express.Router();
import {
  getMessages,
  addMessages,
  deleteMessage,
} from '../controllers/messagesControllers';

//get messages
MessageRoutes.get('/getmessages',getMessages);
//add messages
MessageRoutes.post('/addmessages',addMessages);
MessageRoutes.delete('/deletemessage/:id', deleteMessage);
//there wont be any need for an update route since messages dont need updates
export default MessageRoutes;
