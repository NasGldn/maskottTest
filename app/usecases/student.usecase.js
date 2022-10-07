const students= require("../data-access/student.db")
// students = new SequelizeDataAccess("Students", db.students)

// Create and Save a new Student
exports.create =  async (student) => {
  const data = await students.create(student)
  return data;
};

// Retrieve all Students from the database.
exports.findAll = async (query) => {
    const data = await students.findAll(query)
    return data
  };

// Find a single Student with an id
exports.findOne = async (studentId) => {
  const data = await students.findOne(studentId)
  return data
  };

// Update a Student by the id in the request
exports.update = async (studentId, student) => {
  const data = await students.update(studentId, student)
  return data
  };

// Delete a Student with the specified id in the request
exports.delete = async (studentId) => {
  const data = await students.delete(studentId)
  return data
};

// Delete all Students from the database.
exports.deleteAll = async () => {
  const data = await students.deleteAll()
  return data
  };
