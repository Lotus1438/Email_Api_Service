import express from 'express';
import {loginUser, getAllUsers } from '../controllers/login.js';
import { cookieJwtAuth } from '../middleware/cookieJwtAuth.js';

const router = express.Router();

router.post('/', loginUser);
router.get('/',cookieJwtAuth, getAllUsers);


export default router;