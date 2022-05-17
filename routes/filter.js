import express from 'express';
import {filterUser} from '../controllers/users.js'

const router = express.Router();

router.post('/filters', filterUser)

export default router;