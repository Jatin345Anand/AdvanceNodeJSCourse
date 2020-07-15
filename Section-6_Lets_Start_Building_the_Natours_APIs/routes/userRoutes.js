// Mounting of the routers...
const express = require('express');
const userRouter = express.Router();
const userController = require('./../controllers/userController.js');
// Create a check Body Middleware
// Check if body contains the name and address property
// If not, send back 400 (Bad request)
// And it to the post handler stack.
userRouter.param('id', userController.checkID);
userRouter.route('/').get(userController.getAllUsers).post(userController.checkBody, userController.addUser);
userRouter.route('/:id').get(userController.getUserbyId).patch(userController.updateAUses).delete(userController.deleteUser);

module.exports = userRouter;