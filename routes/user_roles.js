import express from 'express';
import {createUserRole} from '../controllers/user_roles.js'

const router = express.Router();

router.post('/', createUserRole);

export default router;