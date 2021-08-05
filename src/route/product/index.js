const express = require('express');
const router = express.Router();
const dbOperation = require('./product.controllers');

/* GET users listing. */
router.get('', (request,response)=>{
    dbOperation.getItems().then(result => {
        response.json(result[0]);
    })
})

/* GET users listing. */
router.get('/getItem', (request,response)=>{
    dbOperation.getItem(request.query).then(result => {
        response.json(result[0]);
    })
})
9
router.get('/getStockList', (request,response)=>{
    dbOperation.getStockList(request.query).then(result => {
        response.json(result[0]);
    })
})

router.post('/workMoveProduct', (request, response) => {
    dbOperation.workMoveProduct(request.body).then(result => {   
            response.json(result); 
    })  
})

module.exports = router;
