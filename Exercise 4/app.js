var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

var index = require('./routes/index.js');
var studentInfo = require('./routes/studentInfo.js');

app.use('/', index);
app.use('/studentInfo',studentInfo);

app.listen(8080);
