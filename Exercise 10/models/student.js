/* @nanajjar */

var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var studentSchema = new mongoose.Schema({
    firstName: {type: String,String, default: 'info'},
    lastName: {type: String,String, default: 'info'},
    degree: {type: String,String, default: 'info'},
    program: {type: String,String, default: 'info'},
  });


module.exports = mongoose.model('Student', studentSchema);


// class Student {
 
// setFirstName(firstName) {
//     this.firstName = firstName;
// }

// getFirstName() {
//     return this.firstName;
// }

// setLastName(lastName) {
//     this.lastName = lastName;
// }

// getLastName () {
//     this.lastName;
// }
// setDegree(degree) {
//     this.degree = degree;
// }

// getDegree(){
//     return this.degree;
// }
// setProgram(program) {
//     this.program = program;
// }

// getProgram() {
//     return this.program;
// };

//  // Your function that returns full name
// studentName() {
//     return this.firstName + ' ' + this.lastName;
// }

// // You're returning an object with property values set above
// getStudentInfo(){
//     return {
//         firstName:this.firstName,
//         lastName:this.lastName,
//         degree:this.degree,
//         program:this.program
//     }
// }
// }
// module.exports = Student;
