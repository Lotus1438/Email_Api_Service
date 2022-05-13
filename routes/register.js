import express from 'express';
import {registerUser, getAllUsers, getUserById, deleteUser} from '../controllers/register.js';

const router = express.Router();

router.post('/', registerUser);

router.get('/', getAllUsers);

router.get('/:user_id', getUserById);

router.delete('/:user_id', deleteUser);



export default router;