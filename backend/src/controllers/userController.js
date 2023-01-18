import express from 'express';
import userModel from '../models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function addUser(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.json(user).status(201);
  } catch (err) {
    res.json({ error: err.message }).status(500);
    next();
  }
}
async function getUsers(req, res) {
  if (req.user) {
    userModel.find({}, (err, data) => {
      err ? res.status(401).json({ error: err.message }) : res.json(data);
    });
  } else {
    res.json({ error: 'not authorized to access data',status:"failed" });
  }
}
async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.find({ email: email }).exec();
  if (user[0] == null) {
    res.json({ message: 'wrong user email' }).status(400);
  } else {
    if (await bcrypt.compare(password, user[0].password)) {
      const accessToken = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET
      );
      res
        .json({
          message: `successfully loged in here is your access token`,
          token: accessToken,
          status: 'sucess',
        })
        .status(201);
    } else {
      res.json({ message: 'wrong password' }).status(300);
    }
  }
}

async function deleteUser(req, res) {
  if (req.user) {
    console.log(req.params.email);
    await userModel.find({ email: req.params.email }).deleteOne();
    res.json({
      message: `successfully deleted user with email ${req.params.email}`,
      status: 'success',
    });
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res
      .status(401)
      .json({ message: 'not authorized', status: 'failed' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    req.user = user;
    next();
  });
}

module.exports = {
  addUser: addUser,
  getUsers: getUsers,
  login: login,
  deleteUser: deleteUser,
  authenticateToken: authenticateToken,
};
