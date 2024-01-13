import express from 'express';
import { googlesign, signin, signup } from '../controllers/auth.controller.js';
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",googlesign);
router.get("/get",signOut);
export default router;