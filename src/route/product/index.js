const express = require('express');
const router = express.Router();
const dbOperation = require('./product.controllers');

/* GET users listing. */
router.get('', (request,response)=>{
    dbOperation.getItems().then(result => {
        response.json(result[0]);
    })
})

router.get('/getStockList', (request,response)=>{
    console.log(request.url);
    dbOperation.getStockList(request.query).then(result => {
        response.json(result[0]);
    })
})

module.exports = router;
