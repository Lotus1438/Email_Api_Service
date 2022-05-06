import express from 'express';
import {loginUser, getAllUsers} from '../controllers/login.js';

const router = express.Router();

router.post('/', loginUser);
router.get('/', getAllUsers);


export default router;