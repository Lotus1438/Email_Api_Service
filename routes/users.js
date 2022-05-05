import express from 'express';
import {getAllUsers, createUser, getUserById, deleteUser, updateUser} from '../controllers/users.js';

const router = express.Router();

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:user_id', getUserById);

router.put('/:user_id', updateUser);

router.delete('/:user_id', deleteUser);

export default router;