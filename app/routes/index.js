import { Router } from 'express';
import smsRoutes from './smsRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/sms', smsRoutes);

export default router;