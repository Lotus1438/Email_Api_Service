import express from 'express';
import {registerUser, getAllUsers} from '../controllers/register.js';

const router = express.Router();

router.post('/', registerUser);

router.get('/', getAllUsers);


export default router;