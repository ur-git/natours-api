import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';

//create new router and save in a variable
const router = express.Router();

// '/' is root of this '/api/v1/tours' url
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
