import express from 'express';
import { submitContactFormNew } from '../controllers/review.controller.js';
import { getReviews } from '../controllers/review.controller.js'; // Add this import for the new controller function

const router = express.Router();

// POST route to submit a review
router.post('/review', submitContactFormNew);

// GET route to fetch all reviews
router.get('/reviews', getReviews); // Add this route

export default router;