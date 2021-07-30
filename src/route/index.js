const express = require('express');
const router = express.Router();
const user = require('./user');
const product = require('./product');
const warehouse = require('./warehouse');

router.use('/user', user)
router.use('/product', product)
router.use('/warehouse', warehouse)


module.exports = router;


