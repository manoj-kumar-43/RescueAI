import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  addAllergy,
  removeAllergy,
  addMedication,
  removeMedication,
  addCondition,
  removeCondition,
  addEvent
} from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getProfile);
router.put('/', updateProfile);

router.post('/allergies', addAllergy);
router.delete('/allergies/:index', removeAllergy);

router.post('/medications', addMedication);
router.delete('/medications/:index', removeMedication);

router.post('/conditions', addCondition);
router.delete('/conditions/:index', removeCondition);

router.post('/events', addEvent);

export default router;
