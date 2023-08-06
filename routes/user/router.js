const express = require('express');
// const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../helpers');
const {
  getDetailSchema,
} = require('./validations');
const {
  getDetail,
} = require('./controller');

router.route('/:id')
  .get(validateSchema(getDetailSchema), getDetail);

module.exports = router;
