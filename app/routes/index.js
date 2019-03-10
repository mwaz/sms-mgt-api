import { Router } from 'express';
import smsRoutes from './smsRoutes';
import userRoutes from './userRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/sms', smsRoutes);
router.use('/contacts', contactRoutes);

export default router;