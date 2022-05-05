import express from 'express';
import {getUsers, createUser, getUsersId, deleteUser, updateUser} from '../controllers/login.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUsersId);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;