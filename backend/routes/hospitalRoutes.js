import { Router } from 'express';
import {
  getHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital
} from '../controllers/hospitalController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getHospitals);
router.get('/:id', getHospitalById);
router.post('/', protect, authorize('admin'), createHospital);
router.put('/:id', protect, authorize('admin'), updateHospital);
router.delete('/:id', protect, authorize('admin'), deleteHospital);

export default router;
