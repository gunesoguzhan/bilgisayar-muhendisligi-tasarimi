import { Router } from 'express';
import index from '../controllers/homeController.js';
import room from '../controllers/roomController.js';

const router = Router();

router.route('/').get(index);
router.route('/room').get(room);

export default router;