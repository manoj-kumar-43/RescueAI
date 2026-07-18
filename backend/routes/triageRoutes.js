import { Router } from 'express';
import { analyzeSymptoms, getTriageHistory, getTriageById } from '../controllers/triageController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/analyze', protect, analyzeSymptoms);
router.get('/history', protect, getTriageHistory);
router.get('/:id', protect, getTriageById);

export default router;
