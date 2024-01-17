import express from "express";
import {createReview,getReview} from '../controllers/review.controller.js';
const router = express.Router();

router.post('/create/:lst',createReview);
router.get('/getRevs/:lst',getReview);

export default router;