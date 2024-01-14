import express from 'express';
import { createListing,deleteListing,updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/authUser.js';
const router = express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/deleteListing/:id',verifyToken,deleteListing)
router.patch('/updateListing/:id',verifyToken,updateListing);
export default router;