/* @nanajjar */

var express = require('express');
var app = module.exports = express();
//this design handles the request and sends data to the model, 
//the model returns the needed data to complete a successful response by packaging 
//it in the form the view understands and able to render/display correctly
//this design is recommended since it follows an MVC architecture

//for method="POST"
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//database connection and 
var StudentDB = require('../util/studentDB'); //db functions are defined here
var mongoose = require('mongoose');

//connect to database - if it does not exist it will be created 
mongoose.connect('mongodb://localhost/Students', { useNewUrlParser: true });
//define the schema - this can take place of the model  
var studentInfo = new mongoose.Schema({
  firstName: String,
  lastName: String,
  degree: String,
  program: String
});

var Student = mongoose.model('Student', studentInfo, 'StudentInfo'); //<- StudentInfo is the collection name in the database
//if this parameter is not supplied then Mongoose automatically looks for the plural, lowercased version of your model name (e.g. students)

// <- we're defining the schema here and not using the model class. 
// to use the model class Student.js for db functions.
// see these references -
//https://mongoosejs.com/docs/advanced_schemas.html
//https://github.com/Automattic/mongoose/issues/6850 
//will have to require and loadClass  ->

app.post('/', urlencodedParser, async function (req, res) {
  let studentData = new StudentDB();
  let viewData;
  if (req.body.firstName && req.body.lastName && req.body.degree && req.body.program) { //action requested is add 
    console.log("adding student info");
    await studentData.addStudent(Student, req.body.firstName, req.body.lastName, req.body.degree, req.body.program);
    viewData = await studentData.findAll(Student);

  } else if (req.body.search) { //action requested is search
    console.log("SEARCH POST");
    viewData = await studentData.findByNameSearch(Student, req.body.search);

  } else if (req.body.listAll) {//action requested is list all
    viewData = await studentData.findAll(Student);

  } else if (req.body.delete) {//action requested is delete all
    console.log('DELETED ALL ITEMS');
    studentData.remove(Student);
    viewData = await studentData.findAll(Student);

  } else {
    viewData = await studentData.findAll(Student); //defaul view all
  }

  console.log("found data");
  console.log(viewData);
  res.render('main', { students: viewData });
});


app.get('/', function (request, response) {

  //get the request query
  var studentReqParams = request.query;

  //printing debug message to the console
  console.log("query string is ");
  console.log(studentReqParams);

  //input validation layer would go here and can be resposnible for returning needed data
  //we will assume that if present a valid request query string and values exist 
  //if not present we show home page
  if ((Object.keys(studentReqParams).length != 0)) {
    console.log('request with query string was sent');

    //set values in the model and get data object
    //student = studentObj.student(studentReqParams.firstName, studentReqParams.lastName, studentReqParams.degree, studentReqParams.program);
    let studentObj = new Student();
    studentObj.setFirstName(studentReqParams.firstName);
    studentObj.setLastName(studentReqParams.lastName);
    studentObj.setDegree(studentReqParams.degree);
    studentObj.setProgram(studentReqParams.program);
    student = studentObj.getStudentInfo();
    //printing debug message to the console
    //notice that when the request comes from the form submission it will alwas have parameters
    //what changes is whether values for those parameters are set or were left empty
    console.log("student data object is ");
    console.log(student);

    //ready to send response. Pass the data to the correct view
    response.render('main', { student: student });
  }
  else {
    console.log('request with query string was not sent');
    var path = process.cwd();
    console.log("path from where node was started" + path);
    // response.sendFile(path + '/views/index.html');
    response.render('index');

  }
});
/************************************************************************ /
/************************************************************************/

// this route defintion illustrates using a list of route params
// another illustration not seperating the controller module from the model module
// mainly to show using route params working
app.get('/:firstName/:lastName/:degree/:program', function (request, response) {
  var sentFirstName = request.params.firstName;
  var sentLastName = request.params.lastName;
  var sentDegree = request.params.degree;
  var sentProgram = request.params.program;

  //create data
  //this illustrates not defining functions for the data objects and having the model created within the controller
  //this is not recommended since it doesn't provide a clear seperation of MVC modules
  var studentObj = require('./../models/student');

  studentObj.setFirstName(sentFirstName);
  studentObj.setLastName(sentLastName);
  studentObj.setDegree(sentDegree);
  studentObj.setProgram(sentProgram);
  student = studentObj.getStudentInfo();
  console.log("student data object is ");
  console.log(studentObj);
  //ready to send response. Pass the data to the correct view
  response.render('main', { student: studentObj });
});
//*/