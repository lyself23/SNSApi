const express = require('express');
const router = express.Router();
const code = require('./code');
const user = require('./user');
const product = require('./product');
const warehouse = require('./warehouse');

router.use('/code', code);
router.use('/user', user)
router.use('/product', product)
router.use('/warehouse', warehouse)

module.exports = router;


