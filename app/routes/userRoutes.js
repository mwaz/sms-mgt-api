import { Router } from 'express';
import catchErrors from 'async-error-catcher'
import ContactController from '../controllers/authController';

const contactController = new ContactController();
const router = new Router();

router.post('/signup', catchErrors(contactController.addContact));

router.post('/login', catchErrors(contactController.loginContact));

router.use((error, req, res, next) => {
if (error.type === 'ValidationError') {
    return res.status(422).jsend.fail({ errors: error.errors})
  };

  if (error.errors.username) {
    return res.status(409).jsend.fail({
      message: error.errors.username.message,
      field: 'username'
    })
  };

  if (error.errors.phone) {
    return res.status(409).jsend.fail({
      message: error.errors.phone.message,
      field: 'phone'
    });
  };
  res.status(500).jsend.error({
    message: 'Something went wrong on the server.'
  });
});

export default router;