import express from 'express';
import {getAllUsers, createUser, getUserById, deleteUser, updateUser} from '../controllers/users.js';
import {authorize, permit} from '../controllers/user_roles.js';
import { cookieJwtAuth } from '../middleware/cookieJwtAuth.js';

const router = express.Router();

router.post('/', cookieJwtAuth, createUser);

router.get('/', cookieJwtAuth, getAllUsers,);

router.get('/:user_id', cookieJwtAuth, getUserById);

router.put('/:user_id', cookieJwtAuth, updateUser);

router.delete('/:user_id', cookieJwtAuth, deleteUser);

export default router;