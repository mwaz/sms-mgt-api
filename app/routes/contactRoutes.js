import { Router } from 'express';
import catchErrors from 'async-error-catcher'
import ContactController from '../controllers/contactController';
import passport from 'passport';

const authenticatedRoutes = passport.authenticate("jwt", {session: false} );

const contactController = new ContactController();
const router = new Router();

router.post('/', authenticatedRoutes, catchErrors(contactController.addContact));
router.delete('/:contactId', authenticatedRoutes, catchErrors(contactController.deleteContact));
router.get('/:contactId', authenticatedRoutes, catchErrors(contactController.getContact));
router.get('/', authenticatedRoutes, catchErrors(contactController.getAllContacts));

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