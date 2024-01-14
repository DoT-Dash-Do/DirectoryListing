import express from 'express';
import { deleteU, getUserListings, test, updateU } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/authUser.js';
const router = express.Router();

router.get('/test',test);
router.patch('/update/:id',verifyToken,updateU);
router.delete('/delete/:id',verifyToken,deleteU);
router.get('/shlistings/:id',verifyToken,getUserListings)

export default router;