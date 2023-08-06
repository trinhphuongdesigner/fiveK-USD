var express = require('express');
const router = express.Router();

// const passport = require('passport');

// const {
//   passportConfigUser,
//   passportConfigLocalUser,
// } = require('../../middleWares/passportUser');

// passport.use('jwtUser', passportConfigUser);
// passport.use('localUser', passportConfigLocalUser);

const articleRouter = require('./article/router');
const authRouter = require('./auth/router');
const categoriesRouter = require('./category/router');
const userRouter = require('./user/router');

router.use('/articles', articleRouter);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/users', userRouter);

// router.use('/orders', passport.authenticate('jwtUser', { session: false }), ordersRouter);

module.exports = router;
