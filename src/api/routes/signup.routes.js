import express from 'express';
import { signUpDriver, signUpOperator } from '../controllers/signup.controller.js';

const router = express.Router();

router.post('/signup/driver', signUpDriver);
router.post('/signup/operator', signUpOperator);

export default router;