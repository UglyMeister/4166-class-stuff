var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var parser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var index = require('./routes/index.js');
var studentInfo = require('./routes/studentInfo.js');

app.use('/', index);
app.use('/studentInfo', parser, studentInfo);


app.listen(8080);
