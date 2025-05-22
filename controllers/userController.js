// controllers/userController.js
const User = require('../models/userModel');
const Role =require('../models/roleModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendErrorResponse, sendSuccessResponse } = require('../helper/handleerror');
const logger = require('../utils/logger');
const options = { expiresIn: '2h' };
const secretKey = process.env.SECRETKEY;
// Get all users
exports.getUsers = async (req, res) => {
  try {
    // if (!req.user) {
    //   return sendErrorResponse(res, 401, 'Unauthorized');
    // }

    // Extract page and limit from query, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']], // optional: sort by createdAt
    });

    const totalPages = Math.ceil(count / limit);

    logger.info('Fetched users with pagination successfully');

    return sendSuccessResponse(res, {
      users,
      pagination: {
        totalItems: count,
        currentPage: page,
        totalPages
      }
    }, 'Fetched users successfully');
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    return sendErrorResponse(res, 500, 'Error fetching users');
  }
};

exports.createValidUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Authorization header missing or malformed');
      return sendErrorResponse(res, 400, 'Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);

    logger.info(`Token verified successfully for user: ${decoded.email}`);
    return sendSuccessResponse(res, decoded, 'Token is valid');
  } catch (error) {
    logger.error(`Error verifying token: ${error.message}`);
    return sendErrorResponse(res, 500, 'Error verifying token');
  }
};
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const {name, email, age, phoneNumber,roleId} = req.body;
    const newUser = await User.create({name, email, age, phoneNumber });
    return sendSuccessResponse(res, newUser, 'User Created');
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, 400, 'Error creating user');
  }
};
// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, age, phoneNumber } = req.body;
    user.name = name;
    user.email = email;
    user.age = age;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Error updating user" });
  }
};


// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user' });
  }
};


exports.loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (checkUser) {
        const token = jwt.sign({ id: checkUser.id, email: checkUser.email }, secretKey, options);
        res.cookie('token', token, {
      httpOnly: true, 
      secure: 'development', 
      maxAge: 3600000, 
    });
        res.status(200).json({ token });
  
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking user" });
  }
};

exports.getRoles=async ()=>{

}
