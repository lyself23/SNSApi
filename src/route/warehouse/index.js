const express = require('express');
const router = express.Router();
const dbOperation = require('./warehouse.controller');

router.get('/getWarehouseList', (request,response)=>{
    // let warehouse = {...request.body}
    dbOperation.getWarehouseList(request.query).then(result => {
        response.json(result[0]);
       // response.status(201).json(result);
    })
})

module.exports = router;
