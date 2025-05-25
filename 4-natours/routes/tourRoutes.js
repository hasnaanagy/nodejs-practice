const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();
// router.param('id', tourController.checkId);
router
  .route('/top-5-cheap')
  .get(tourController.top5Cheap, tourController.getTours);
router.route('/').get(tourController.getTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
