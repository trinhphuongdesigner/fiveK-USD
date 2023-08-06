const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  passportConfigUser,
  passportConfigLocalUser,
} = require('../../middleWares/passportUser');

passport.use('jwtUser', passportConfigUser);
passport.use('localUser', passportConfigLocalUser);

const { validateSchema } = require('../../helpers');
const {
  getDetailSchema,
} = require('./validations');
const {
  getAll,
  create,
  getDetail,
} = require('./controller');
const allowRoles = require('../../middleWares/checkRole');

router.route('/')
  .get(getAll)
  .post(
    passport.authenticate('jwtUser', { session: false }),
    allowRoles('ADMIN', 'CONTRIBUTE', 'MANAGER'),
    // validateSchema()
    create,
  )

router.route('/:id')
  .get(validateSchema(getDetailSchema), getDetail)

module.exports = router;
