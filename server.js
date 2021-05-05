const express = require('express');
const server = express();
const sql = require('mssql');
const bodyParser = require('body-parser');
server.use(bodyParser.json());



const users = [
    {
        id : "sss",
        name : "ssss",
        email : "ddds"
    },
    {
        id : "ssdds",
        name : "sszzsss",
        email : "ddcdds"
    }
]

sql.connect(config).then(pool => {
    console.log("ttt");
    // //데이터 가져오기
    // //순서대로 읽음 /api/user 먼저 읽은 다음에 /api/user/:id 이걸 읽음
    // server.get("/api/user", (req, res) => {
    //     res.json(users);
    // })

    // //데이터 가져오기
    // server.get("/api/user/:id", (req, res) => {
    //     //console.log(req.params.id);
    //     const user = users.find((u) => {
    //         return u.id == req.params.id;
    //     });
    //     if(user) {
    //         res.json(user);
    //     }else {
    //         res.status(404).json({errorMessage : "User was not found"});
    //     }
    // });

    // //데이터 insert
    // server.post("/api/user", (req, res) => {
    //     //console.log(req.body);
    //     users.push(req.body); //insert
    //     res.json(users);
    // })

    // //데이터 수정
    // server.put('/api/user/:id', (req, res) => {
    //     let foundIndex = users.findIndex(u=>u.id == req.params.id);
    //     if(foundIndex == -1 ){
    //         res.status(404).json({errorMessage : "User was not found"});
    //     } else {
    //         users[foundIndex] = {...users[foundIndex], ...req.body};
    //         res.json(users[foundIndex]);
    //     }
    // })

    // server.delete('/api/user/:id', (req, res) => {
    //     let foundIndex = users.findIndex(u => u.id == req.params.id);

    //     if(foundIndex == -1) {
    //         res.status(404).json({errorMessage : "User was not found"});
    //     } else {
    //         let foundUser = users.splice(foundIndex, 1); //foundIndex로 부터 하나 지움
    //         res.json(foundUser[0]);
    //     }
    // })
})



//server 시작
server.listen(3000, () => {
    console.log('The server is running');
})