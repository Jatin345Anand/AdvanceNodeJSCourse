const express = require('express');
const imageRouter = express.Router();
const imageController = require('./../controllers/imageController');
imageRouter.route('/top-5-cheap').get(imageController.aliasTopImages, imageController.getAllImages);
imageRouter.route('/image-stats').get(imageController.getImagesStats);
imageRouter.route('/image-monthy-plan/:year').get(imageController.getMonthlyPlan);
imageRouter.route('/').get(imageController.getAllImages).post(imageController.addImage);
imageRouter.route('/:id').get(imageController.getImagebyId).patch(imageController.updateAImage).delete(imageController.deleteImage);
module.exports = imageRouter;