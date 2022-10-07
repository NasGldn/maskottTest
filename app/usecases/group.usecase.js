const groups= require("../data-access/group.db")
const students= require("../data-access/student.db")
const utils = require("./utils.usecase")
// groups = new SequelizeDataAccess("Groups", db.groups)

// Create and Save a new Group
exports.create =  async (group) => {
  const data = await groups.create(group)
  return data;
};

// Retrieve all Groups from the database.
exports.findAll = async () => {
    const data = await groups.findAll({})
    return data
  };

// Find a single Group with an id
exports.findOne = async (groupId) => {
  const data = await groups.findOne(groupId)
  return data
  };

// Update a Group by the id in the request
exports.update = async (groupId, group) => {
  const data = await groups.update(groupId, group)
  return data
  };

// Delete a Group with the specified id in the request
exports.delete = async (groupId) => {
  const data = await groups.delete(groupId)
  return data
};

// Delete all Groups from the database.
exports.deleteAll = async () => {
  const data = await groups.deleteAll()
  return data
  };

// Find a single Group with an id
exports.addStudent = async (groupId, studentId) => {
  const group = await groups.findOne(groupId);
  const student = await students.findOne(studentId);

  if (group.students.length < 10 && utils.checkStudentLegitimity(group, student)){
    const data = await groups.addStudent(groupId, studentId);
    return data;
  } else {
    throw {
      message: `Cannot add student to group. The group is full or the options are invalid!`,
      status: 500
    };
  };
}
//remove a single Group with an id
exports.removeStudent = async (groupId, studentId) => {
  const group = await groups.findOne(groupId);
  if (group.students.length > 3){
    const data = await groups.removeStudent(groupId, studentId);
    return data;
  } else {
    throw {
      message: `Cannot remove student to group. The group will contains less than 3 users!`,
      status: 500
    };
  };
}


