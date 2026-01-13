const express = require('express');
const router = express.Router();
const toursController = require('../../../controllers/api/v1/admin/tours.controller');

// Tours routes
router.get('/tours', toursController.getTours);
router.get('/tours/:id', toursController.getTourById);
router.post('/tours', toursController.createTour);
router.put('/tours/:id', toursController.updateTour);
router.delete('/tours/:id', toursController.deleteTour);

module.exports = router;

