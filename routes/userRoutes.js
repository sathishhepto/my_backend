const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users',userController.getUsers);
router.get('/user', userController.createValidUser);
router.post('/create/user', userController.createUser);
router.post('/user/update/', userController.updateUser);
router.post('/user/login', userController.loginUsers);
router.delete('/:id', userController.deleteUser);
module.exports = router;
