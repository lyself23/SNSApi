const express = require('express');
const router = express.Router();
const dbOperation = require('./code.controllers');

/* GET users listing. */
//http://localhost:8080/api/code?tableNm=LEM100&work_dt=2021-08-06
router.get('', (request,response)=>{
    dbOperation.getCode(request.query).then(result => {
        response.json(result[0]);
    })
})

module.exports = router;
