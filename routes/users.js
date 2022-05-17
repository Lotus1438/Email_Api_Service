import express from 'express';
import jwtAuthz from 'express-jwt-authz';
import {getAllUsers, createUser, getUserById, deleteUser, updateUser, filterUser} from '../controllers/users.js';
import { cookieJwtAuth } from '../middleware/cookieJwtAuth.js';

const router = express.Router();

// const checkPermissions = jwtAuthz(["read:messages"], {
//     customScopeKey: "permissions"
// });


router.post('/', cookieJwtAuth, createUser);

router.get('/', cookieJwtAuth, getAllUsers,);

router.get('/:user_id', cookieJwtAuth, getUserById);

router.put('/:user_id', cookieJwtAuth, updateUser);

router.delete('/:user_id', cookieJwtAuth, deleteUser);

router.post('/filters', cookieJwtAuth, filterUser)

export default router;