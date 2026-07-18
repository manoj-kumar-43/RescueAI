import { Router } from 'express';
import { getActivities, addActivity } from '../controllers/activityController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getActivities);
router.post('/', addActivity);

export default router;
