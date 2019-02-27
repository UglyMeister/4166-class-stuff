var express = require('express');
var session = require('express-session');
var student = require('../models/student.js');
var router = express.Router();



router.get('*', function(req, res){
    student.firstName = req.query.firstName;
    student.lastName = req.query.lastName;
    student.degree = req.query.degree;
    student.program = req.query.program;
    if(student.firstName == ""||student.firstName == null){
      res.send("No information available/requested");
    }else{
    res.render('main', {student: student});
  }
});
router.post('*', function(req, res){
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.degree = req.body.degree;
  student.program = req.body.program;
  res.render('main', {student: student});
});





module.exports = router;
