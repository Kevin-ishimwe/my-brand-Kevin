import express from 'express';
const userRoutes = express.Router();
import {
  addUser,
  getUsers,
  login,
  authenticateToken,
  deleteUser
} from '../controllers/userController';

userRoutes.post('/adduser', addUser);
userRoutes.get('/getusers', authenticateToken, getUsers);
userRoutes.post('/login', login);
userRoutes.delete('/deleteuser/:email',authenticateToken,deleteUser)

module.exports = {
  userRoutes: userRoutes,
  authenticateToken: authenticateToken,
};
