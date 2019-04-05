/* @nanajjar */

class StudentDB {

  constructor() {
  }

  addStudent(db, fname, lname, degree, program) {
    return new Promise((resolve, reject) => {
      db.findOneAndUpdate({ $and: [{ firstName: fname }, { lastName: lname }] },
        { $set: { firstName: fname, lastName: lname, degree: degree, program: program } },
        { new: true, upsert: true }, function (err, data) {
          console.log(data);
          resolve(data);
        }).catch(erro => { return reject(err); });
    }
    )
  }//end addStudent

  findAll(db) {
    return new Promise((resolve, reject) => {
      db.find({}).then(data => {
        console.log("in find all " + data);
        resolve(data);
      }).catch(err => { return reject(err); })
    })
  }//end findAll

  findByNameSearch(db, searchString) {
    //var low = searchString.toLowerCase();
    return new Promise((resolve, reject) => {
      db.find({
        $or:
          [
            { firstName: { "$regex": searchString, "$options": "ix" } },//using regex to match either first or last name
            { lastName: { "$regex": searchString, "$options": "ix" } } //using i to ignore case and x to ignore whitespace
          ]
      }).then(data => {
        resolve(data);
      }).catch(err => {
        return reject(err);
      })
    });
  }// end findByNameSearch

  // finds objects for the addStudent() function
  findByName(db, fname, lname) {
    return new Promise((resolve, reject) => {
      db.find({
        $and: [{ firstName: fname }, { lastName: lname }]
      }).then(data => {
        resolve(data);
      }).catch(err => {
        return reject(err);
      })
    });
  }//end findByName

  // deletes all data the database
  remove(db) {
    return new Promise((resolve, reject) => {
      db.find().deleteMany().exec().then(function () {
        resolve()
      }).catch(err => { return reject(err); })

    }); //DELETES EVERYTHING
  }

}//end class

module.exports = StudentDB;
