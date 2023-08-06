const express = require('express');
// const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../helpers');
const {
  // loginSchema,
  getDetailSchema,
  // createSchema,
  // editSchema,
} = require('./validations');
const {
  // login,
  // checkRefreshToken,
  // basic,
  // getMe,
  // getAll,
  getDetail,
  // create,
  // remove,
  // update,
} = require('./controller');

router.route('/:id')
  .get(validateSchema(getDetailSchema), getDetail);

module.exports = router;
