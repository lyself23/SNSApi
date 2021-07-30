const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//var router = express.Router();
const routes = require('./route');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('SNSAPI is runnning at ' + port);