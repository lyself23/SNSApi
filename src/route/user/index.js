const express = require('express');
const router = express.Router();
const dbOperation = require('./user.controller');

//파라미터로 받기
//ex) http://203.228.186.44:8080/api/user/Login?id=99060134&password=1
router.get('/Login', (request,response)=>{
    dbOperation.LogIn(request.query).then(result => {
        response.json(result[0]);
    })
})

// //고정변수로 받기
// //ex)http://203.228.186.44:8080/api/user/Login/99060134/1
// router.get('/Login/:id/:password', (request,response)=>{
//     dbOperation.LogIn(request.params).then(result => {
//         response.json(result[0]);
//     })
// })


/* GET users listing. */
// router.get('', (request,response)=>{
//     dbOperation.getUsers().then(result => {
//         response.json(result[0]);
//     })
// })

// router.get('/:id', (request,response)=>{
//     dbOperation.getUser(request.params.id).then(result => {
//         response.json(result[0]);
//     })
// })

// router.get('/Login', (request,response)=>{
//     console.log('request', request.body)
//     let logIn = {...request.body}
//     dbOperation.LogIn(logIn).then(result => {
//         response.status(200).json(result[0]);
//        // response.status(201).json(result);
//     })
// })



module.exports = router;

