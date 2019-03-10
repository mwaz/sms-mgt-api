import { Router } from 'express';
import catchErrors from 'async-error-catcher'
import SmsController from '../controllers/smsController';
import passport from 'passport';

const smsController = new SmsController();
const router = new Router();

const authenticatedRoutes = passport.authenticate("jwt", {session: false} );

router.post('/send-sms', authenticatedRoutes, catchErrors(smsController.sendSms));
router.get('/read-sms', authenticatedRoutes, catchErrors(smsController.readSms));
router.get('/sms-status', authenticatedRoutes, catchErrors(smsController.getSmsStatus));
router.get('/read-sms/:smsId', authenticatedRoutes, catchErrors(smsController.readSingleSms));
router.delete('/delete-sms/:smsId', authenticatedRoutes, catchErrors(smsController.deleteSms));

router.use((error, req, res, next) => {
    if (error.type === 'ValidationError') {
        return res.status(422).jsend.fail({ errors: error.errors})
      };

      if (error.errors.smsMessage) {
        return res.status(409).jsend.fail({
          message: error.errors.smsMessage.message,
          field: 'smsMessage'
        })
      };
    
      if (error.errors.recipient) {
        return res.status(409).jsend.fail({
          message: error.errors.recipient.message,
          field: 'recipient'
        });
      };
      res.status(500).jsend.error({
        message: 'Something went wrong on the server.'
      });
    });
    
export default router;