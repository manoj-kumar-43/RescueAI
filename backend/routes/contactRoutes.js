import { Router } from 'express';
import {
  getContacts,
  addContact,
  updateContact,
  toggleContactStatus,
  deleteContact,
  broadcastAlert,
  getAlertRules,
  updateAlertRules
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', getContacts);
router.post('/', addContact);
router.put('/:id', updateContact);
router.patch('/:id/toggle-status', toggleContactStatus);
router.delete('/:id', deleteContact);

router.post('/broadcast', broadcastAlert);

router.get('/alert-rules', getAlertRules);
router.put('/alert-rules', updateAlertRules);

export default router;
