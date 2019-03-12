/* @nanajjar */

var express = require('express');
var app = module.exports = express();
//this design handles the request and sends data to the model,
//the model returns the needed data to complete a successful response by packaging
//it in the form the view understands and able to render/display correctly
//this design is recommended since it follows an MVC architecture

app.get('/', function (request, response) {
  //get data objects - this can be outside of this call if needed somewhere else.
  var studentObj = require('./../models/student');

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
  else if(request.session.theStudent){
    student = request.session.theStudent;
    console.log("student data object is ");
    console.log(student);
    response.render('main', {student: student});
  }else{
    console.log('request with query string was sent');
    var path = process.cwd();
    console.log("path from where node was started" + path);
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
