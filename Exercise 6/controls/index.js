/* @nanajjar */

var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Students');
var db = mongoose.connection;

var studentSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  degree: String,
  program: String
});

var StudentInfo = mongoose.model('student', studentSchema);
/*
db.once('open', function(){
  console.log("db connection open");

  var s1 = new StudentInfo({
    firstName: 'fred',
    lastName: 'york',
    degree: 'comp sci',
    program: 'software engineering'
  });
  var s2 = new StudentInfo({
    firstName: 'fred',
    lastName: 'fork',
    degree: 'comp sci',
    program: 'cyber security'
  });
  var s3 = new StudentInfo({
    firstName: 'john',
    lastName: 'jones',
    degree: 'comp sci',
    program: 'networking'
  });
  var s4 = new StudentInfo({
    firstName: 'john',
    lastName: 'smith',
    degree: 'poli sci',
    program: 'effective legislation'
  });

  s1.save();
  s2.save();
  s3.save();
  s4.save();
});*/

/* This controller handles general (root) request
 *  this route definition resposnds by sending a text response
 */

/*
app.get('/', function (req, res) {
  res.send('This is the Student Information home page');
});
*/

//this is the home page route (root of the application)
app.get('/', function (request, response) {
    var path = process.cwd();
    console.log('request for home page');
    if(request.query.searchName){
      StudentInfo.find({firstName: request.query.searchName}).then(function(doc){
        console.log(doc);
        response.render('index', {request: request, db: doc});
      });
    }else{
      StudentInfo.find().then(function(doc){
        console.log(doc);
        response.render('index', {request: request, db: doc});
      });
    }
});
app.post('/', function(request, response){
  var path = process.cwd();
  var doc = "";
  if(request.query.firstName && request.query.lastName){
    StudentInfo.find({firstName: request.query.firstName, lastName: request.query.lastName}).then(function(doc){
      doc.degree = request.query.degree;
      doc.program = request.query.program;
      doc.save();
    });
  };
  StudentInfo.find().then(function(doc){
    console.log(doc);
    response.render('index', {request: request, db: doc});
  });
});
